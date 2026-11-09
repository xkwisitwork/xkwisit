"use client";

import { motion } from "framer-motion";

import type { DimensionScore } from "../types";

export function GrowthScoreRadar({ dimensions }: { dimensions: DimensionScore[] }) {
  if (dimensions.length === 0) {
    return <p className="text-300 text-neutral-600">No scores yet.</p>;
  }

  const sorted = [...dimensions].sort((a, b) => a.score - b.score);

  return (
    <div className="rounded-[1.5rem] border border-neutral-400/70 bg-white p-5 mobile-sm:p-6">
      <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-mint">
        Dimension scores
      </p>
      <p className="mt-1 text-300 text-neutral-600">
        Lowest first - that’s your starting lever.
      </p>
      <ul className="mt-5 space-y-4">
        {sorted.map((dim, i) => (
          <li key={dim.dimension}>
            <div className="mb-1.5 flex justify-between gap-3 text-300">
              <span className="font-medium text-neutral-800">
                {i === 0 ? (
                  <span className="mr-2 rounded-full bg-mint-soft px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-mint">
                    Fix first
                  </span>
                ) : null}
                {dim.label}
              </span>
              <span className="font-semibold tabular-nums text-neutral-900">
                {dim.score}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
              <motion.div
                className="h-full rounded-full bg-mint"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(0, dim.score))}%` }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
