"use client";

import { formatCurrencyCompact } from "@/lib/utils/currency";

import type { RevenueLeak } from "../../types";
import { groupLeaksByStage, totalEstimatedLoss } from "../utils/detectLeaks";

export function LeakStageComparison({ leaks }: { leaks: RevenueLeak[] }) {
  const grouped = groupLeaksByStage(leaks);
  const stages = Object.entries(grouped);
  const currency = leaks[0]?.currency ?? "NGN";

  if (stages.length === 0) {
    return <p className="text-400 text-neutral-600">No stage data.</p>;
  }

  return (
    <ul className="divide-y divide-neutral-300 rounded-xl border border-neutral-400">
      {stages.map(([stage, items]) => (
        <li key={stage} className="flex items-center justify-between px-4 py-3 text-300">
          <span>
            {stage} <span className="text-neutral-600">({items.length})</span>
          </span>
          <span className="font-medium tabular-nums">
            {formatCurrencyCompact(totalEstimatedLoss(items), currency)}
          </span>
        </li>
      ))}
    </ul>
  );
}
