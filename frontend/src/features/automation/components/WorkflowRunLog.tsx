"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils/date";

import type { WorkflowRun, WorkflowRunStatus } from "../types";

function runTone(status: WorkflowRunStatus) {
  if (status === "SUCCEEDED") return "success" as const;
  if (status === "FAILED") return "destructive" as const;
  if (status === "RUNNING") return "info" as const;
  return "muted" as const;
}

export function WorkflowRunLog({
  runs,
  loading,
}: {
  runs: WorkflowRun[];
  loading?: boolean;
}) {
  if (loading) {
    return <Skeleton variant="rectangle" className="h-40 w-full" />;
  }

  if (runs.length === 0) {
    return <p className="text-400 text-neutral-600">No runs yet.</p>;
  }

  return (
    <ul className="divide-y divide-neutral-300 rounded-xl border border-neutral-400">
      {runs.map((run) => (
        <li key={run.id} className="space-y-2 px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-400 font-medium">{run.workflowName}</p>
            <StatusBadge tone={runTone(run.status)} size="sm">
              {run.status}
            </StatusBadge>
          </div>
          <p className="text-200 text-neutral-600">
            Started {formatDate(run.startedAt, "d MMM yyyy HH:mm")}
          </p>
          {run.log.length > 0 ? (
            <pre className="overflow-x-auto rounded-lg bg-neutral-200/50 p-3 text-200">
              {run.log.join("\n")}
            </pre>
          ) : null}
          {run.errorMessage ? (
            <p className="text-300 text-destructive">{run.errorMessage}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
