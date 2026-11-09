"use client";

import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { formatCurrencyCompact } from "@/lib/utils/currency";

export function PipelineWidget({
  value,
  currency,
  openDeals = 14,
  winRate = 0.38,
}: {
  value: number;
  currency: "NGN" | "USD" | "GBP" | "EUR";
  openDeals?: number;
  winRate?: number;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Pipeline</CardTitle>
        <CardDescription>Open opportunity value</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-display text-700 font-bold tabular-nums text-neutral-900">
          {formatCurrencyCompact(value, currency)}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="info" size="sm">
            {openDeals} open deals
          </Badge>
          <Badge variant="success" size="sm">
            {Math.round(winRate * 100)}% win rate
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
