"use client";

import { useQuery } from "@tanstack/react-query";

import { Card, CardStat } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatCurrencyCompact } from "@/lib/utils/currency";

import { getClientStats } from "../api/clients.api";
import { clientKeys } from "../api/queryKeys";
import type { ClientStats } from "../types";

const EMPTY_STATS: ClientStats = {
  total: 0,
  active: 0,
  atRisk: 0,
  churnedThisQuarter: 0,
  totalRetainerValue: { amount: 0, currency: "NGN" },
  averageHealthScore: 0,
};

export function ClientStatsStrip() {
  const { data, isLoading, isError } = useQuery({
    queryKey: clientKeys.stats(),
    queryFn: ({ signal }) => getClientStats(signal),
    staleTime: 60_000,
    retry: 1,
  });

  // Only skeleton while the request is in flight — never trap on !data after error.
  if (isLoading) {
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

  const stats = data ?? EMPTY_STATS;

  return (
    <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
      <Card>
        <CardStat
          label="Active clients"
          value={stats.active}
          delta={
            <Badge variant="muted" size="sm">
              {stats.total} total
            </Badge>
          }
        />
      </Card>
      <Card>
        <CardStat
          label="At risk"
          value={stats.atRisk}
          delta={
            stats.atRisk > 0 ? (
              <Badge variant="destructive" size="sm">
                Needs review
              </Badge>
            ) : (
              <Badge variant="success" size="sm">
                All healthy
              </Badge>
            )
          }
        />
      </Card>
      <Card>
        <CardStat
          label="Avg health"
          value={stats.averageHealthScore}
          delta={
            <Badge variant="info" size="sm">
              /100
            </Badge>
          }
        />
      </Card>
      <Card>
        <CardStat
          label="Retainer value"
          value={formatCurrencyCompact(stats.totalRetainerValue.amount)}
          delta={
            <Badge variant="success" size="sm">
              {isError ? "Unavailable" : "Monthly"}
            </Badge>
          }
        />
      </Card>
    </div>
  );
}
