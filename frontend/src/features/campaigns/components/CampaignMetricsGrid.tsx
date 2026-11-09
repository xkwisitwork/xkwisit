"use client";

import { Card, CardStat } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatCurrencyCompact } from "@/lib/utils/currency";
import { formatNumber, formatPercent } from "@/lib/utils/format";

import type { CampaignMetrics } from "../types";
import { summarizeMetrics } from "../utils/metricsCalculator";

export type CampaignMetricsGridProps = {
  metrics?: CampaignMetrics | null;
  loading?: boolean;
  currency?: "NGN" | "USD" | "GBP" | "EUR";
};

export function CampaignMetricsGrid({
  metrics,
  loading = false,
  currency = "NGN",
}: CampaignMetricsGridProps) {
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

  const data = summarizeMetrics(metrics);

  return (
    <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
      <Card>
        <CardStat label="Impressions" value={formatNumber(data.impressions)} />
      </Card>
      <Card>
        <CardStat label="Clicks" value={formatNumber(data.clicks)} />
      </Card>
      <Card>
        <CardStat label="CTR" value={formatPercent(data.ctr)} />
      </Card>
      <Card>
        <CardStat label="Spend" value={formatCurrencyCompact(data.spend, currency)} />
      </Card>
      <Card>
        <CardStat label="Leads" value={formatNumber(data.leads)} />
      </Card>
      <Card>
        <CardStat label="CPL" value={formatCurrencyCompact(data.cpl, currency)} />
      </Card>
      <Card>
        <CardStat label="Revenue" value={formatCurrencyCompact(data.revenue, currency)} />
      </Card>
      <Card>
        <CardStat label="ROAS" value={`${data.roas.toFixed(2)}x`} />
      </Card>
    </div>
  );
}
