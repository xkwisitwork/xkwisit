"use client";

import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import type { ExperimentListItem } from "../types";

function statusTone(status: ExperimentListItem["status"]) {
  if (status === "RUNNING") return "success" as const;
  if (status === "COMPLETED") return "info" as const;
  if (status === "PAUSED") return "warning" as const;
  return "muted" as const;
}

export function ExperimentCard({ experiment }: { experiment: ExperimentListItem }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div>
          <CardTitle>{experiment.name}</CardTitle>
          <p className="mt-1 text-300 text-neutral-600">
            {experiment.type} · {experiment.primaryMetric}
          </p>
        </div>
        <StatusBadge tone={statusTone(experiment.status)} size="sm">
          {experiment.status}
        </StatusBadge>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {experiment.confidence != null ? (
          <Badge variant="info" size="sm">
            {(experiment.confidence * 100).toFixed(0)}% conf.
          </Badge>
        ) : null}
        <Badge variant="muted" size="sm">
          {experiment.clientName}
        </Badge>
      </CardContent>
    </Card>
  );
}
