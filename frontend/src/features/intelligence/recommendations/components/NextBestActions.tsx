"use client";

import { Skeleton } from "@/components/ui/Skeleton";

import type { RecommendedAction } from "../../types";
import { sortByPriority } from "../utils/nextBestActions";
import { ActionCard } from "./ActionCard";

export function NextBestActions({
  actions,
  loading,
}: {
  actions: RecommendedAction[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} variant="rectangle" className="h-28 w-full" />
        ))}
      </div>
    );
  }

  const sorted = sortByPriority(actions);

  if (sorted.length === 0) {
    return <p className="text-400 text-neutral-600">No recommended actions.</p>;
  }

  return (
    <div className="space-y-3">
      {sorted.map((action) => (
        <ActionCard key={action.id} action={action} />
      ))}
    </div>
  );
}
