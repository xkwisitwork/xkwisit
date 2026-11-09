"use client";

import { Card, CardStat } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatNumber, formatPercent } from "@/lib/utils/format";

import type { WebsiteOverview } from "../types";
import { PagePerformanceTable } from "./PagePerformanceTable";

export function WebsiteOverviewPanel({
  overview,
  loading,
}: {
  overview?: WebsiteOverview | null;
  loading?: boolean;
}) {
  if (loading || !overview) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rectangle" className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
        <Card>
          <CardStat label="Sessions" value={formatNumber(overview.sessions)} />
        </Card>
        <Card>
          <CardStat label="Users" value={formatNumber(overview.users)} />
        </Card>
        <Card>
          <CardStat label="Bounce rate" value={formatPercent(overview.bounceRate)} />
        </Card>
        <Card>
          <CardStat label="Conversion" value={formatPercent(overview.conversionRate)} />
        </Card>
      </div>
      <PagePerformanceTable pages={overview.topPages} />
    </div>
  );
}
