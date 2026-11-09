"use client";

import { Card, CardStat } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatNumber, formatPercent } from "@/lib/utils/format";

import type { AnalyticsOverview } from "../types";

export function AnalyticsOverviewPanel({
  overview,
  loading,
}: {
  overview?: AnalyticsOverview | null;
  loading?: boolean;
}) {
  if (loading || !overview) {
    return (
      <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} variant="rectangle" className="h-24 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-300 text-neutral-600">{overview.periodLabel}</p>
      <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        <Card>
          <CardStat label="Sessions" value={formatNumber(overview.sessions)} />
        </Card>
        <Card>
          <CardStat label="Users" value={formatNumber(overview.users)} />
        </Card>
        <Card>
          <CardStat label="Pageviews" value={formatNumber(overview.pageviews)} />
        </Card>
        <Card>
          <CardStat label="Bounce rate" value={formatPercent(overview.bounceRate)} />
        </Card>
        <Card>
          <CardStat label="Conversions" value={formatNumber(overview.conversions)} />
        </Card>
        <Card>
          <CardStat
            label="Conversion rate"
            value={formatPercent(overview.conversionRate)}
          />
        </Card>
      </div>
    </div>
  );
}
