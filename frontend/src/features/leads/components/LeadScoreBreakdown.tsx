"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Skeleton } from "@/components/ui/Skeleton";
import { useLeadScore } from "../hooks/useLead";

import { scoreBand } from "../utils/leadScoring";

export function LeadScoreBreakdown({ leadId }: { leadId: string }) {
  const { data, isLoading } = useLeadScore(leadId);

  if (isLoading || !data) {
    return (
      <Card>
        <CardHeader>
          <Skeleton variant="text" className="w-32" />
          <Skeleton variant="text" className="w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="text" />
          ))}
        </CardContent>
      </Card>
    );
  }

  const band = scoreBand(data.total);

  const toneMap: Record<
    typeof band.tone,
    "success" | "primary" | "warning" | "destructive"
  > = {
    success: "success",
    info: "primary",
    warning: "warning",
    destructive: "destructive",
  };

  const dimensions = [
    { key: "budgetFit", label: "Budget fit", value: data.dimensions.budgetFit },
    { key: "serviceFit", label: "Service fit", value: data.dimensions.serviceFit },
    { key: "engagement", label: "Engagement", value: data.dimensions.engagement },
    { key: "urgency", label: "Urgency", value: data.dimensions.urgency },
    { key: "authority", label: "Authority", value: data.dimensions.authority },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>Lead score</CardTitle>
            <CardDescription>
              Calculated from budget, fit, engagement, urgency, and authority.
            </CardDescription>
          </div>

          <div className="shrink-0 text-right">
            <p className="font-display text-800 leading-none text-primary">
              {Math.round(data.total)}
            </p>
            <p className="mt-1 text-200 font-semibold uppercase tracking-wide text-neutral-600">
              {band.label}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {dimensions.map((dimension) => (
          <Progress
            key={dimension.key}
            value={dimension.value}
            label={dimension.label}
            showValue
            tone={toneMap[band.tone]}
            size="sm"
          />
        ))}
      </CardContent>
    </Card>
  );
}
