"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Skeleton } from "@/components/ui/Skeleton";

import type { SeoDimensionScore } from "../types";

export function SeoDimensionBreakdown({
  dimensions,
  loading,
}: {
  dimensions: SeoDimensionScore[];
  loading?: boolean;
}) {
  if (loading) return <Skeleton variant="rectangle" className="h-48 w-full" />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dimension scores</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {dimensions.length === 0 ? (
          <p className="text-400 text-neutral-600">No dimension data.</p>
        ) : (
          dimensions.map((d) => (
            <div key={d.dimension}>
              <div className="mb-1 flex items-center justify-between text-300">
                <span>{d.dimension.replace(/_/g, " ")}</span>
                <span className="tabular-nums">
                  {d.score} · {d.issueCount} issues
                </span>
              </div>
              <Progress value={d.score} size="sm" />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
