"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { RefreshCw } from "lucide-react";

import {
  getPlatformHealth,
  type PlatformHealth,
} from "@/features/platform/api/platform.api";
import {
  PlatformGate,
  PlatformSubnav,
} from "@/features/platform/components/PlatformShell";
import { SystemHealthMonitor } from "@/features/platform/components/SystemHealthMonitor";

export default function PlatformHealthPage() {
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;
  const [health, setHealth] = useState<PlatformHealth | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async (token: string, soft = false) => {
    if (soft) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const data = await getPlatformHealth(token);
      setHealth(data);
    } catch (e) {
      setHealth(null);
      setError(e instanceof Error ? e.message : "Failed to load health");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (status === "loading") return;
    if (!accessToken) {
      setLoading(false);
      setError("Sign in again to view system health.");
      return;
    }

    let cancelled = false;
    void (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPlatformHealth(accessToken);
        if (!cancelled) setHealth(data);
      } catch (e) {
        if (!cancelled) {
          setHealth(null);
          setError(e instanceof Error ? e.message : "Failed to load health");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [accessToken, status]);

  return (
    <PlatformGate>
      <div className="min-w-0 space-y-5">
        <header className="flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between">
          <div className="min-w-0">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[#3B05C4]">
              Platform control
            </p>
            <h1 className="mt-1 font-display text-[1.75rem] font-bold tracking-tight text-[#16024A] tablet:text-[2.05rem]">
              System health
            </h1>
            <p className="mt-1.5 max-w-xl text-[0.9rem] leading-relaxed text-neutral-500">
              Live signal from the API process and MongoDB.
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
              {refreshing ? "Refreshing…" : "Refresh signal"}
            </button>
          ) : null}
        </header>

        <PlatformSubnav active="/platform/health" />

        {error ? (
          <p className="rounded-2xl border border-[#F9DADA] bg-[#FFF8F8] px-4 py-3 text-[0.84rem] text-[#9B1C1C]">
            {error}
          </p>
        ) : null}

        <SystemHealthMonitor health={health} loading={loading} />
      </div>
    </PlatformGate>
  );
}
