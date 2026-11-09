"use client";

import { Card, CardStat } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatPercent } from "@/lib/utils/format";

import type { UtilizationSnapshot } from "../types";

export function UtilizationWidget({
  snapshot,
  loading,
}: {
  snapshot?: UtilizationSnapshot | null;
  loading?: boolean;
}) {
  if (loading || !snapshot) {
    return <Skeleton variant="rectangle" className="h-28 w-full" />;
  }

  return (
    <div className="grid gap-4 tablet:grid-cols-3">
      <Card>
        <CardStat
          label="Avg utilization"
          value={formatPercent(snapshot.averageUtilization)}
        />
      </Card>
      <Card>
        <CardStat label="Over capacity" value={String(snapshot.overCapacityCount)} />
      </Card>
      <Card>
        <CardStat label="Under capacity" value={String(snapshot.underCapacityCount)} />
      </Card>
    </div>
  );
}
