"use client";

import { Badge } from "@/components/ui/Badge";
import { Card, CardStat } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatCurrencyCompact } from "@/lib/utils/currency";

import { useCampaignStats } from "../hooks/useCampaigns";

export function CampaignStatsStrip() {
  const { data, isLoading } = useCampaignStats();

  if (isLoading || !data) {
    return (
      <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
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
        <CardStat
          label="Active"
          value={data.active}
          delta={
            <Badge variant="muted" size="sm">
              {data.total} total
            </Badge>
          }
        />
      </Card>
      <Card>
        <CardStat
          label="Paused"
          value={data.paused}
          delta={
            data.paused > 0 ? (
              <Badge variant="warning" size="sm">
                Needs review
              </Badge>
            ) : (
              <Badge variant="success" size="sm">
                All clear
              </Badge>
            )
          }
        />
      </Card>
      <Card>
        <CardStat
          label="Total spend"
          value={formatCurrencyCompact(data.totalSpend.amount, data.totalSpend.currency)}
        />
      </Card>
      <Card>
        <CardStat
          label="Avg ROAS"
          value={`${data.averageRoas.toFixed(2)}x`}
          delta={
            <Badge variant="info" size="sm">
              {formatCurrencyCompact(
                data.totalRevenue.amount,
                data.totalRevenue.currency,
              )}{" "}
              rev
            </Badge>
          }
        />
      </Card>
    </div>
  );
}
