"use client";

import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/Button/variants";
import { cn } from "@/lib/utils/cn";
import { WorkflowList, useWorkflows } from "@/features/automation";

const links = [
  ["Overview", "/automation"],
  ["Workflows", "/automation/workflows"],
  ["Runs", "/automation/runs"],
  ["Triggers", "/automation/triggers"],
  ["New", "/automation/new"],
] as const;

export default function AutomationPage() {
  const { data = [], isLoading } = useWorkflows();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Automation" }]} />
        <PageHeader title="Automation" description="Workflows, triggers, and runs." />
      </div>
      <div className="flex flex-wrap gap-2">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={cn(buttonVariants({ variant: "outlined", size: "sm" }))}
          >
            {label}
          </Link>
        ))}
      </div>
      <WorkflowList workflows={data.slice(0, 6)} loading={isLoading} />
    </div>
  );
}
