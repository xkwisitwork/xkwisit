"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  WorkflowRunLog,
  WorkflowTestPanel,
  useWorkflow,
  useWorkflowRuns,
} from "@/features/automation";

export default function AutomationWorkflowDetailPage({
  params,
}: {
  params: Promise<{ workflowId: string }>;
}) {
  const { workflowId } = use(params);
  const workflow = useWorkflow(workflowId);
  const runs = useWorkflowRuns(workflowId);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Automation", href: "/automation" },
            { label: "Workflows", href: "/automation/workflows" },
            { label: workflow.data?.name ?? "Workflow" },
          ]}
        />
        <PageHeader
          title={workflow.data?.name ?? "Workflow"}
          description={workflow.data?.description ?? "Workflow detail."}
        />
      </div>
      {workflow.isLoading ? (
        <Skeleton variant="rectangle" className="h-32 w-full" />
      ) : (
        <>
          <WorkflowTestPanel workflowId={workflowId} />
          <WorkflowRunLog runs={runs.data ?? []} loading={runs.isLoading} />
        </>
      )}
    </div>
  );
}
