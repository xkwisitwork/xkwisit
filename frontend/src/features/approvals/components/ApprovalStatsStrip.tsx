"use client";

import { Badge } from "@/components/ui/Badge";
import { Card, CardStat } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

import { useApprovalStats } from "../hooks/useApprovals";

export function ApprovalStatsStrip() {
  const { data, isLoading } = useApprovalStats();

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
          label="Pending"
          value={data.pending}
          delta={
            <Badge variant="info" size="sm">
              {data.total} total
            </Badge>
          }
        />
      </Card>
      <Card>
        <CardStat
          label="Overdue"
          value={data.overdue}
          delta={
            data.overdue > 0 ? (
              <Badge variant="destructive" size="sm">
                Needs attention
              </Badge>
            ) : (
              <Badge variant="success" size="sm">
                On track
              </Badge>
            )
          }
        />
      </Card>
      <Card>
        <CardStat
          label="Approved"
          value={data.approved}
          delta={
            <Badge variant="success" size="sm">
              Cleared
            </Badge>
          }
        />
      </Card>
      <Card>
        <CardStat
          label="Changes requested"
          value={data.changesRequested}
          delta={
            <Badge variant="warning" size="sm">
              {data.rejected} rejected
            </Badge>
          }
        />
      </Card>
    </div>
  );
}
