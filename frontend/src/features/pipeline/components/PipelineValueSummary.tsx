"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatCurrency } from "@/lib/utils/currency";
import { formatPercent } from "@/lib/utils/format";

import type { PipelineSummary } from "../types";

export type PipelineValueSummaryProps = {
  summary?: PipelineSummary;
  loading?: boolean;
};

export function PipelineValueSummary({ summary, loading }: PipelineValueSummaryProps) {
  if (loading || !summary) {
    return (
      <div className="sm:grid-cols-2 xl:grid-cols-4 grid gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="rectangle" className="h-24 rounded-2xl" />
        ))}
      </div>
    );
  }

  const stats = [
    {
      label: "Open pipeline",
      value: formatCurrency(summary.totalPipeline.amount, {
        currency: summary.totalPipeline.currency,
        compact: true,
        fractionDigits: 1,
      }),
      hint: `${summary.openDeals} open deals`,
    },
    {
      label: "Weighted",
      value: formatCurrency(summary.weightedPipeline.amount, {
        currency: summary.weightedPipeline.currency,
        compact: true,
        fractionDigits: 1,
      }),
      hint: "Probability-adjusted",
    },
    {
      label: "Avg deal size",
      value: formatCurrency(summary.avgDealSize.amount, {
        currency: summary.avgDealSize.currency,
        compact: true,
        fractionDigits: 1,
      }),
      hint: `${summary.closingThisMonth} closing this month`,
    },
    {
      label: "Win rate",
      value: formatPercent(summary.winRate, { fromDecimal: true }),
      hint: `~${summary.avgDaysToClose} days to close`,
    },
  ];

  return (
    <div className="sm:grid-cols-2 xl:grid-cols-4 grid gap-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-neutral-400/60 shadow-none">
          <CardHeader className="pb-1">
            <CardDescription>{stat.label}</CardDescription>
            <CardTitle className="font-display text-600 tabular-nums">
              {stat.value}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-200 text-neutral-600">{stat.hint}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
