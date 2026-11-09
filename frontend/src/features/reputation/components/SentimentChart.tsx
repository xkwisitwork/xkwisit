"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatPercent } from "@/lib/utils/format";

import type { SentimentSplit } from "../types";
import { sentimentPercent } from "../utils/sentiment";

export function SentimentChart({
  split,
  loading,
}: {
  split?: SentimentSplit | null;
  loading?: boolean;
}) {
  if (loading || !split) {
    return <Skeleton variant="rectangle" className="h-40 w-full" />;
  }

  const pct = sentimentPercent(split);
  const rows = [
    { label: "Positive", value: pct.positive, className: "bg-success" },
    { label: "Neutral", value: pct.neutral, className: "bg-neutral-400" },
    { label: "Negative", value: pct.negative, className: "bg-destructive" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sentiment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex h-3 overflow-hidden rounded-full bg-neutral-200">
          {rows.map((row) =>
            row.value > 0 ? (
              <div
                key={row.label}
                className={row.className}
                style={{ width: `${row.value}%` }}
              />
            ) : null,
          )}
        </div>
        <ul className="grid gap-2 tablet:grid-cols-3">
          {rows.map((row) => (
            <li key={row.label} className="text-300">
              <span className="text-neutral-600">{row.label}</span>
              <span className="ml-2 font-medium tabular-nums">
                {formatPercent(row.value)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
