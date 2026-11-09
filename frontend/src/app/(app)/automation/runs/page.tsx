"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { WorkflowRunLog, useWorkflowRuns } from "@/features/automation";

export default function AutomationRunsPage() {
  const { data = [], isLoading } = useWorkflowRuns();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Automation", href: "/automation" }, { label: "Runs" }]}
        />
        <PageHeader title="Runs" description="Recent workflow executions." />
      </div>
      <WorkflowRunLog runs={data} loading={isLoading} />
    </div>
  );
}
