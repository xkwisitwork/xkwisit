"use client";

import { Card, CardStat } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

import type { DashboardStat } from "../types";

export function StatGrid({
  stats,
  loading,
}: {
  stats: DashboardStat[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="rectangle" className="h-24 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.id}>
          <CardStat
            label={stat.label}
            value={stat.value}
            delta={
              stat.delta != null
                ? `${stat.delta > 0 ? "+" : ""}${stat.delta}%`
                : undefined
            }
          />
        </Card>
      ))}
    </div>
  );
}
