"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import type { Bottleneck } from "../../types";
import { bottleneckSeverityTone } from "../utils/detectBottleneck";

export function BottleneckCard({ bottleneck }: { bottleneck: Bottleneck }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-500">{bottleneck.title}</CardTitle>
          <p className="mt-1 text-200 text-neutral-600">
            Stage: {bottleneck.stage}
            {bottleneck.clientName ? ` · ${bottleneck.clientName}` : ""}
          </p>
        </div>
        <StatusBadge tone={bottleneckSeverityTone(bottleneck.severity)} size="sm">
          {bottleneck.severity}
        </StatusBadge>
      </CardHeader>
      <CardContent>
        <p className="text-300 tabular-nums">Impact score {bottleneck.impactScore}</p>
      </CardContent>
    </Card>
  );
}
