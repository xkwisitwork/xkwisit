"use client";

import { Badge } from "@/components/ui/Badge";
import { Card, CardStat } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatCurrencyCompact } from "@/lib/utils/currency";

import { useInvoiceStats } from "../hooks/useInvoices";

export function InvoiceStatsStrip() {
  const { data, isLoading } = useInvoiceStats();

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
          label="Outstanding"
          value={formatCurrencyCompact(
            data.outstanding.amount,
            data.outstanding.currency,
          )}
          delta={
            <Badge variant="warning" size="sm">
              {data.overdue} overdue
            </Badge>
          }
        />
      </Card>
      <Card>
        <CardStat
          label="Collected this month"
          value={formatCurrencyCompact(
            data.collectedThisMonth.amount,
            data.collectedThisMonth.currency,
          )}
          delta={
            <Badge variant="success" size="sm">
              {data.paid} paid
            </Badge>
          }
        />
      </Card>
      <Card>
        <CardStat
          label="Sent"
          value={data.sent}
          delta={
            <Badge variant="info" size="sm">
              {data.total} total
            </Badge>
          }
        />
      </Card>
      <Card>
        <CardStat
          label="Drafts"
          value={data.draft}
          delta={
            <Badge variant="muted" size="sm">
              Unsent
            </Badge>
          }
        />
      </Card>
    </div>
  );
}
