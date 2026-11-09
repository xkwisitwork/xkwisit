"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils/cn";
import type { XrayScanResult, XraySignal } from "@/features/xray/api/xray.api";

const ease = [0.22, 1, 0.36, 1] as const;

const SEGMENT_COLORS = ["#3B05C4", "#5B45FF", "#16024A", "#9B87F5"] as const;

function useCountUp(target: number, duration = 900, enabled = true) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setValue(0);
      return;
    }
    if (reduce) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, enabled, reduce]);

  return value;
}

function Shell({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease }}
      className={cn(
        "rounded-[1.5rem] border border-[#E7DEFF] bg-white p-5 shadow-[0_18px_40px_-28px_rgba(22,2,74,0.28)] mobile-sm:p-6",
        className,
      )}
    >
      {children}
    </motion.article>
  );
}

function ProgressBarCard({
  title,
  score,
  detail,
  delay,
}: {
  title: string;
  score: number;
  detail: string;
  delay: number;
}) {
  const reduce = useReducedMotion();
  const shown = useCountUp(score, 900, true);
  return (
    <Shell delay={delay}>
      <p className="font-display text-[1.05rem] font-bold text-mint-ink">{title}</p>
      <p className="mt-3 font-display text-[2.35rem] font-bold tabular-nums leading-none text-mint-ink">
        {shown}%
      </p>
      <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-[#F4F0FF]">
        <motion.div
          className="h-full rounded-full bg-mint"
          initial={reduce ? { width: `${score}%` } : { width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.9, ease, delay: delay + 0.1 }}
        />
      </div>
      <p className="mt-4 text-[0.85rem] leading-relaxed text-neutral-600">{detail}</p>
    </Shell>
  );
}

function GaugeCard({
  title,
  score,
  detail,
  delay,
}: {
  title: string;
  score: number;
  detail: string;
  delay: number;
}) {
  const reduce = useReducedMotion();
  const shown = useCountUp(score, 1000, true);
  const r = 54;
  const c = Math.PI * r;
  const dash = (score / 100) * c;

  return (
    <Shell delay={delay} className="flex flex-col">
      <p className="font-display text-[1.05rem] font-bold text-mint-ink">{title}</p>
      <div className="relative mx-auto mt-4 w-full max-w-[220px]">
        <svg viewBox="0 0 140 90" className="h-auto w-full" aria-hidden>
          <path
            d="M 16 78 A 54 54 0 0 1 124 78"
            fill="none"
            stroke="#F4F0FF"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <motion.path
            d="M 16 78 A 54 54 0 0 1 124 78"
            fill="none"
            stroke="#3B05C4"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={`${c} ${c}`}
            initial={reduce ? { strokeDashoffset: c - dash } : { strokeDashoffset: c }}
            animate={{ strokeDashoffset: c - dash }}
            transition={{ duration: 1.05, ease, delay: delay + 0.15 }}
          />
        </svg>
        <div className="pointer-events-none absolute inset-x-0 bottom-1 text-center">
          <p className="font-display text-[0.95rem] font-bold tabular-nums text-mint-ink">
            Total %{shown}
          </p>
        </div>
      </div>
      <p className="mt-auto pt-3 text-[0.85rem] leading-relaxed text-neutral-600">{detail}</p>
    </Shell>
  );
}

function SegmentBarCard({
  title,
  overall,
  signals,
  delay,
}: {
  title: string;
  overall: number;
  signals: XraySignal[];
  delay: number;
}) {
  const reduce = useReducedMotion();
  const shown = useCountUp(overall, 900, true);
  const total = signals.reduce((s, x) => s + x.score, 0) || 1;
  const strongest = [...signals].sort((a, b) => b.score - a.score)[0];

  return (
    <Shell delay={delay}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <p className="font-display text-[1.05rem] font-bold text-mint-ink">{title}</p>
        <div className="flex items-center gap-2">
          <span className="font-display text-[1.35rem] font-bold tabular-nums text-mint-ink">
            {shown}%
          </span>
          {strongest ? (
            <span className="rounded-full bg-[#E8F8EF] px-2.5 py-1 text-[0.68rem] font-semibold text-[#00AC4F]">
              ↑ {strongest.label.split(" ")[0]}
            </span>
          ) : null}
        </div>
      </div>
      <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-[#F4F0FF]">
        {signals.map((signal, i) => (
          <motion.span
            key={signal.label}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{ backgroundColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }}
            initial={reduce ? { width: `${(signal.score / total) * 100}%` } : { width: 0 }}
            animate={{ width: `${(signal.score / total) * 100}%` }}
            transition={{ duration: 0.85, ease, delay: delay + 0.12 + i * 0.08 }}
          />
        ))}
      </div>
      <ul className="mt-4 grid gap-2 mobile-sm:grid-cols-2">
        {signals.map((signal, i) => (
          <li key={signal.label} className="flex items-center gap-2 text-[0.78rem] text-neutral-600">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
              style={{ backgroundColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }}
            />
            <span className="truncate">{signal.label}</span>
            <span className="ml-auto tabular-nums font-semibold text-mint-ink">{signal.score}</span>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

function RingCard({
  title,
  score,
  ratioLabel,
  detail,
  delay,
}: {
  title: string;
  score: number;
  ratioLabel: string;
  detail: string;
  delay: number;
}) {
  const reduce = useReducedMotion();
  const shown = useCountUp(score, 1000, true);
  const r = 42;
  const c = 2 * Math.PI * r;
  const dash = (score / 100) * c;

  return (
    <Shell delay={delay}>
      <p className="font-display text-[1.05rem] font-bold text-mint-ink">{title}</p>
      <div className="mt-4 flex items-center gap-4">
        <div className="relative h-[108px] w-[108px] shrink-0">
          <svg viewBox="0 0 108 108" className="h-full w-full -rotate-90" aria-hidden>
            <circle cx="54" cy="54" r={r} fill="none" stroke="#F4F0FF" strokeWidth="12" />
            <motion.circle
              cx="54"
              cy="54"
              r={r}
              fill="none"
              stroke="#5B45FF"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${c} ${c}`}
              initial={reduce ? { strokeDashoffset: c - dash } : { strokeDashoffset: c }}
              animate={{ strokeDashoffset: c - dash }}
              transition={{ duration: 1.05, ease, delay: delay + 0.12 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-center font-display text-[0.78rem] font-bold leading-tight text-mint-ink">
              Total
              <br />%{shown}
            </p>
          </div>
        </div>
        <div className="min-w-0">
          <p className="font-display text-[1.55rem] font-bold tabular-nums leading-none text-mint-ink">
            {ratioLabel}
          </p>
          <p className="mt-2 text-[0.82rem] leading-relaxed text-neutral-600">{detail}</p>
        </div>
      </div>
    </Shell>
  );
}

function StatusCard({
  title,
  score,
  detail,
  tone,
  delay,
}: {
  title: string;
  score: number;
  detail: string;
  tone: "good" | "warn";
  delay: number;
}) {
  const shown = useCountUp(score, 850, true);
  const Icon = tone === "good" ? ShieldCheck : AlertTriangle;
  return (
    <Shell delay={delay}>
      <p className="font-display text-[1.05rem] font-bold text-mint-ink">{title}</p>
      <div className="mt-5 flex items-center gap-4">
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, delay: delay + 0.15, ease }}
          className={cn(
            "inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full",
            tone === "good" ? "bg-[#E8F8EF] text-[#00AC4F]" : "bg-[#FDECEC] text-[#E11D48]",
          )}
        >
          <Icon className="h-6 w-6" aria-hidden />
        </motion.span>
        <div className="min-w-0">
          <p className="font-display text-[1.7rem] font-bold tabular-nums leading-none text-mint-ink">
            {shown}%
          </p>
          <p className="mt-2 text-[0.85rem] leading-relaxed text-neutral-600">{detail}</p>
        </div>
      </div>
    </Shell>
  );
}

export function XrayAnalysisBoard({ result }: { result: XrayScanResult }) {
  const weakest = useMemo(
    () => [...result.signals].sort((a, b) => a.score - b.score)[0]!,
    [result.signals],
  );
  const strongest = useMemo(
    () => [...result.signals].sort((a, b) => b.score - a.score)[0]!,
    [result.signals],
  );

  const okCount = result.findings.filter((f) => f.severity === "ok").length;
  const issueCount = result.findings.filter((f) => f.severity !== "ok").length;
  const passRate = result.findings.length
    ? Math.round((okCount / result.findings.length) * 100)
    : result.overall;
  const exposure = result.findings.length
    ? Math.round((issueCount / result.findings.length) * 100)
    : Math.max(0, 100 - result.overall);

  return (
    <div className="mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
        className="mb-5 flex flex-wrap items-end justify-between gap-2"
      >
        <div>
          <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-mint">
            Live read · {result.domain}
          </p>
          <p className="mt-1 text-300 text-neutral-600">
            Fetched {result.finalUrl.replace(/^https?:\/\//, "")} in {result.timingMs}ms
          </p>
        </div>
        <p className="rounded-full bg-mint-soft px-3 py-1.5 text-[0.75rem] font-semibold text-mint-ink">
          Fix first: {result.constraint}
        </p>
      </motion.div>

      <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        <ProgressBarCard
          title="Growth health"
          score={result.overall}
          detail={`Public-site health for ${result.domain} sits at ${result.overall}% across the four loops.`}
          delay={0.05}
        />
        <GaugeCard
          title="Weakest loop"
          score={weakest.score}
          detail={`${weakest.label} is the constraint — open this first on Monday.`}
          delay={0.12}
        />
        <SegmentBarCard
          title="Loop mix"
          overall={result.overall}
          signals={result.signals}
          delay={0.18}
        />
        <RingCard
          title="Strongest loop"
          score={strongest.score}
          ratioLabel={`${strongest.score}/100`}
          detail={`${strongest.label} is ahead of the pack on this homepage.`}
          delay={0.24}
        />
        <StatusCard
          title="Checks passed"
          score={passRate}
          detail={
            okCount
              ? `${okCount} of ${result.findings.length} homepage checks look solid.`
              : "Few checks cleared — the public face needs work."
          }
          tone="good"
          delay={0.3}
        />
        <StatusCard
          title="Gap exposure"
          score={exposure}
          detail={
            issueCount
              ? `${issueCount} gaps flagged — ${result.constraint.toLowerCase()} leads the list.`
              : "Low gap load on the homepage read."
          }
          tone="warn"
          delay={0.36}
        />
      </div>
    </div>
  );
}
