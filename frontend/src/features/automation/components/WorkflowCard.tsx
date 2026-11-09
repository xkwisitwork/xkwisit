"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils/date";

import type { WorkflowListItem, WorkflowStatus } from "../types";
import { triggerLabel } from "../engine/triggers";

function statusTone(status: WorkflowStatus) {
  if (status === "ACTIVE") return "success" as const;
  if (status === "PAUSED") return "warning" as const;
  if (status === "DRAFT") return "muted" as const;
  return "info" as const;
}

export function WorkflowCard({ workflow }: { workflow: WorkflowListItem }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-500">{workflow.name}</CardTitle>
          <p className="mt-1 text-200 text-neutral-600">
            {triggerLabel(workflow.triggerType)} · {workflow.runCount} runs
          </p>
        </div>
        <StatusBadge tone={statusTone(workflow.status)} size="sm">
          {workflow.status}
        </StatusBadge>
      </CardHeader>
      <CardContent className="text-200 text-neutral-600">
        Updated {formatDate(workflow.updatedAt, "d MMM yyyy")}
        {workflow.lastRunAt
          ? ` · Last run ${formatDate(workflow.lastRunAt, "d MMM yyyy")}`
          : ""}
      </CardContent>
    </Card>
  );
}
