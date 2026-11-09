"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils/date";

import type { RatingPoint } from "../types";
import { formatRating } from "../utils/sentiment";

export function RatingTrend({
  points,
  loading,
}: {
  points: RatingPoint[];
  loading?: boolean;
}) {
  if (loading) {
    return <Skeleton variant="rectangle" className="h-40 w-full" />;
  }

  if (points.length === 0) {
    return <p className="text-400 text-neutral-600">No rating trend yet.</p>;
  }

  const max = Math.max(...points.map((p) => p.averageRating), 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rating trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex h-32 items-end gap-1">
          {points.map((point) => (
            <div
              key={point.date}
              className="flex flex-1 flex-col items-center gap-1"
              title={`${formatDate(point.date, "d MMM")}: ${formatRating(point.averageRating)}`}
            >
              <div
                className="w-full rounded-t bg-primary/80"
                style={{
                  height: `${Math.max(8, (point.averageRating / max) * 100)}%`,
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-200 text-neutral-600">
          <span>{formatDate(points[0]!.date, "d MMM")}</span>
          <span>{formatDate(points[points.length - 1]!.date, "d MMM")}</span>
        </div>
      </CardContent>
    </Card>
  );
}
