"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  ClipboardList,
  ScanSearch,
  Target,
  TrendingUp,
} from "lucide-react";

import { cn } from "@/lib/utils/cn";

import type { AssessmentReport, DimensionScore } from "../types";

const bounce = { type: "spring" as const, stiffness: 360, damping: 22, mass: 0.7 };

const cardClass =
  "rounded-[1.6rem] border border-[#EDE8F6] bg-white p-5 shadow-[0_16px_40px_-28px_rgba(22,2,74,0.28)] mobile-sm:rounded-[1.75rem] mobile-sm:p-6";

/** Xkwisit cobalt: low (leak) → high (strong) */
function barColor(score: number) {
  if (score >= 75) return "#2C0494";
  if (score >= 55) return "#3B05C4";
  if (score >= 40) return "#7A4DFF";
  return "#C4B2FF";
}

function pickStrongest(dims: DimensionScore[]) {
  return [...dims].sort((a, b) => b.score - a.score)[0] ?? null;
}

function pickWeakest(dims: DimensionScore[]) {
  return [...dims].sort((a, b) => a.score - b.score)[0] ?? null;
}

/**
 * Bento dashboard for the assessment X-Ray — stacks on mobile, grid on tablet+.
 */
export function DiagnosticReport({
  report,
  loading,
}: {
  report?: AssessmentReport | null;
  loading?: boolean;
}) {
  const reduce = useReducedMotion();

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-3 tablet:grid-cols-12 tablet:gap-4">
        <div className="h-44 animate-pulse rounded-[1.75rem] bg-white/80 tablet:col-span-5" />
        <div className="h-44 animate-pulse rounded-[1.75rem] bg-white/80 tablet:col-span-3" />
        <div className="h-44 animate-pulse rounded-[1.75rem] bg-white/80 tablet:col-span-4" />
        <div className="h-56 animate-pulse rounded-[1.75rem] bg-white/80 tablet:col-span-7" />
        <div className="h-56 animate-pulse rounded-[1.75rem] bg-white/80 tablet:col-span-5" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className={cn(cardClass, "text-center")}>
        <p className="font-display text-500 font-bold text-neutral-900">
          No report found
        </p>
        <p className="mt-2 text-300 text-neutral-600">
          Take the assessment again to generate a fresh X-Ray.
        </p>
      </div>
    );
  }

  const strongest = pickStrongest(report.dimensionScores);
  const weakest = pickWeakest(report.dimensionScores);
  const gap =
    strongest && weakest ? Math.max(0, strongest.score - weakest.score) : 0;

  return (
    <div className="grid grid-cols-1 gap-3 tablet:grid-cols-12 tablet:gap-4">
      {/* Hero score — wide on tablet */}
      <motion.article
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={bounce}
        className={cn(
          cardClass,
          "bg-gradient-to-br from-white via-white to-mint-soft/40 tablet:col-span-5 laptop:col-span-4",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mint-soft text-mint">
            <ScanSearch className="h-5 w-5" aria-hidden />
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-200 font-semibold text-neutral-700"
            aria-label={`Band: ${report.bandLabel}`}
          >
            {report.bandLabel}
            <ChevronDown className="h-3.5 w-3.5 text-neutral-600" aria-hidden />
          </button>
        </div>
        <h2 className="mt-5 font-display text-500 font-bold tracking-tight text-neutral-900">
          Growth health
        </h2>
        <p className="mt-1 flex items-baseline gap-1.5">
          <span className="font-display text-[clamp(2.5rem,7vw,3.25rem)] font-bold tabular-nums leading-none text-mint-ink">
            {report.overallScore}
            <span className="text-neutral-500">/100</span>
          </span>
          <span className="text-300 text-neutral-600">pts</span>
        </p>
        {report.businessName ? (
          <p className="mt-3 text-300 text-neutral-600">{report.businessName}</p>
        ) : null}
      </motion.article>

      {/* Strongest */}
      <motion.article
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...bounce, delay: 0.05 }}
        className={cn(cardClass, "bg-[#F0FBF5] tablet:col-span-3 laptop:col-span-4")}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#067647] shadow-sm">
          <TrendingUp className="h-4 w-4" aria-hidden />
        </span>
        <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#067647]/80">
          Strongest part
        </p>
        <h3 className="mt-1 font-display text-[1.2rem] font-bold text-mint-ink">
          {strongest?.label ?? "—"}
        </h3>
        <p className="mt-2 text-[0.88rem] leading-snug text-neutral-600">
          {strongest ? (
            <>
              Holding at{" "}
              <span className="font-semibold tabular-nums text-[#067647]">
                {strongest.score}
              </span>
              . Protect it.
            </>
          ) : (
            "No dimension scores yet."
          )}
        </p>
      </motion.article>

      {/* Fix first */}
      <motion.article
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...bounce, delay: 0.1 }}
        className={cn(cardClass, "bg-[#FFF6ED] tablet:col-span-4 laptop:col-span-4")}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-amber-600 shadow-sm">
          <Target className="h-4 w-4" aria-hidden />
        </span>
        <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-amber-700/80">
          Fix first
        </p>
        <h3 className="mt-1 font-display text-[1.2rem] font-bold text-mint-ink">
          {weakest?.label ?? "—"}
        </h3>
        <p className="mt-2 text-[0.88rem] leading-snug text-neutral-600">
          {weakest ? (
            <>
              At{" "}
              <span className="font-semibold tabular-nums text-amber-700">
                {weakest.score}
              </span>
              {gap > 0 ? (
                <>
                  {" "}
                  —{" "}
                  <span className="font-semibold text-amber-700">{gap} pts</span>{" "}
                  behind your best.
                </>
              ) : (
                "."
              )}
            </>
          ) : (
            "No dimension scores yet."
          )}
        </p>
      </motion.article>

      {/* Dimension heatmap — wide */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...bounce, delay: 0.12 }}
        className="tablet:col-span-7 laptop:col-span-7"
      >
        <GrowthBarsCard dimensions={report.dimensionScores} />
      </motion.div>

      {/* Meaning + roadmap */}
      <motion.article
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...bounce, delay: 0.16 }}
        className={cn(
          cardClass,
          "bg-gradient-to-br from-[#F8F5FF] to-white tablet:col-span-5 laptop:col-span-5",
        )}
      >
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mint-soft text-mint">
            <ClipboardList className="h-4 w-4" aria-hidden />
          </span>
          <h3 className="font-display text-400 font-bold text-neutral-900">
            What this means
          </h3>
        </div>
        <p className="mt-3 text-[0.9rem] leading-relaxed text-neutral-600">
          {report.summary}
        </p>
        {report.roadmapItems.length > 0 ? (
          <ol className="mt-5 space-y-2.5 border-t border-[#EDE8F6] pt-4">
            {report.roadmapItems.map((item, i) => (
              <li key={item} className="flex gap-3 text-[0.88rem] text-neutral-700">
                <span className="font-display text-[0.95rem] font-bold tabular-nums text-mint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ol>
        ) : null}
      </motion.article>
    </div>
  );
}

function GrowthBarsCard({ dimensions }: { dimensions: DimensionScore[] }) {
  const dims = useMemo(() => [...dimensions], [dimensions]);

  if (dims.length === 0) {
    return (
      <article className={cardClass}>
        <p className="text-300 text-neutral-600">No dimension scores yet.</p>
      </article>
    );
  }

  const maxH = 148;

  return (
    <article className={cn(cardClass, "h-full")}>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Dimension heatmap
          </p>
          <p className="mt-1 text-[0.88rem] text-neutral-600">
            Seven levers · leak to strong
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="h-1.5 w-16 rounded-full mobile-sm:w-24"
            style={{
              background:
                "linear-gradient(90deg, #C4B2FF 0%, #7A4DFF 40%, #3B05C4 70%, #2C0494 100%)",
            }}
          />
          <span className="shrink-0 text-[0.65rem] text-neutral-500">
            Leak → Strong
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between gap-1.5 mobile-sm:gap-2.5 tablet:mt-8">
        {dims.map((dim, i) => {
          const h = Math.max(16, Math.round((dim.score / 100) * maxH));
          const color = barColor(dim.score);
          return (
            <div
              key={dim.dimension}
              className="flex min-w-0 flex-1 flex-col items-center"
            >
              <motion.div
                className="w-[55%] max-w-[2rem] rounded-full tablet:max-w-[2.25rem]"
                style={{ backgroundColor: color, height: h }}
                initial={{ height: 12 }}
                animate={{ height: h }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                title={`${dim.label}: ${dim.score}`}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-4 border-t border-[#EDE8F6] pt-3">
        <ul
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${dims.length}, minmax(0, 1fr))`,
          }}
        >
          {dims.map((dim) => (
            <li key={dim.dimension} className="min-w-0 text-center">
              <p className="truncate text-[0.65rem] font-medium text-neutral-600 tablet:text-[0.7rem]">
                {shortLabel(dim.label)}
              </p>
              <p className="mt-0.5 font-display text-[0.8rem] font-bold tabular-nums text-mint-ink">
                {dim.score}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function shortLabel(label: string) {
  const map: Record<string, string> = {
    Brand: "Brand",
    Demand: "Demand",
    Sales: "Sales",
    Retention: "Retain",
    Operations: "Ops",
    Analytics: "Data",
    "Digital Presence": "Digital",
    "Lead Generation": "Demand",
    "Sales Conversion": "Sales",
    "Customer Retention": "Retain",
  };
  return map[label] ?? label.split(" ")[0]!;
}
