"use client";

import { Skeleton } from "@/components/ui/Skeleton";

import type { DashboardOverview } from "../types";
import { AttentionPanel } from "./AttentionPanel";
import { StatGrid } from "./StatGrid";

export function GrowthControlCenter({
  overview,
  loading,
}: {
  overview?: DashboardOverview | null;
  loading?: boolean;
}) {
  if (loading || !overview) {
    return <Skeleton variant="rectangle" className="h-48 w-full" />;
  }

  return (
    <div className="space-y-6">
      <StatGrid stats={overview.stats} />
      <AttentionPanel items={overview.attention} />
    </div>
  );
}
