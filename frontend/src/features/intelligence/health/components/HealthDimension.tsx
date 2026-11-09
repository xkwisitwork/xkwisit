"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import type { HealthDimension } from "../../types";
import { healthScoreTone } from "../utils/clientHealthScore";

export function HealthDimensionCard({ dimension }: { dimension: HealthDimension }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-400">{dimension.label}</CardTitle>
        <StatusBadge tone={healthScoreTone(dimension.score)} size="sm">
          {dimension.score}
        </StatusBadge>
      </CardHeader>
      <CardContent>
        <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full bg-primary"
            style={{ width: `${Math.min(100, Math.max(0, dimension.score))}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export { HealthDimensionCard as HealthDimension };
