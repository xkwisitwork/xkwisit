"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils/date";
import { formatNumber } from "@/lib/utils/format";

import type { WarehouseStatus } from "../types";

export function WarehouseSyncStatus({
  status,
  loading,
}: {
  status?: WarehouseStatus | null;
  loading?: boolean;
}) {
  if (loading || !status) {
    return <Skeleton variant="rectangle" className="h-32 w-full" />;
  }

  const tone =
    status.state === "SUCCESS"
      ? ("success" as const)
      : status.state === "FAILED"
        ? ("destructive" as const)
        : status.state === "RUNNING"
          ? ("info" as const)
          : ("muted" as const);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Warehouse sync</CardTitle>
        <StatusBadge tone={tone}>{status.state}</StatusBadge>
      </CardHeader>
      <CardContent className="space-y-2 text-300">
        <p>
          Rows:{" "}
          <span className="font-medium tabular-nums">
            {status.rowCount != null ? formatNumber(status.rowCount) : "-"}
          </span>
        </p>
        <p className="text-neutral-600">
          {status.lastSyncAt
            ? `Last sync ${formatDate(status.lastSyncAt, "d MMM yyyy HH:mm")}`
            : "No sync yet"}
        </p>
        {status.errorMessage ? (
          <p className="text-destructive">{status.errorMessage}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
