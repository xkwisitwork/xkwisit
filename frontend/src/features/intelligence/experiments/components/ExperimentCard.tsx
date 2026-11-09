"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import type { IntelExperimentListItem } from "../../types";
import { formatConfidence } from "../utils/statisticalSignificance";

function statusTone(status: IntelExperimentListItem["status"]) {
  if (status === "RUNNING") return "success" as const;
  if (status === "DECIDED") return "info" as const;
  if (status === "HYPOTHESIS") return "warning" as const;
  return "muted" as const;
}

export function IntelExperimentCard({
  experiment,
}: {
  experiment: IntelExperimentListItem;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-500">{experiment.name}</CardTitle>
          <p className="mt-1 text-200 text-neutral-600">
            {experiment.primaryMetric}
            {experiment.clientName ? ` · ${experiment.clientName}` : ""}
          </p>
        </div>
        <StatusBadge tone={statusTone(experiment.status)} size="sm">
          {experiment.status}
        </StatusBadge>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2 text-300">
        {experiment.decision ? <span>{experiment.decision}</span> : null}
        <span className="text-neutral-600">
          Conf. {formatConfidence(experiment.confidence)}
        </span>
      </CardContent>
    </Card>
  );
}

export { IntelExperimentCard as ExperimentCard };
