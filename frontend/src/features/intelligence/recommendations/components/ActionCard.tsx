"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import type { RecommendedAction } from "../../types";
import { ActionPriorityBadge } from "./ActionPriorityBadge";
import { ActionReason } from "./ActionReason";

export function ActionCard({ action }: { action: RecommendedAction }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-500">{action.title}</CardTitle>
          {action.clientName ? (
            <p className="mt-1 text-200 text-neutral-600">{action.clientName}</p>
          ) : null}
        </div>
        <ActionPriorityBadge priority={action.priority} />
      </CardHeader>
      <CardContent className="space-y-2">
        <ActionReason reason={action.reason} />
        {action.estimatedImpact ? (
          <p className="text-200 text-neutral-600">Impact: {action.estimatedImpact}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}
