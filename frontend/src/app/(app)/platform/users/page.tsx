"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button/variants";
import {
  listPlatformUsers,
  setPlatformAdminFlag,
  type PlatformUser,
} from "@/features/platform/api/platform.api";
import {
  PlatformGate,
  PlatformSubnav,
} from "@/features/platform/components/PlatformShell";
import { cn } from "@/lib/utils/cn";

export default function PlatformUsersPage() {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const selfId = session?.user?.id;
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState<PlatformUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!accessToken) return;
    setLoading(true);
    try {
      setRows(await listPlatformUsers(search || undefined, accessToken));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, [search, accessToken]);

  useEffect(() => {
    void load();
  }, [load]);

  async function toggleAdmin(user: PlatformUser) {
    if (user.id === selfId && user.isPlatformAdmin) {
      toast.error("You cannot demote yourself");
      return;
    }
    setBusyId(user.id);
    try {
      await setPlatformAdminFlag(user.id, !user.isPlatformAdmin, accessToken);
      toast.success(
        user.isPlatformAdmin ? "Platform admin removed" : "Promoted to platform admin",
      );
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Update failed");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <PlatformGate>
      <div className="space-y-6">
        <PageHeader
          title="Platform users"
          description="Every account on the network. Promote operators to super admin."
        />
        <PlatformSubnav active="/platform/users" />

        <div className="flex flex-wrap gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email…"
            className="min-w-[220px] flex-1 rounded-full border border-neutral-400 bg-white px-4 py-2 text-300 outline-none focus:border-mint/50"
          />
          <button
            type="button"
            onClick={() => void load()}
            className={cn(
              buttonVariants({ variant: "outlined", size: "sm" }),
              "!rounded-full",
            )}
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-300 text-neutral-600">Loading users…</p>
        ) : rows.length === 0 ? (
          <p className="rounded-2xl border border-neutral-400/60 bg-white p-6 text-300 text-neutral-600">
            No users match that search.
          </p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-neutral-400/60 bg-white">
            <table className="w-full text-left text-300">
              <thead className="border-b border-neutral-300 bg-neutral-100 text-200 text-neutral-600">
                <tr>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Workspaces</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((user) => (
                  <tr key={user.id} className="border-b border-neutral-200 last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-medium text-neutral-900">{user.name}</p>
                      <p className="text-200 text-neutral-600">{user.email}</p>
                    </td>
                    <td className="px-4 py-3 text-neutral-600">
                      {user.memberships.length === 0
                        ? "-"
                        : user.memberships
                            .map((m) => `${m.orgName} (${m.role})`)
                            .join(", ")}
                    </td>
                    <td className="px-4 py-3">
                      {user.isPlatformAdmin ? (
                        <Badge variant="success" size="sm">
                          Super admin
                        </Badge>
                      ) : (
                        <Badge variant="muted" size="sm">
                          Member
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {user.id === selfId ? (
                        <span className="text-200 text-neutral-500">You</span>
                      ) : (
                        <button
                          type="button"
                          disabled={busyId === user.id}
                          onClick={() => void toggleAdmin(user)}
                          className={cn(
                            buttonVariants({
                              variant: user.isPlatformAdmin ? "outlined" : "contained",
                              size: "sm",
                            }),
                            "!rounded-full",
                            !user.isPlatformAdmin && "!bg-mint !text-white",
                          )}
                        >
                          {user.isPlatformAdmin ? "Demote" : "Promote"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PlatformGate>
  );
}
