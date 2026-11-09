"use client";

import { useMemo, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Building2,
  CalendarDays,
  Database,
  MoreHorizontal,
  Server,
  SlidersHorizontal,
  Users,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils/cn";
import type { PlatformHealth } from "../api/platform.api";

const ease = [0.22, 1, 0.36, 1] as const;

function formatUptime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return { value: `${h}h ${m}m`, unit: "uptime" };
  if (m > 0) return { value: `${m}m ${s}s`, unit: "uptime" };
  return { value: `${s}s`, unit: "uptime" };
}

function mongoLabel(state: string | undefined) {
  if (!state) return "Unknown";
  const s = state.toLowerCase();
  if (s.includes("connect") || s === "up" || s === "ok") return "Connected";
  if (s.includes("disconnect") || s.includes("down")) return "Down";
  return state;
}

/** Synthetic live waveform samples for the dot-matrix ECG. */
function buildWave(healthy: boolean, seed: number) {
  const points: number[] = [];
  for (let i = 0; i < 48; i += 1) {
    const t = i / 47;
    const beat = Math.sin(t * Math.PI * 6 + seed) * 0.18;
    const spike =
      i % 12 === 8
        ? healthy
          ? 0.72
          : 0.35
        : i % 12 === 9
          ? healthy
            ? -0.28
            : -0.12
          : 0;
    const noise = Math.sin(i * 1.7 + seed * 2) * 0.04;
    points.push(0.5 + beat * 0.15 + spike + noise);
  }
  return points;
}

function DotMatrixWave({
  healthy,
  className,
}: {
  healthy: boolean;
  className?: string;
}) {
  const wave = useMemo(
    () => buildWave(healthy, healthy ? 1.2 : 0.4),
    [healthy],
  );
  const cols = wave.length;
  const rows = 14;

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      aria-hidden
    >
      <div
        className="grid h-full w-full"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          gap: "3px",
        }}
      >
        {Array.from({ length: cols * rows }, (_, idx) => {
          const col = idx % cols;
          const row = Math.floor(idx / cols);
          const waveRow = Math.round((1 - wave[col]) * (rows - 1));
          const dist = Math.abs(row - waveRow);
          const onWave = dist === 0;
          const near = dist === 1;
          return (
            <span
              key={idx}
              className={cn(
                "block aspect-square rounded-full",
                onWave
                  ? healthy
                    ? "bg-[#FC3FE3]"
                    : "bg-[#F04438]"
                  : near
                    ? healthy
                      ? "bg-[#FC3FE3]/35"
                      : "bg-[#F04438]/30"
                    : "bg-[#E8E2F4]",
              )}
            />
          );
        })}
      </div>
    </div>
  );
}

function CardChrome({
  title,
  children,
  className,
  dark,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease }}
      className={cn(
        "min-w-0 overflow-hidden rounded-[1.75rem] border p-4 shadow-[0_18px_44px_-34px_rgba(22,2,74,0.4)] tablet:p-5",
        dark
          ? "border-transparent bg-[#16024A] text-white"
          : "border-[#EDE8F7] bg-white",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2
          className={cn(
            "font-display text-[1.05rem] font-bold",
            dark ? "text-white" : "text-[#16024A]",
          )}
        >
          {title}
        </h2>
        <div
          className={cn(
            "flex items-center gap-1",
            dark ? "text-white/55" : "text-neutral-400",
          )}
        >
          <span className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-black/5">
            <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden />
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-black/5">
            <MoreHorizontal className="h-3.5 w-3.5" aria-hidden />
          </span>
        </div>
      </div>
      {children}
    </motion.article>
  );
}

function MetricCell({
  icon,
  label,
  value,
  accent,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5 text-[0.7rem] font-medium text-neutral-500">
        <span className={cn(accent ? "text-[#FC3FE3]" : "text-[#3B05C4]")}>
          {icon}
        </span>
        {label}
      </div>
      <p className="mt-1 truncate font-display text-[1.35rem] font-bold tabular-nums tracking-tight text-[#16024A] tablet:text-[1.5rem]">
        {value}
      </p>
    </div>
  );
}

function HealthRing({
  score,
  label,
}: {
  score: number;
  label: string;
}) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;

  return (
    <div className="relative grid h-[9.5rem] w-[9.5rem] place-items-center">
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="8"
        />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="#FC3FE3"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease }}
          style={{
            filter: "drop-shadow(0 0 10px rgba(252,63,227,0.65))",
          }}
        />
      </svg>
      <div className="relative z-10 text-center">
        <p className="font-mono text-[1.65rem] font-bold tabular-nums tracking-wider text-white">
          {score}
          <span className="text-[0.85rem]">%</span>
        </p>
        <p className="mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-white/55">
          {label}
        </p>
      </div>
    </div>
  );
}

export function SystemHealthMonitor({
  health,
  loading,
}: {
  health: PlatformHealth | null;
  loading?: boolean;
}) {
  const healthy = health?.status === "healthy";
  const uptime = health ? formatUptime(health.uptimeSeconds) : { value: "—", unit: "uptime" };
  const mongo = mongoLabel(health?.mongodb.state);
  const score = !health ? 0 : healthy ? 96 : 62;
  const checked = health?.timestamp
    ? new Date(health.timestamp).toLocaleTimeString("en-NG", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  const counts = [
    {
      label: "Workspaces",
      value: health?.counts.workspaces,
      Icon: Building2,
    },
    {
      label: "Users",
      value: health?.counts.users,
      Icon: Users,
    },
    {
      label: "Assessments",
      value: health?.counts.assessments,
      Icon: Activity,
    },
    {
      label: "Bookings",
      value: health?.counts.bookings,
      Icon: CalendarDays,
    },
  ] as const;

  if (loading && !health) {
    return (
      <div className="grid min-w-0 gap-3 tablet:grid-cols-12">
        <div className="h-80 animate-pulse rounded-[1.75rem] bg-white tablet:col-span-7" />
        <div className="h-80 animate-pulse rounded-[1.75rem] bg-white tablet:col-span-5" />
        <div className="h-56 animate-pulse rounded-[1.75rem] bg-[#16024A]/80 tablet:col-span-5" />
        <div className="h-56 animate-pulse rounded-[1.75rem] bg-white tablet:col-span-7" />
      </div>
    );
  }

  return (
    <div className="grid min-w-0 gap-3 tablet:grid-cols-12">
      {/* Live signal — ECG-style monitor */}
      <CardChrome
        title="Live signal"
        className="flex flex-col tablet:col-span-7 laptop:col-span-8"
      >
        <div className="grid grid-cols-3 gap-3 border-b border-[#EDE8F7] pb-4">
          <MetricCell
            icon={<Server className="h-3.5 w-3.5" />}
            label="API uptime"
            value={uptime.value}
          />
          <MetricCell
            icon={<Database className="h-3.5 w-3.5" />}
            label="MongoDB"
            value={mongo}
            accent
          />
          <MetricCell
            icon={<Zap className="h-3.5 w-3.5" />}
            label="Status"
            value={health?.status === "healthy" ? "Normal" : health?.status ?? "—"}
          />
        </div>

        <div className="relative mt-4 min-h-[11rem] flex-1">
          <DotMatrixWave healthy={healthy || !health} className="h-[11rem]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between pt-6">
            <p className="rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-semibold text-neutral-500 backdrop-blur-sm">
              Process · Mongo pulse
            </p>
            <p className="rounded-full bg-white/90 px-2.5 py-1 font-mono text-[0.7rem] font-bold tabular-nums text-[#16024A] backdrop-blur-sm">
              {healthy || !health ? "SYNC" : "DEGRADED"}
            </p>
          </div>
        </div>
      </CardChrome>

      {/* Mongo detail card */}
      <CardChrome
        title="Database"
        className="flex flex-col tablet:col-span-5 laptop:col-span-4"
      >
        <div className="flex flex-1 flex-col justify-between gap-5">
          <div>
            <p className="text-[0.72rem] font-medium text-neutral-500">Active cluster</p>
            <p className="mt-1 font-display text-[1.35rem] font-bold text-[#16024A]">
              {health?.mongodb.name || "MongoDB"}
            </p>
            <p className="mt-1 text-[0.78rem] text-neutral-500">
              Ready state{" "}
              <span className="font-semibold tabular-nums text-[#16024A]">
                {health?.mongodb.readyState ?? "—"}
              </span>
              {" · "}
              Env{" "}
              <span className="font-semibold text-[#16024A]">
                {health?.nodeEnv ?? "—"}
              </span>
            </p>
          </div>

          <div className="rounded-[1.35rem] bg-[#F7F5FC] p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full",
                    healthy ? "bg-[#12B76A] shadow-[0_0_0_4px_rgba(18,183,106,0.18)]" : "bg-[#F04438]",
                  )}
                />
                <p className="text-[0.8rem] font-semibold text-[#16024A]">
                  {mongo}
                </p>
              </div>
              <span className="text-[0.68rem] text-neutral-500">Checked {checked}</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
              <motion.div
                className={cn(
                  "h-full rounded-full",
                  healthy ? "bg-[#3B05C4]" : "bg-[#F04438]",
                )}
                initial={{ width: 0 }}
                animate={{ width: healthy ? "94%" : "48%" }}
                transition={{ duration: 0.8, ease }}
              />
            </div>
            <p className="mt-2 text-[0.68rem] text-neutral-500">
              Connection pool · live probe from API process
            </p>
          </div>
        </div>
      </CardChrome>

      {/* Dark activity / health score */}
      <CardChrome
        title="System pulse"
        dark
        className="flex flex-col items-stretch tablet:col-span-5 laptop:col-span-4"
      >
        <div className="flex flex-1 flex-col items-center justify-center gap-4 py-2">
          <HealthRing score={score} label={healthy ? "Healthy" : "Attention"} />
          <p className="max-w-[14rem] text-center text-[0.78rem] leading-relaxed text-white/65">
            Live signal from the API process and MongoDB —{" "}
            {healthy ? "all primary checks clear." : "one or more checks need attention."}
          </p>
        </div>
      </CardChrome>

      {/* KPI tiles — 2×2 + full-width efficiency strip (no orphan rail gaps) */}
      <div className="flex min-w-0 flex-col gap-3 tablet:col-span-7 laptop:col-span-8">
        <div className="grid min-w-0 grid-cols-2 gap-3">
          {counts.slice(0, 4).map(({ label, value, Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.4, ease }}
              className="flex min-w-0 flex-col justify-between rounded-[1.5rem] border border-[#EDE8F7] bg-white p-4 shadow-[0_14px_32px_-28px_rgba(22,2,74,0.4)]"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[0.72rem] font-medium text-neutral-500">{label}</p>
                <Icon className="h-4 w-4 shrink-0 text-[#3B05C4]" aria-hidden />
              </div>
              <p className="mt-3 font-display text-[1.75rem] font-bold tabular-nums tracking-tight text-[#16024A]">
                {value ?? "—"}
              </p>
              <p className="mt-1 text-[0.68rem] text-neutral-500">Network table count</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4, ease }}
          className="flex min-w-0 items-center justify-between gap-4 rounded-[1.5rem] border border-transparent bg-[#16024A] p-4 text-white shadow-[0_14px_32px_-28px_rgba(22,2,74,0.55)]"
        >
          <div className="min-w-0">
            <p className="text-[0.72rem] font-medium text-white/55">Sheet leads</p>
            <p className="mt-1 font-display text-[1.75rem] font-bold tabular-nums tracking-tight">
              {health?.counts.sheetDownloads ?? "—"}
            </p>
            <p className="mt-1 text-[0.68rem] text-white/45">
              Marketing PDF unlocks flowing into the network
            </p>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-[#FC3FE3]">
            <Zap className="h-5 w-5" aria-hidden />
          </span>
        </motion.div>
      </div>
    </div>
  );
}
