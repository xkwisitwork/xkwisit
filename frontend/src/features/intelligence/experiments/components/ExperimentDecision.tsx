"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import type { IntelExperiment } from "../../types";

export function ExperimentDecision({ experiment }: { experiment: IntelExperiment }) {
  const decision = experiment.decision;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-500">Decision</CardTitle>
        {decision ? (
          <StatusBadge
            tone={
              decision === "SHIP"
                ? "success"
                : decision === "KILL"
                  ? "destructive"
                  : "warning"
            }
            size="sm"
          >
            {decision}
          </StatusBadge>
        ) : (
          <StatusBadge tone="muted" size="sm">
            Pending
          </StatusBadge>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-300 text-neutral-600">
          {decision
            ? `Recorded decision for ${experiment.name}.`
            : "No decision recorded yet."}
        </p>
      </CardContent>
    </Card>
  );
}
