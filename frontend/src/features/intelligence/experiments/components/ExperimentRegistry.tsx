"use client";

import { Skeleton } from "@/components/ui/Skeleton";

import type { IntelExperimentListItem } from "../../types";
import { IntelExperimentCard } from "./ExperimentCard";

export function ExperimentRegistry({
  experiments,
  loading,
}: {
  experiments: IntelExperimentListItem[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="grid gap-4 tablet:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="rectangle" className="h-28 w-full" />
        ))}
      </div>
    );
  }

  if (experiments.length === 0) {
    return <p className="text-400 text-neutral-600">No experiments yet.</p>;
  }

  return (
    <div className="grid gap-4 tablet:grid-cols-2">
      {experiments.map((experiment) => (
        <IntelExperimentCard key={experiment.id} experiment={experiment} />
      ))}
    </div>
  );
}
