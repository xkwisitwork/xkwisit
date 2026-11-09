"use client";

import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

import type { CoreWebVitalMetric } from "../types";

function ratingVariant(rating: CoreWebVitalMetric["rating"]) {
  if (rating === "good") return "success" as const;
  if (rating === "needs_improvement") return "warning" as const;
  return "destructive" as const;
}

export function CoreWebVitals({
  metrics,
  loading,
}: {
  metrics: CoreWebVitalMetric[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="grid gap-4 tablet:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} variant="rectangle" className="h-24 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 tablet:grid-cols-3 laptop:grid-cols-5">
      {metrics.map((metric) => (
        <Card key={metric.name}>
          <CardHeader className="pb-2">
            <CardTitle className="text-400">{metric.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-600 font-medium tabular-nums">
              {metric.value}
              <span className="ml-1 text-300 text-neutral-600">{metric.unit}</span>
            </p>
            <Badge variant={ratingVariant(metric.rating)} size="sm">
              {metric.rating.replace(/_/g, " ")}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
