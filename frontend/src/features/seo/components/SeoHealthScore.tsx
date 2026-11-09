"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

import type { SeoOverview } from "../types";
import { seoScoreTone } from "../utils/seoScoring";

export function SeoHealthScore({
  overview,
  loading,
}: {
  overview?: SeoOverview | null;
  loading?: boolean;
}) {
  if (loading || !overview) {
    return <Skeleton variant="rectangle" className="h-32 w-full" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO health</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-display text-800 tabular-nums leading-none">
            {overview.healthScore}
          </p>
          <p className="mt-2 text-300 text-neutral-600">{overview.domain}</p>
        </div>
        <StatusBadge tone={seoScoreTone(overview.healthScore)}>
          {overview.healthLabel}
        </StatusBadge>
      </CardContent>
    </Card>
  );
}
