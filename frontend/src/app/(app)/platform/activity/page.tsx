"use client";

import { useEffect, useState } from "react";

import {
  VisitorActivityMonitor,
  type ActivitySummary,
} from "@/features/platform/components/VisitorActivityMonitor";
import { PlatformGate, PlatformSubnav } from "@/features/platform/components/PlatformShell";
import type { ActivityEvent, ActivitySession } from "@/types/activity";

const EMPTY_SUMMARY: ActivitySummary = {
  sessions: 0,
  pageViews: 0,
  clicks: 0,
  downloads: 0,
  avgDurationMs: 0,
};

export default function PlatformActivityPage() {
  const [sessions, setSessions] = useState<ActivitySession[]>([]);
  const [events, setEvents] = useState<ActivityEvent[]>([]);
  const [summary, setSummary] = useState<ActivitySummary>(EMPTY_SUMMARY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void (async () => {
      try {
        const res = await fetch("/api/activity?limit=400", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(res.status === 403 ? "Forbidden" : "Failed to load activity");
        }
        const data = (await res.json()) as {
          sessions?: ActivitySession[];
          events?: ActivityEvent[];
          summary?: ActivitySummary;
        };
        if (cancelled) return;
        setSessions(Array.isArray(data.sessions) ? data.sessions : []);
        setEvents(Array.isArray(data.events) ? data.events : []);
        setSummary(data.summary ?? EMPTY_SUMMARY);
        setError(null);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Failed to load activity");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PlatformGate>
      <div className="min-w-0 space-y-5">
        <PlatformSubnav active="/platform/activity" />

        <header className="min-w-0">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-[#3B05C4]">
            Platform control
          </p>
          <h1 className="mt-1 font-display text-[1.75rem] font-bold tracking-tight text-[#16024A] tablet:text-[2.05rem]">
            Visitor activity
          </h1>
          <p className="mt-1.5 max-w-2xl text-[0.9rem] leading-relaxed text-neutral-500">
            Who visited the marketing site, what they clicked and downloaded, and how
            long they stayed — reported for super admins.
          </p>
        </header>

        {loading ? (
          <p className="text-[0.85rem] text-neutral-500">Loading visitor activity…</p>
        ) : error ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-[0.85rem] text-red-800">
            {error}
          </p>
        ) : (
          <VisitorActivityMonitor
            sessions={sessions}
            events={events}
            summary={summary}
          />
        )}
      </div>
    </PlatformGate>
  );
}
