"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { RefreshCw } from "lucide-react";

import {
  getPlatformAudit,
  type PlatformAuditEvent,
} from "@/features/platform/api/platform.api";
import { AuditTrailMonitor } from "@/features/platform/components/AuditTrailMonitor";
import {
  PlatformGate,
  PlatformSubnav,
} from "@/features/platform/components/PlatformShell";

export default function PlatformAuditPage() {
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;
  const [events, setEvents] = useState<PlatformAuditEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async (token: string, soft = false) => {
    if (soft) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const next = await getPlatformAudit(60, token);
      setEvents(next);
    } catch (e) {
      setEvents([]);
      setError(e instanceof Error ? e.message : "Failed to load audit");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (status === "loading") return;
    if (!accessToken) {
      setLoading(false);
      setError("Sign in again to view the audit trail.");
      return;
    }

    let cancelled = false;
    void (async () => {
      setLoading(true);
      setError(null);
      try {
        const next = await getPlatformAudit(60, accessToken);
        if (!cancelled) setEvents(next);
      } catch (e) {
        if (!cancelled) {
          setEvents([]);
          setError(e instanceof Error ? e.message : "Failed to load audit");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [status, accessToken]);

  return (
    <PlatformGate>
      <div className="min-w-0 space-y-5">
        <header className="flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between">
          <div className="min-w-0">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[#3B05C4]">
              Platform control
            </p>
            <h1 className="mt-1 font-display text-[1.75rem] font-bold tracking-tight text-[#16024A] tablet:text-[2.05rem]">
              Audit trail
            </h1>
            <p className="mt-1.5 max-w-xl text-[0.9rem] leading-relaxed text-neutral-500">
              Derived from recent workspace, user, booking, and assessment activity.
            </p>
          </div>

          {accessToken ? (
            <button
              type="button"
              onClick={() => void load(accessToken, true)}
              disabled={refreshing || loading}
              className="inline-flex items-center gap-1.5 self-start rounded-full border border-[#EDE8F7] bg-white px-3.5 py-2 text-[0.78rem] font-semibold text-[#16024A] shadow-[0_10px_24px_-20px_rgba(22,2,74,0.45)] transition hover:border-[#3B05C4]/35 hover:bg-[#FBF9FF] disabled:opacity-60"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 text-[#3B05C4] ${refreshing ? "animate-spin" : ""}`}
                aria-hidden
              />
              {refreshing ? "Refreshing…" : "Refresh trail"}
            </button>
          ) : null}
        </header>

        <PlatformSubnav active="/platform/audit" />

        {error ? (
          <p className="rounded-2xl border border-[#F9DADA] bg-[#FFF8F8] px-4 py-3 text-[0.84rem] text-[#9B1C1C]">
            {error}
          </p>
        ) : null}

        <AuditTrailMonitor events={events} loading={loading} />
      </div>
    </PlatformGate>
  );
}
