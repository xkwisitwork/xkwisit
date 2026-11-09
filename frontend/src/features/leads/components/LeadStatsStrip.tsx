"use client";

import { useQuery } from "@tanstack/react-query";

import { Card, CardStat } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatCurrencyCompact } from "@/lib/utils/currency";

import { getLeadStats } from "../api/leads.api";
import { leadKeys } from "../api/queryKeys";
import type { LeadStats } from "../types";

const EMPTY_STATS: LeadStats = {
  total: 0,
  new: 0,
  qualified: 0,
  won: 0,
  lost: 0,
  averageScore: 0,
  conversionsThisMonth: 0,
  pipelineValue: { amount: 0, currency: "NGN" },
};

export function LeadStatsStrip() {
  const { data, isLoading, isError } = useQuery({
    queryKey: leadKeys.stats(),
    queryFn: ({ signal }) => getLeadStats(signal),
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
          label="Total leads"
          value={stats.total}
          delta={
            <Badge variant="success" size="sm">
              +{stats.new} new
            </Badge>
          }
        />
      </Card>
      <Card>
        <CardStat
          label="Qualified"
          value={stats.qualified}
          delta={
            <Badge variant="info" size="sm">
              Avg {stats.averageScore}
            </Badge>
          }
        />
      </Card>
      <Card>
        <CardStat
          label="Won this month"
          value={stats.conversionsThisMonth}
          delta={
            <Badge variant="success" size="sm">
              {stats.won} total
            </Badge>
          }
        />
      </Card>
      <Card>
        <CardStat
          label="Pipeline value"
          value={formatCurrencyCompact(stats.pipelineValue.amount)}
          delta={
            <Badge variant="muted" size="sm">
              {isError ? "Unavailable" : "Open"}
            </Badge>
          }
        />
      </Card>
    </div>
  );
}
