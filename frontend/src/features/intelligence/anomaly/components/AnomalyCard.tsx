"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils/date";

import type { AnomalyListItem } from "../../types";
import { anomalySeverityTone, formatDeltaPercent } from "../utils/detectAnomaly";

export function AnomalyCard({ anomaly }: { anomaly: AnomalyListItem }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-500">{anomaly.title}</CardTitle>
          <p className="mt-1 text-200 text-neutral-600">
            {anomaly.metric}
            {anomaly.clientName ? ` · ${anomaly.clientName}` : ""}
          </p>
        </div>
        <StatusBadge tone={anomalySeverityTone(anomaly.severity)} size="sm">
          {anomaly.severity}
        </StatusBadge>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-3 text-300">
        <span className="font-medium tabular-nums">
          {formatDeltaPercent(anomaly.deltaPercent)}
        </span>
        <span className="text-neutral-600">
          {formatDate(anomaly.detectedAt, "d MMM yyyy")}
        </span>
        <StatusBadge tone="muted" size="sm">
          {anomaly.status}
        </StatusBadge>
      </CardContent>
    </Card>
  );
}
