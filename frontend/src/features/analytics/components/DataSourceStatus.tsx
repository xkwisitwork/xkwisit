"use client";

import { Skeleton } from "@/components/ui/Skeleton";

import type { DataSource } from "../types";
import { DataSourceCard } from "./DataSourceCard";

export function DataSourcesPanel({
  sources,
  loading,
}: {
  sources: DataSource[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="grid gap-4 tablet:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} variant="rectangle" className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (sources.length === 0) {
    return <p className="text-400 text-neutral-600">No data sources connected.</p>;
  }

  return (
    <div className="grid gap-4 tablet:grid-cols-2">
      {sources.map((source) => (
        <DataSourceCard key={source.id} source={source} />
      ))}
    </div>
  );
}
