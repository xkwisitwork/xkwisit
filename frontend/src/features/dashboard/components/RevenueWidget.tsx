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

export function RevenueWidget({
  value,
  currency,
  deltaPercent = 12,
}: {
  value: number;
  currency: "NGN" | "USD" | "GBP" | "EUR";
  deltaPercent?: number;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Revenue MTD</CardTitle>
        <CardDescription>Collected retainers + projects</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-display text-700 font-bold tabular-nums text-neutral-900">
          {formatCurrencyCompact(value, currency)}
        </p>
        <div className="mt-4">
          <Badge variant={deltaPercent >= 0 ? "success" : "warning"} size="sm">
            {deltaPercent >= 0 ? "+" : ""}
            {deltaPercent}% vs last month
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
