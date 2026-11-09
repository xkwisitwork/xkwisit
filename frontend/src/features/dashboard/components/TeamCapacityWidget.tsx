"use client";

import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export function TeamCapacityWidget({
  utilization = 0,
  available = 0,
}: {
  utilization?: number;
  available?: number;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Team capacity</CardTitle>
        <CardDescription>Utilization across delivery seats</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-display text-700 font-bold tabular-nums text-neutral-900">
          {utilization}%
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full rounded-full bg-mint"
            style={{ width: `${Math.min(100, utilization)}%` }}
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="muted" size="sm">
            {available} seats free
          </Badge>
          <Badge variant={utilization > 85 ? "warning" : "success"} size="sm">
            {utilization > 85 ? "Tight" : "Healthy"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
