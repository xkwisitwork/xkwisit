"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import type { IntelExperiment } from "../../types";
import { formatConfidence, isSignificant } from "../utils/statisticalSignificance";

export function ExperimentResultPanel({ experiment }: { experiment: IntelExperiment }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-500">Result</CardTitle>
        <StatusBadge
          tone={isSignificant(experiment.confidence) ? "success" : "muted"}
          size="sm"
        >
          {formatConfidence(experiment.confidence)}
        </StatusBadge>
      </CardHeader>
      <CardContent>
        <p className="text-400">{experiment.resultSummary ?? "No result summary yet."}</p>
      </CardContent>
    </Card>
  );
}
