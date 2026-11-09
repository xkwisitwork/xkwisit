"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { formatCurrencyCompact } from "@/lib/utils/currency";
import { formatNumber } from "@/lib/utils/format";

import type { CampaignMetrics } from "../types";

export type MarketingToMoneyMapProps = {
  metrics: CampaignMetrics;
  currency?: "NGN" | "USD" | "GBP" | "EUR";
};

const STEPS = [
  { key: "spend", label: "Spend" },
  { key: "leads", label: "Leads" },
  { key: "qualifiedLeads", label: "Qualified" },
  { key: "opportunities", label: "Opportunities" },
  { key: "customers", label: "Customers" },
  { key: "revenue", label: "Revenue" },
] as const;

export function MarketingToMoneyMap({
  metrics,
  currency = "NGN",
}: MarketingToMoneyMapProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketing → money</CardTitle>
        <CardDescription>
          Funnel from spend through to closed revenue for this campaign.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 tablet:grid-cols-3 laptop:grid-cols-6">
          {STEPS.map((step, index) => {
            const raw = metrics[step.key];
            const value =
              step.key === "spend" || step.key === "revenue"
                ? formatCurrencyCompact(raw, currency)
                : formatNumber(raw);

            return (
              <div
                key={step.key}
                className="relative rounded-xl border border-neutral-400 bg-neutral-50 px-3 py-4 text-center"
              >
                {index < STEPS.length - 1 ? (
                  <span className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 text-neutral-600 laptop:block">
                    →
                  </span>
                ) : null}
                <p className="text-200 text-neutral-600">{step.label}</p>
                <p className="mt-1 text-500 font-medium tabular-nums">{value}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-300 text-neutral-600">
          ROAS {metrics.roas.toFixed(2)}x · CPL{" "}
          {formatCurrencyCompact(metrics.cpl, currency)}
        </p>
      </CardContent>
    </Card>
  );
}
