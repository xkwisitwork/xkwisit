"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils/date";

import type { Anomaly } from "../../types";
import { anomalySeverityTone, formatDeltaPercent } from "../utils/detectAnomaly";

export function AnomalyDetail({
  anomaly,
  loading,
}: {
  anomaly?: Anomaly | null;
  loading?: boolean;
}) {
  if (loading || !anomaly) {
    return <Skeleton variant="rectangle" className="h-48 w-full" />;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle>{anomaly.title}</CardTitle>
          <p className="mt-1 text-300 text-neutral-600">
            {anomaly.metric}
            {anomaly.clientName ? ` · ${anomaly.clientName}` : ""}
          </p>
        </div>
        <StatusBadge tone={anomalySeverityTone(anomaly.severity)}>
          {anomaly.severity}
        </StatusBadge>
      </CardHeader>
      <CardContent className="space-y-3 text-300">
        <p className="font-medium tabular-nums">
          {formatDeltaPercent(anomaly.deltaPercent)}
        </p>
        {anomaly.summary ? <p>{anomaly.summary}</p> : null}
        <p className="text-neutral-600">
          Detected {formatDate(anomaly.detectedAt, "d MMM yyyy HH:mm")} · {anomaly.status}
        </p>
      </CardContent>
    </Card>
  );
}
