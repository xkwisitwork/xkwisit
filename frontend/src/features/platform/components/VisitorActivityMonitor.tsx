"use client";

import { useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Clock3,
  Download,
  Eye,
  MapPin,
  MousePointerClick,
  Search,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils/cn";
import type { ActivityEvent, ActivitySession } from "@/types/activity";

function formatWhen(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-NG", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

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

function identityLabel(session: ActivitySession) {
  if (session.label) return session.label;
  const place = [session.city, session.region, session.country]
    .filter(Boolean)
    .join(", ");
  if (place) return place;
  if (session.ip) return session.ip;
  return "Anonymous visitor";
}

export type ActivitySummary = {
  sessions: number;
  pageViews: number;
  clicks: number;
  downloads: number;
  avgDurationMs: number;
};

export function VisitorActivityMonitor({
  sessions,
  events,
  summary,
}: {
  sessions: ActivitySession[];
  events: ActivityEvent[];
  summary: ActivitySummary;
}) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(
    sessions[0]?.sessionId ?? null,
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sessions;
    return sessions.filter((s) =>
      [
        s.sessionId,
        s.ip,
        s.city,
        s.country,
        s.region,
        s.label,
        ...s.paths,
        ...s.clickTargets,
        ...s.downloadTargets,
      ]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q)),
    );
  }, [sessions, query]);

  const active =
    sessions.find((s) => s.sessionId === selectedId) ?? filtered[0] ?? null;

  const activeEvents = useMemo(() => {
    if (!active) return [];
    return events
      .filter((e) => e.sessionId === active.sessionId)
      .filter((e) => e.kind !== "heartbeat")
      .slice(0, 80);
  }, [active, events]);

  return (
    <div className="min-w-0 space-y-4">
      <div className="grid grid-cols-2 gap-3 tablet:grid-cols-5">
        <StatCard
          icon={<Users className="h-4 w-4" />}
          label="Sessions"
          value={String(summary.sessions)}
        />
        <StatCard
          icon={<Eye className="h-4 w-4" />}
          label="Page views"
          value={String(summary.pageViews)}
        />
        <StatCard
          icon={<MousePointerClick className="h-4 w-4" />}
          label="Clicks"
          value={String(summary.clicks)}
        />
        <StatCard
          icon={<Download className="h-4 w-4" />}
          label="Downloads"
          value={String(summary.downloads)}
        />
        <StatCard
          icon={<Clock3 className="h-4 w-4" />}
          label="Avg time"
          value={formatDuration(summary.avgDurationMs)}
          className="col-span-2 tablet:col-span-1"
        />
      </div>

      <div className="grid min-w-0 gap-4 laptop:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <section className="min-w-0 overflow-hidden rounded-[1.5rem] border border-[#EDE8F7] bg-white shadow-[0_18px_44px_-34px_rgba(22,2,74,0.4)]">
          <div className="border-b border-[#F0ECF6] px-4 py-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search visitors, IP, city, clicks…"
                className="w-full rounded-full border border-[#EDE8F7] bg-[#F7F5FC] py-2 pl-9 pr-3 text-[0.8rem] text-[#16024A] outline-none ring-[#3B05C4]/30 focus:ring-2"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="px-4 py-8 text-[0.84rem] text-neutral-500">
              No visitor sessions yet. Activity appears as people browse the
              marketing site.
            </p>
          ) : (
            <ul className="max-h-[32rem] divide-y divide-[#F0ECF6] overflow-y-auto">
              {filtered.map((session, i) => {
                const selected = active?.sessionId === session.sessionId;
                return (
                  <li key={session.sessionId}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(session.sessionId)}
                      className={cn(
                        "flex w-full flex-col gap-1 px-4 py-3 text-left transition",
                        selected ? "bg-[#F4F0FF]" : "hover:bg-[#F7F5FC]",
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="min-w-0 truncate text-[0.84rem] font-semibold text-[#16024A]">
                          {identityLabel(session)}
                        </p>
                        <span className="shrink-0 text-[0.68rem] text-neutral-400">
                          {formatWhen(session.lastSeenAt)}
                        </span>
                      </div>
                      <p className="truncate text-[0.72rem] text-neutral-500">
                        {session.ip || "IP hidden"} · {formatDuration(session.durationMs)} ·{" "}
                        {session.clicks} clicks · {session.downloads} downloads
                      </p>
                      <motion.div
                        className="mt-0.5 h-0.5 rounded-full bg-[#3B05C4]/70"
                        initial={{ width: 0 }}
                        animate={{ width: selected ? "100%" : `${12 + (i % 5) * 8}%` }}
                        transition={{ duration: 0.35 }}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="min-w-0 overflow-hidden rounded-[1.5rem] border border-[#EDE8F7] bg-white p-5 shadow-[0_18px_44px_-34px_rgba(22,2,74,0.4)]">
          {!active ? (
            <p className="text-[0.84rem] text-neutral-500">
              Select a visitor session to inspect clicks, downloads, and time on
              site.
            </p>
          ) : (
            <div className="space-y-5">
              <header>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#3B05C4]">
                  Visitor detail
                </p>
                <h2 className="mt-1 font-display text-[1.25rem] font-bold text-[#16024A]">
                  {identityLabel(active)}
                </h2>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.78rem] text-neutral-500">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {[active.city, active.region, active.country]
                      .filter(Boolean)
                      .join(", ") || "Location unknown"}
                  </span>
                  <span>·</span>
                  <span>{active.ip || "No IP"}</span>
                  {active.timezone ? (
                    <>
                      <span>·</span>
                      <span>{active.timezone}</span>
                    </>
                  ) : null}
                </p>
              </header>

              <div className="grid grid-cols-2 gap-3 tablet:grid-cols-4">
                <MiniStat label="Time on site" value={formatDuration(active.durationMs)} />
                <MiniStat label="Active time" value={formatDuration(active.activeMs)} />
                <MiniStat label="Pages" value={String(active.pageViews)} />
                <MiniStat label="Clicks" value={String(active.clicks)} />
              </div>

              <div className="grid gap-4 tablet:grid-cols-2">
                <DetailList
                  title="Pages visited"
                  empty="No pages recorded"
                  items={active.paths}
                />
                <DetailList
                  title="Downloads"
                  empty="No downloads"
                  items={active.downloadTargets}
                />
              </div>

              <DetailList
                title="Clicked"
                empty="No clicks recorded"
                items={active.clickTargets}
              />

              <div>
                <h3 className="text-[0.78rem] font-semibold text-[#16024A]">
                  Event timeline
                </h3>
                {activeEvents.length === 0 ? (
                  <p className="mt-2 text-[0.78rem] text-neutral-500">
                    No detailed events for this session.
                  </p>
                ) : (
                  <ul className="mt-2 max-h-72 space-y-2 overflow-y-auto">
                    {activeEvents.map((event) => (
                      <li
                        key={event.id}
                        className="rounded-xl bg-[#F7F5FC] px-3 py-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[0.78rem] font-semibold capitalize text-[#16024A]">
                            {event.kind.replace("_", " ")}
                            {event.target ? ` · ${event.target}` : ""}
                          </p>
                          <time className="shrink-0 text-[0.65rem] text-neutral-400">
                            {formatWhen(event.at)}
                          </time>
                        </div>
                        <p className="mt-0.5 truncate text-[0.7rem] text-neutral-500">
                          {event.path}
                          {event.href ? ` · ${event.href}` : ""}
                          {typeof event.durationMs === "number"
                            ? ` · ${formatDuration(event.durationMs)} on site`
                            : ""}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  className,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[1.25rem] border border-[#EDE8F7] bg-white p-4 shadow-[0_14px_32px_-28px_rgba(22,2,74,0.4)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 text-[#3B05C4]">
        {icon}
        <p className="text-[0.72rem] font-medium text-neutral-500">{label}</p>
      </div>
      <p className="mt-2 font-display text-[1.45rem] font-bold tabular-nums text-[#16024A]">
        {value}
      </p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[#F7F5FC] px-3 py-2.5">
      <p className="text-[0.68rem] text-neutral-500">{label}</p>
      <p className="mt-0.5 font-display text-[1rem] font-bold text-[#16024A]">
        {value}
      </p>
    </div>
  );
}

function DetailList({
  title,
  items,
  empty,
}: {
  title: string;
  items: string[];
  empty: string;
}) {
  return (
    <div>
      <h3 className="text-[0.78rem] font-semibold text-[#16024A]">{title}</h3>
      {items.length === 0 ? (
        <p className="mt-2 text-[0.78rem] text-neutral-500">{empty}</p>
      ) : (
        <ul className="mt-2 space-y-1.5">
          {items.slice(0, 12).map((item) => (
            <li
              key={item}
              className="truncate rounded-lg bg-[#F7F5FC] px-2.5 py-1.5 text-[0.75rem] text-[#16024A]"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
