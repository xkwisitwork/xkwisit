"use client";

import { useId, useMemo } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

import { cn } from "@/lib/utils/cn";

import type { DimensionScore } from "../types";

const Y_TICKS = [100, 75, 50, 25] as const;
const CHART_H = 220;
const PAD_TOP = 12;
const PAD_BOTTOM = 8;

function scoreToY(score: number) {
  const clamped = Math.min(100, Math.max(0, score));
  const usable = CHART_H - PAD_TOP - PAD_BOTTOM;
  return PAD_TOP + usable * (1 - clamped / 100);
}

/**
 * Liquid heatmap of growth dimensions - inspo “flowing pills”, Xkwisit cobalt.
 */
export function AssessmentHeatmap({
  dimensions,
  overallScore,
  className,
}: {
  dimensions: DimensionScore[];
  overallScore?: number;
  className?: string;
}) {
  const gooId = useId().replace(/:/g, "");
  const gradientId = `heat-grad-${gooId}`;
  const glowId = `heat-glow-${gooId}`;

  const sorted = useMemo(() => {
    // Keep original assessment order when available; fall back to label sort
    return [...dimensions];
  }, [dimensions]);

  const weakest = useMemo(() => {
    if (sorted.length === 0) return null;
    return [...sorted].sort((a, b) => a.score - b.score)[0]!;
  }, [sorted]);

  const avg =
    overallScore ??
    (sorted.length
      ? Math.round(sorted.reduce((s, d) => s + d.score, 0) / sorted.length)
      : 0);

  if (sorted.length === 0) {
    return <p className="text-300 text-neutral-600">No dimension scores yet.</p>;
  }

  const colW = 100 / sorted.length;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.5rem] border border-neutral-800 bg-[#111318] p-5 text-white shadow-[0_28px_60px_-36px_rgba(15,23,42,0.7)] mobile-sm:p-6",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-mint text-white">
            <Activity className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <p className="font-display text-400 font-bold tracking-tight text-white">
              Growth heatmap
            </p>
            <p className="text-200 text-white/80">
              Higher = healthier · cool blue = leak
            </p>
          </div>
        </div>
        <p className="text-200 tabular-nums text-white/85">
          avg. <span className="font-semibold text-white/85">{avg}</span>
        </p>
      </div>

      <div className="relative mt-6">
        {/* Y labels */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-8 flex-col justify-between pb-8 pt-1 text-[0.65rem] tabular-nums text-white/75"
          style={{ height: CHART_H + 28 }}
        >
          {Y_TICKS.map((t) => (
            <span key={t} className="leading-none">
              {t}
            </span>
          ))}
        </div>

        <div className="ml-8">
          <svg
            viewBox={`0 0 100 ${CHART_H}`}
            className="h-[220px] w-full overflow-visible"
            role="img"
            aria-label="Growth dimension heatmap"
          >
            <defs>
              {/* Xkwisit cobalt vertical scale: ice (low) → deep (high) */}
              <linearGradient id={gradientId} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#C4B2FF" />
                <stop offset="35%" stopColor="#7A4DFF" />
                <stop offset="65%" stopColor="#3B05C4" />
                <stop offset="100%" stopColor="#2C0494" />
              </linearGradient>
              <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="1.2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Goo / liquid merge */}
              <filter id={`goo-${gooId}`} x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 22 -10"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>

            {/* Grid */}
            {Y_TICKS.map((t) => {
              const y = scoreToY(t);
              return (
                <line
                  key={t}
                  x1="0"
                  x2="100"
                  y1={y}
                  y2={y}
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="0.35"
                />
              );
            })}
            {sorted.map((_, i) => {
              const x = colW * i + colW / 2;
              return (
                <line
                  key={`v-${i}`}
                  x1={x}
                  x2={x}
                  y1={PAD_TOP}
                  y2={CHART_H - PAD_BOTTOM}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="0.35"
                  strokeDasharray="1.2 1.6"
                />
              );
            })}

            {/* Soft bloom behind liquid */}
            <g opacity="0.35" filter={`url(#${glowId})`}>
              {sorted.map((dim, i) => {
                const x = colW * i + colW / 2;
                const y = scoreToY(dim.score);
                const h = Math.max(18, CHART_H - PAD_BOTTOM - y);
                return (
                  <rect
                    key={`glow-${dim.dimension}`}
                    x={x - colW * 0.28}
                    y={y}
                    width={colW * 0.56}
                    height={h}
                    rx={colW * 0.28}
                    fill={`url(#${gradientId})`}
                  />
                );
              })}
            </g>

            {/* Liquid capsules */}
            <g filter={`url(#goo-${gooId})`}>
              {sorted.map((dim, i) => {
                const x = colW * i + colW / 2;
                const y = scoreToY(dim.score);
                const h = Math.max(18, CHART_H - PAD_BOTTOM - y);
                const w = colW * 0.42;
                return (
                  <motion.rect
                    key={dim.dimension}
                    x={x - w / 2}
                    width={w}
                    rx={w / 2}
                    fill={`url(#${gradientId})`}
                    initial={{ y: CHART_H - PAD_BOTTOM - 18, height: 18 }}
                    animate={{ y, height: h }}
                    transition={{
                      duration: 0.7,
                      delay: i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                );
              })}
              {/* Bridges between neighboring pills for stronger liquid join */}
              {sorted.slice(0, -1).map((dim, i) => {
                const a = dim;
                const b = sorted[i + 1]!;
                const x1 = colW * i + colW / 2;
                const x2 = colW * (i + 1) + colW / 2;
                const y1 =
                  scoreToY(a.score) +
                  Math.max(18, CHART_H - PAD_BOTTOM - scoreToY(a.score)) * 0.45;
                const y2 =
                  scoreToY(b.score) +
                  Math.max(18, CHART_H - PAD_BOTTOM - scoreToY(b.score)) * 0.45;
                const midX = (x1 + x2) / 2;
                const midY = (y1 + y2) / 2;
                return (
                  <circle
                    key={`bridge-${a.dimension}`}
                    cx={midX}
                    cy={midY}
                    r={colW * 0.22}
                    fill={`url(#${gradientId})`}
                    opacity={0.85}
                  />
                );
              })}
            </g>

            {/* Score dots on peaks */}
            {sorted.map((dim, i) => {
              const x = colW * i + colW / 2;
              const y = scoreToY(dim.score);
              return (
                <motion.g key={`cap-${dim.dimension}`}>
                  <motion.circle
                    cx={x}
                    r={1.6}
                    fill="#F4F0FF"
                    initial={{ cy: CHART_H - PAD_BOTTOM, opacity: 0 }}
                    animate={{ cy: y + 2, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.06 }}
                  />
                </motion.g>
              );
            })}
          </svg>

          {/* X labels */}
          <ul
            className="mt-1 grid gap-1"
            style={{ gridTemplateColumns: `repeat(${sorted.length}, minmax(0, 1fr))` }}
          >
            {sorted.map((dim) => (
              <li key={dim.dimension} className="min-w-0 text-center">
                <p className="truncate text-[0.65rem] font-medium text-white/85">
                  {dim.label}
                </p>
                <p
                  className={cn(
                    "mt-0.5 font-display text-300 font-bold tabular-nums",
                    weakest?.dimension === dim.dimension
                      ? "text-mint-ice"
                      : "text-white/80",
                  )}
                >
                  {dim.score}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {weakest ? (
        <p className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-300 leading-relaxed text-white/90">
          Coolest zone (fix first):{" "}
          <span className="font-semibold text-mint-ice">{weakest.label}</span> at{" "}
          {weakest.score}.
        </p>
      ) : null}

      {/* Legend */}
      <div className="mt-4 flex items-center gap-3">
        <div
          className="h-2 flex-1 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, #C4B2FF 0%, #7A4DFF 35%, #3B05C4 65%, #2C0494 100%)",
          }}
        />
        <div className="flex shrink-0 gap-3 text-[0.65rem] text-white/80">
          <span>Leak</span>
          <span>Strong</span>
        </div>
      </div>
    </div>
  );
}
