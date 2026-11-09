"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatNumber, formatPercent } from "@/lib/utils/format";

import type { FunnelStep } from "../types";

export function ConversionFunnelWidget({ steps }: { steps: FunnelStep[] }) {
  if (steps.length === 0) {
    return <p className="text-400 text-neutral-600">No funnel data.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion funnel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="flex items-center justify-between rounded-xl border border-neutral-400 px-4 py-3"
          >
            <div>
              <p className="text-400 font-medium">
                {index + 1}. {step.label}
              </p>
              {step.dropOffRate != null ? (
                <p className="text-200 text-neutral-600">
                  Drop-off {formatPercent(step.dropOffRate)}
                </p>
              ) : null}
            </div>
            <p className="text-500 font-medium tabular-nums">
              {formatNumber(step.count)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
