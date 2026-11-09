"use client";

import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatPercent } from "@/lib/utils/format";

import type { Experiment } from "../types";
import { findControl, liftVsControl } from "../utils/experimentStats";
import { VariantComparison } from "./VariantComparison";

export function ExperimentResult({ experiment }: { experiment: Experiment }) {
  const control = findControl(experiment.variants);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{experiment.name}</CardTitle>
          <Badge variant="muted" size="sm">
            {experiment.status}
          </Badge>
        </CardHeader>
        <CardContent className="space-y-2 text-400">
          {experiment.hypothesis ? <p>{experiment.hypothesis}</p> : null}
          {experiment.confidence != null ? (
            <p className="text-neutral-600">
              Confidence {formatPercent(experiment.confidence * 100)}
            </p>
          ) : null}
          {experiment.winnerVariantId && control ? (
            <p className="text-neutral-600">
              Winner selected
              {(() => {
                const winner = experiment.variants.find(
                  (v) => v.id === experiment.winnerVariantId,
                );
                const lift = winner ? liftVsControl(winner, control) : null;
                return lift != null ? ` · lift ${lift.toFixed(1)}%` : "";
              })()}
            </p>
          ) : null}
        </CardContent>
      </Card>
      <VariantComparison variants={experiment.variants} />
    </div>
  );
}
