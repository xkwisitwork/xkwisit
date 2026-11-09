"use client";

import { StatusBadge } from "@/components/ui/Badge";

import type { ContributingFactor } from "../../types";

export function ContributingFactorRow({ factor }: { factor: ContributingFactor }) {
  const tone =
    factor.direction === "up"
      ? ("success" as const)
      : factor.direction === "down"
        ? ("destructive" as const)
        : ("muted" as const);

  return (
    <div className="flex items-start justify-between gap-3 border-b border-neutral-300 py-3 last:border-0">
      <div>
        <p className="text-400 font-medium">{factor.label}</p>
        {factor.evidence ? (
          <p className="mt-1 text-200 text-neutral-600">{factor.evidence}</p>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-300 tabular-nums">
          {factor.impactPercent > 0 ? "+" : ""}
          {factor.impactPercent.toFixed(1)}%
        </span>
        <StatusBadge tone={tone} size="sm">
          {factor.direction}
        </StatusBadge>
      </div>
    </div>
  );
}

export { ContributingFactorRow as ContributingFactor };
