"use client";

import { useQuery } from "@tanstack/react-query";

import { Card, CardStat } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";

import { getProjectStats } from "../api/projects.api";
import { projectKeys } from "../api/queryKeys";

export function ProjectStatsStrip() {
  const { data, isLoading } = useQuery({
    queryKey: projectKeys.stats(),
    queryFn: ({ signal }) => getProjectStats(signal),
    staleTime: 60_000,
  });

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
          label="Active projects"
          value={data.onTrack + data.atRisk + data.blocked}
          delta={
            <Badge variant="muted" size="sm">
              {data.total} total
            </Badge>
          }
        />
      </Card>
      <Card>
        <CardStat
          label="On track"
          value={data.onTrack}
          delta={
            <Badge variant="success" size="sm">
              Healthy
            </Badge>
          }
        />
      </Card>
      <Card>
        <CardStat
          label="Needs attention"
          value={data.atRisk + data.blocked + data.overdue}
          delta={
            data.atRisk + data.blocked + data.overdue > 0 ? (
              <Badge variant="destructive" size="sm">
                Review
              </Badge>
            ) : (
              <Badge variant="success" size="sm">
                Clear
              </Badge>
            )
          }
        />
      </Card>
      <Card>
        <CardStat
          label="Completed"
          value={data.completed}
          delta={
            <Badge variant="info" size="sm">
              All time
            </Badge>
          }
        />
      </Card>
    </div>
  );
}
