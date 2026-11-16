"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Clock3,
  Download,
  Footprints,
  MousePointerClick,
  Users,
} from "lucide-react";

type Summary = {
  sessions: number;
  pageViews: number;
  clicks: number;
  downloads: number;
  avgDurationMs: number;
};

function formatDuration(ms: number) {
  if (!ms || ms < 1000) return "<1s";
  const totalSec = Math.round(ms / 1000);
  if (totalSec < 60) return `${totalSec}s`;
  const mins = Math.floor(totalSec / 60);
  const secs = totalSec % 60;
  if (mins < 60) return secs ? `${mins}m ${secs}s` : `${mins}m`;
  const hours = Math.floor(mins / 60);
  const remMins = mins % 60;
  return remMins ? `${hours}h ${remMins}m` : `${hours}h`;
}

export function VisitorActivityPulse() {
  const [summary, setSummary] = useState<Summary | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch("/api/activity?limit=200", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { summary?: Summary };
        if (!cancelled && data.summary) setSummary(data.summary);
      } catch {
        // Non-blocking dashboard widget.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const sessions = summary?.sessions ?? 0;
  const clicks = summary?.clicks ?? 0;
  const downloads = summary?.downloads ?? 0;
  const avg = summary?.avgDurationMs ?? 0;

  return (
    <Link
      href="/platform/activity"
      className="block min-w-0 rounded-[1.75rem] border border-[#EDE8F7] bg-white p-5 shadow-[0_18px_44px_-34px_rgba(22,2,74,0.4)] transition hover:border-[#3B05C4]/35"
      aria-label="Open visitor activity report"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[0.78rem] font-medium text-neutral-500">Marketing site</p>
          <h3 className="font-display text-[1.05rem] font-bold text-[#16024A]">
            Visitor activity
          </h3>
        </div>
        <Footprints className="h-4 w-4 shrink-0 text-[#3B05C4]" aria-hidden />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <PulseStat icon={<Users className="h-3.5 w-3.5" />} label="Sessions" value={String(sessions)} />
        <PulseStat
          icon={<Clock3 className="h-3.5 w-3.5" />}
          label="Avg time"
          value={formatDuration(avg)}
        />
        <PulseStat
          icon={<MousePointerClick className="h-3.5 w-3.5" />}
          label="Clicks"
          value={String(clicks)}
        />
        <PulseStat
          icon={<Download className="h-3.5 w-3.5" />}
          label="Downloads"
          value={String(downloads)}
        />
      </div>

      <span className="mt-4 inline-flex items-center gap-1 text-[0.75rem] font-semibold text-[#3B05C4]">
        Open full report
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
      </span>
    </Link>
  );
}

function PulseStat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-[#F7F5FC] px-2.5 py-2">
      <div className="flex items-center gap-1 text-[#3B05C4]">
        {icon}
        <span className="text-[0.65rem] text-neutral-500">{label}</span>
      </div>
      <p className="mt-0.5 font-display text-[0.95rem] font-bold tabular-nums text-[#16024A]">
        {value}
      </p>
    </div>
  );
}
