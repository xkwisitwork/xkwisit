"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { WorkflowList, useWorkflows } from "@/features/automation";

export default function AutomationWorkflowsPage() {
  const { data = [], isLoading } = useWorkflows();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Automation", href: "/automation" }, { label: "Workflows" }]}
        />
        <PageHeader title="Workflows" description="All automation workflows." />
      </div>
      <WorkflowList workflows={data} loading={isLoading} />
    </div>
  );
}
