"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Building2,
  CalendarDays,
  ClipboardList,
  RefreshCw,
  Shield,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils/cn";
import type { PlatformAuditEvent } from "../api/platform.api";

const ease = [0.22, 1, 0.36, 1] as const;

type EventKind = "workspace" | "user" | "booking" | "assessment" | "other";

const KIND_META: Record<
  EventKind,
  {
    label: string;
    Icon: typeof Building2;
    chip: string;
    soft: string;
    text: string;
    eyebrow: string;
  }
> = {
  workspace: {
    label: "Workspace",
    Icon: Building2,
    chip: "bg-[#EEF2FF] text-[#3730A3]",
    soft: "bg-[#EEF2FF]",
    text: "text-[#3730A3]",
    eyebrow: "Workspace activity",
  },
  user: {
    label: "User",
    Icon: Users,
    chip: "bg-[#ECFDF3] text-[#027A48]",
    soft: "bg-[#ECFDF3]",
    text: "text-[#027A48]",
    eyebrow: "Account activity",
  },
  booking: {
    label: "Booking",
    Icon: CalendarDays,
    chip: "bg-[#FFFAEB] text-[#B54708]",
    soft: "bg-[#FFFAEB]",
    text: "text-[#B54708]",
    eyebrow: "Booking activity",
  },
  assessment: {
    label: "Assessment",
    Icon: ClipboardList,
    chip: "bg-[#F4F0FF] text-[#3B05C4]",
    soft: "bg-[#F4F0FF]",
    text: "text-[#3B05C4]",
    eyebrow: "Assessment activity",
  },
  other: {
    label: "Other",
    Icon: Activity,
    chip: "bg-[#F2F4F7] text-[#344054]",
    soft: "bg-[#F2F4F7]",
    text: "text-[#344054]",
    eyebrow: "Network activity",
  },
};

function kindOf(type: string): EventKind {
  if (type.startsWith("workspace")) return "workspace";
  if (type.startsWith("user")) return "user";
  if (type.startsWith("booking")) return "booking";
  if (type.startsWith("assessment")) return "assessment";
  return "other";
}

function formatWhen(iso: string) {
  const d = new Date(iso);
  return {
    full: d.toLocaleString("en-NG", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    time: d.toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" }),
    day: d.toLocaleDateString("en-NG", { month: "short", day: "numeric" }),
  };
}

function MetricTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-[#EDE8F7] bg-[#FBF9FF] px-3.5 py-3">
      <p className="text-[0.7rem] font-medium text-neutral-500">{label}</p>
      <p className="mt-1 font-display text-[1.45rem] font-bold tabular-nums tracking-tight text-[#16024A]">
        {value}
      </p>
      <p className="mt-0.5 text-[0.68rem] text-neutral-500">{hint}</p>
    </div>
  );
}

function CategoryCard({
  kind,
  count,
  latest,
}: {
  kind: Exclude<EventKind, "other">;
  count: number;
  latest: PlatformAuditEvent | null;
}) {
  const meta = KIND_META[kind];
  const Icon = meta.Icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
      className={cn("min-w-0 rounded-[1.25rem] p-4", meta.soft)}
    >
      <p className={cn("text-[0.65rem] font-bold uppercase tracking-[0.12em]", meta.text)}>
        {meta.eyebrow}
      </p>
      <div className="mt-2 flex items-start justify-between gap-2">
        <p className={cn("font-display text-[1.05rem] font-bold leading-snug", meta.text)}>
          {count} event{count === 1 ? "" : "s"}
        </p>
        <Icon className={cn("h-4 w-4 shrink-0 opacity-80", meta.text)} aria-hidden />
      </div>
      <p className={cn("mt-2 line-clamp-2 text-[0.75rem] leading-relaxed opacity-80", meta.text)}>
        {latest
          ? `${latest.title} · ${formatWhen(latest.at).full}`
          : "No recent activity in this stream yet."}
      </p>
    </motion.div>
  );
}

function ActivityPath({ events }: { events: PlatformAuditEvent[] }) {
  const steps = events.slice(0, 5).map((e) => kindOf(e.type));
  if (steps.length === 0) {
    return (
      <p className="text-[0.8rem] text-neutral-500">
        Path will fill as workspace, user, booking, and assessment events land.
      </p>
    );
  }

  return (
    <div className="flex w-full min-w-0 items-center gap-1.5 tablet:gap-2">
      {steps.map((kind, i) => {
        const meta = KIND_META[kind];
        const isLast = i === steps.length - 1;
        return (
          <div key={`${kind}-${i}`} className="contents">
            <span
              className={cn(
                "inline-flex min-w-0 flex-1 items-center justify-center truncate rounded-full px-2.5 py-2 text-center text-[0.7rem] font-semibold",
                isLast
                  ? "bg-[#FC3FE3] text-white shadow-[0_10px_22px_-12px_rgba(252,63,227,0.7)]"
                  : "bg-[#F2F4F7] text-[#344054]",
              )}
            >
              {meta.label}
            </span>
            {!isLast ? (
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-neutral-300" aria-hidden />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function EventRow({ event, index }: { event: PlatformAuditEvent; index: number }) {
  const kind = kindOf(event.type);
  const meta = KIND_META[kind];
  const Icon = meta.Icon;
  const when = formatWhen(event.at);

  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: Math.min(index, 12) * 0.03, duration: 0.35, ease }}
      className="flex min-w-0 gap-3 rounded-2xl border border-[#EDE8F7] bg-[#FBF9FF] px-3.5 py-3"
    >
      <span
        className={cn(
          "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full",
          meta.soft,
          meta.text,
        )}
      >
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate font-semibold text-[#16024A]">{event.title}</p>
          <span
            className={cn(
              "inline-flex rounded-full px-2 py-0.5 text-[0.65rem] font-semibold",
              meta.chip,
            )}
          >
            {meta.label}
          </span>
        </div>
        <p className="mt-0.5 line-clamp-2 text-[0.78rem] text-neutral-500">{event.detail}</p>
      </div>
      <time className="shrink-0 text-right text-[0.68rem] text-neutral-400">
        <span className="block font-medium text-neutral-500">{when.day}</span>
        {when.time}
      </time>
    </motion.li>
  );
}

export function AuditTrailMonitor({
  events,
  loading,
}: {
  events: PlatformAuditEvent[];
  loading?: boolean;
}) {
  const sorted = useMemo(
    () =>
      [...events].sort(
        (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime(),
      ),
    [events],
  );

  const featured = sorted[0] ?? null;
  const featuredKind = featured ? kindOf(featured.type) : "other";
  const featuredMeta = KIND_META[featuredKind];
  const FeaturedIcon = featuredMeta.Icon;

  const byKind = useMemo(() => {
    const init: Record<Exclude<EventKind, "other">, PlatformAuditEvent[]> = {
      workspace: [],
      user: [],
      booking: [],
      assessment: [],
    };
    for (const e of sorted) {
      const k = kindOf(e.type);
      if (k !== "other") init[k].push(e);
    }
    return init;
  }, [sorted]);

  const latestByKind = {
    workspace: byKind.workspace[0] ?? null,
    user: byKind.user[0] ?? null,
    booking: byKind.booking[0] ?? null,
    assessment: byKind.assessment[0] ?? null,
  };

  const firstAt = sorted[sorted.length - 1]?.at;
  const lastAt = sorted[0]?.at;
  const windowHint =
    firstAt && lastAt
      ? `${formatWhen(firstAt).day} → ${formatWhen(lastAt).day}`
      : "Waiting for activity";

  if (loading && events.length === 0) {
    return (
      <div className="space-y-3">
        <div className="h-56 animate-pulse rounded-[1.75rem] bg-white" />
        <div className="grid gap-3 tablet:grid-cols-2 laptop:grid-cols-4">
          <div className="h-28 animate-pulse rounded-[1.25rem] bg-white" />
          <div className="h-28 animate-pulse rounded-[1.25rem] bg-white" />
          <div className="h-28 animate-pulse rounded-[1.25rem] bg-white" />
          <div className="h-28 animate-pulse rounded-[1.25rem] bg-white" />
        </div>
        <div className="h-64 animate-pulse rounded-[1.75rem] bg-white" />
      </div>
    );
  }

  return (
    <div className="min-w-0 space-y-3">
      {/* Featured incident-style card */}
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease }}
        className="min-w-0 overflow-hidden rounded-[1.75rem] border border-[#EDE8F7] bg-white p-4 shadow-[0_18px_44px_-34px_rgba(22,2,74,0.4)] tablet:p-6"
      >
        <div className="flex flex-wrap items-start gap-3">
          <span
            className={cn(
              "grid h-11 w-11 shrink-0 place-items-center rounded-full",
              featured ? featuredMeta.soft : "bg-[#ECFDF3]",
              featured ? featuredMeta.text : "text-[#027A48]",
            )}
          >
            {featured ? (
              <FeaturedIcon className="h-5 w-5" aria-hidden />
            ) : (
              <RefreshCw className="h-5 w-5" aria-hidden />
            )}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-display text-[1.25rem] font-bold tracking-tight text-[#16024A] tablet:text-[1.45rem]">
                {featured?.title ?? "Network quiet"}
              </h2>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF3] px-2.5 py-1 text-[0.7rem] font-semibold text-[#027A48]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#12B76A]" />
                {featured ? "Live · watching" : "Idle · watching"}
              </span>
            </div>
            <p className="mt-1.5 text-[0.8rem] leading-relaxed text-neutral-500">
              {featured
                ? `${featured.id} · ${featured.detail} · ${formatWhen(featured.at).full}`
                : "Derived from recent workspace, user, booking, and assessment activity."}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5 laptop:grid-cols-4">
          <MetricTile
            label="Events in view"
            value={String(sorted.length)}
            hint={windowHint}
          />
          <MetricTile
            label="Workspaces"
            value={String(byKind.workspace.length)}
            hint={latestByKind.workspace ? formatWhen(latestByKind.workspace.at).time : "—"}
          />
          <MetricTile
            label="Users"
            value={String(byKind.user.length)}
            hint={latestByKind.user ? formatWhen(latestByKind.user.at).time : "—"}
          />
          <MetricTile
            label="Bookings + assessments"
            value={String(byKind.booking.length + byKind.assessment.length)}
            hint="Lead & delivery signals"
          />
        </div>

        <div className="mt-6">
          <h3 className="font-display text-[1.05rem] font-bold text-[#16024A]">
            Activity breakdown
          </h3>
          <p className="mt-1 text-[0.78rem] text-neutral-500">
            Streams color-coded by source — same signals that feed Network pulse.
          </p>
          <div className="mt-3 grid gap-2.5 tablet:grid-cols-2 laptop:grid-cols-4">
            <CategoryCard
              kind="workspace"
              count={byKind.workspace.length}
              latest={latestByKind.workspace}
            />
            <CategoryCard
              kind="user"
              count={byKind.user.length}
              latest={latestByKind.user}
            />
            <CategoryCard
              kind="booking"
              count={byKind.booking.length}
              latest={latestByKind.booking}
            />
            <CategoryCard
              kind="assessment"
              count={byKind.assessment.length}
              latest={latestByKind.assessment}
            />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-display text-[1.05rem] font-bold text-[#16024A]">
            Recent path
          </h3>
          <p className="mt-1 text-[0.78rem] text-neutral-500">
            Newest events left → right. Highlighted pill is the latest hop.
          </p>
          <div className="mt-3">
            <ActivityPath events={sorted} />
          </div>
        </div>

        {featured ? (
          <div className="mt-6">
            <h3 className="font-display text-[1.05rem] font-bold text-[#16024A]">
              Latest resolution snapshot
            </h3>
            <div className="mt-3 grid gap-2.5 tablet:grid-cols-2">
              <div className="rounded-2xl bg-[#EEF2FF] px-4 py-3">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#3730A3]">
                  Signal
                </p>
                <p className="mt-1 font-semibold text-[#16024A]">{featured.type}</p>
                <p className="mt-1 text-[0.75rem] text-[#3730A3]/80">{featured.detail}</p>
              </div>
              <div className="rounded-2xl bg-[#F2F4F7] px-4 py-3">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#344054]">
                  Captured
                </p>
                <p className="mt-1 font-semibold text-[#16024A]">
                  {formatWhen(featured.at).full}
                </p>
                <p className="mt-1 text-[0.75rem] text-neutral-500">
                  Super Admin audit feed · read-only derived trail
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </motion.article>

      {/* Full event feed */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.45, ease }}
        className="min-w-0 overflow-hidden rounded-[1.75rem] border border-[#EDE8F7] bg-white p-4 shadow-[0_18px_44px_-34px_rgba(22,2,74,0.4)] tablet:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-[1.15rem] font-bold text-[#16024A]">
              Event feed
            </h2>
            <p className="mt-0.5 text-[0.78rem] text-neutral-500">
              Chronological trail across the Xkwisit network
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F0FF] px-2.5 py-1 text-[0.7rem] font-semibold text-[#3B05C4]">
            <Shield className="h-3.5 w-3.5" aria-hidden />
            Platform only
          </span>
        </div>

        {sorted.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-[#EDE8F7] bg-[#FBF9FF] px-4 py-8 text-center text-[0.84rem] text-neutral-500">
            No audit events yet. Create accounts and workspaces to populate this feed.
          </p>
        ) : (
          <ul className="mt-4 space-y-2.5">
            {sorted.map((event, i) => (
              <EventRow key={event.id} event={event} index={i} />
            ))}
          </ul>
        )}
      </motion.section>
    </div>
  );
}
