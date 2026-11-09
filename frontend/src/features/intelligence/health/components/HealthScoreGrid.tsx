"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";

import type { ClientHealthSnapshot } from "../../types";
import { healthLabel, healthScoreTone } from "../utils/clientHealthScore";
import { HealthDimensionCard } from "./HealthDimension";

export function HealthScoreGrid({
  snapshot,
  loading,
}: {
  snapshot?: ClientHealthSnapshot | null;
  loading?: boolean;
}) {
  if (loading || !snapshot) {
    return (
      <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} variant="rectangle" className="h-28 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-4">
        <p className="font-display text-800 tabular-nums leading-none">
          {snapshot.score}
        </p>
        <StatusBadge tone={healthScoreTone(snapshot.score)}>
          {snapshot.label || healthLabel(snapshot.score)}
        </StatusBadge>
        <p className="text-300 text-neutral-600">{snapshot.clientName}</p>
      </div>
      <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        {snapshot.dimensions.map((dimension) => (
          <HealthDimensionCard key={dimension.key} dimension={dimension} />
        ))}
      </div>
    </div>
  );
}
