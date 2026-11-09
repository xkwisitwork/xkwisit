"use client";

import { Card, CardStat } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatCurrencyCompact } from "@/lib/utils/currency";
import { formatNumber, formatPercent } from "@/lib/utils/format";

import type { ContentPerformance } from "../types";

export type ContentPerformanceWidgetProps = {
  metrics?: ContentPerformance | null;
  loading?: boolean;
};

export function ContentPerformanceWidget({
  metrics,
  loading = false,
}: ContentPerformanceWidgetProps) {
  if (loading || !metrics) {
    return (
      <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i}>
            <Skeleton variant="text" className="w-20" />
            <Skeleton variant="text" className="mt-3 h-7 w-24" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
      <Card>
        <CardStat label="Reach" value={formatNumber(metrics.reach)} />
      </Card>
      <Card>
        <CardStat label="Impressions" value={formatNumber(metrics.impressions)} />
      </Card>
      <Card>
        <CardStat label="Engagement" value={formatNumber(metrics.engagement)} />
      </Card>
      <Card>
        <CardStat label="Eng. rate" value={formatPercent(metrics.engagementRate)} />
      </Card>
      <Card>
        <CardStat label="Clicks" value={formatNumber(metrics.clicks)} />
      </Card>
      <Card>
        <CardStat label="Leads" value={formatNumber(metrics.leads)} />
      </Card>
      <Card>
        <CardStat label="Customers" value={formatNumber(metrics.customers)} />
      </Card>
      <Card>
        <CardStat label="Revenue" value={formatCurrencyCompact(metrics.revenue)} />
      </Card>
    </div>
  );
}
