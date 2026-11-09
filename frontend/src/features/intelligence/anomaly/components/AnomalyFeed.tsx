"use client";

import { Skeleton } from "@/components/ui/Skeleton";

import type { AnomalyListItem } from "../../types";
import { AnomalyCard } from "./AnomalyCard";

export function AnomalyFeed({
  anomalies,
  loading,
}: {
  anomalies: AnomalyListItem[];
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

  if (anomalies.length === 0) {
    return <p className="text-400 text-neutral-600">No anomalies detected.</p>;
  }

  return (
    <div className="space-y-3">
      {anomalies.map((anomaly) => (
        <AnomalyCard key={anomaly.id} anomaly={anomaly} />
      ))}
    </div>
  );
}
