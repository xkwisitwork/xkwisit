"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/Button/variants";
import {
  extendWorkspaceTrial,
  listPlatformWorkspaces,
  updatePlatformWorkspace,
  type PlatformWorkspace,
} from "@/features/platform/api/platform.api";
import {
  PlatformGate,
  PlatformSubnav,
} from "@/features/platform/components/PlatformShell";
import type { OrganizationPlan, SubscriptionStatus } from "@/lib/constants/entitlements";
import { cn } from "@/lib/utils/cn";

export default function PlatformWorkspacesPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const selfId = session?.user?.id;
  const [rows, setRows] = useState<PlatformWorkspace[]>([]);
  const [search, setSearch] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!accessToken) return;
    try {
      setRows(await listPlatformWorkspaces(search || undefined, accessToken));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load workspaces");
    }
  }, [search, accessToken]);

  useEffect(() => {
    void load();
  }, [load]);

  function isProtectedWorkspace(row: PlatformWorkspace) {
    return Boolean(row.ownerIsPlatformAdmin) || row.ownerId === selfId;
  }

  async function onExtend(row: PlatformWorkspace) {
    if (isProtectedWorkspace(row)) {
      toast.error("Super Admin workspaces do not use trials");
      return;
    }
    setBusyId(row.id);
    try {
      await extendWorkspaceTrial(row.id, 14, accessToken);
      toast.success("Trial extended 14 days");
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusyId(null);
    }
  }

  async function onStatus(row: PlatformWorkspace, status: SubscriptionStatus) {
    if (isProtectedWorkspace(row)) {
      toast.error("You cannot suspend a Super Admin workspace");
      return;
    }
    setBusyId(row.id);
    try {
      await updatePlatformWorkspace(row.id, { status }, accessToken);
      toast.success(`Status → ${status}`);
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusyId(null);
    }
  }

  async function onPlan(row: PlatformWorkspace, plan: OrganizationPlan) {
    if (isProtectedWorkspace(row)) {
      toast.error("Super Admin workspaces do not have a billing plan");
      return;
    }
    setBusyId(row.id);
    try {
      await updatePlatformWorkspace(row.id, { plan, status: "ACTIVE" }, accessToken);
      toast.success(`Plan → ${plan} (ACTIVE)`);
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <PlatformGate>
      <div className="space-y-6">
        <PageHeader
          title="Workspaces"
          description="Every agency tenant on the platform - plans, trials, and suspension."
        />
        <PlatformSubnav active="/platform/workspaces" />

        <input
          className="w-full max-w-md rounded-2xl border border-neutral-400 bg-white px-4 py-3 text-300 outline-none focus:border-mint/50 focus:ring-2 focus:ring-mint/20"
          placeholder="Search name or slug…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="overflow-x-auto rounded-2xl border border-neutral-400/60 bg-white">
          <table className="w-full min-w-[720px] text-left text-300">
            <thead className="border-b border-neutral-300 bg-neutral-100 text-200 uppercase tracking-wide text-neutral-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Workspace</th>
                <th className="px-4 py-3 font-semibold">Owner</th>
                <th className="px-4 py-3 font-semibold">Plan</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Trial ends</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const protectedRow = isProtectedWorkspace(row);
                return (
                  <tr key={row.id} className="border-b border-neutral-200 last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-neutral-900">{row.name}</p>
                      <p className="text-200 text-neutral-600">{row.slug}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p>{row.ownerName ?? "-"}</p>
                      <p className="text-200 text-neutral-600">{row.ownerEmail}</p>
                    </td>
                    <td className="px-4 py-3">
                      {protectedRow ? (
                        <span className="rounded-full bg-[#F4F0FF] px-2.5 py-1 text-200 font-semibold text-[#3B05C4]">
                          —
                        </span>
                      ) : (
                        <select
                          className="rounded-lg border border-neutral-400 bg-white px-2 py-1"
                          value={row.plan}
                          disabled={busyId === row.id}
                          onChange={(e) =>
                            void onPlan(row, e.target.value as OrganizationPlan)
                          }
                        >
                          {["STARTER", "GROWTH", "SCALE", "ENTERPRISE"].map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {protectedRow ? (
                        <span className="rounded-full bg-[#16024A] px-2 py-0.5 text-200 font-semibold text-white">
                          Platform
                        </span>
                      ) : (
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-200 font-semibold",
                            row.status === "TRIAL" && "bg-mint-soft text-mint-deep",
                            row.status === "ACTIVE" && "bg-emerald-50 text-emerald-800",
                            row.status === "SUSPENDED" && "bg-red-50 text-red-800",
                            row.billing?.isLocked && "bg-amber-50 text-amber-900",
                          )}
                        >
                          {row.status}
                          {row.billing?.isLocked ? " · locked" : ""}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      {protectedRow
                        ? "—"
                        : row.trialEndsAt
                          ? new Date(row.trialEndsAt).toLocaleDateString()
                          : "-"}
                    </td>
                    <td className="px-4 py-3">
                      {protectedRow ? (
                        <span className="text-200 text-neutral-500">No tenant actions</span>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            disabled={busyId === row.id}
                            onClick={() => void onExtend(row)}
                            className={cn(
                              buttonVariants({ variant: "outlined", size: "sm" }),
                              "!rounded-full",
                            )}
                          >
                            +14d trial
                          </button>
                          {row.status !== "SUSPENDED" ? (
                            <button
                              type="button"
                              disabled={busyId === row.id}
                              onClick={() => void onStatus(row, "SUSPENDED")}
                              className="text-200 font-semibold text-red-600 hover:underline"
                            >
                              Suspend
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled={busyId === row.id}
                              onClick={() => void onStatus(row, "ACTIVE")}
                              className="text-200 font-semibold text-mint hover:underline"
                            >
                              Activate
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-neutral-600">
                    No workspaces found
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </PlatformGate>
  );
}
