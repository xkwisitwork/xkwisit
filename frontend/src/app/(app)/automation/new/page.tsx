"use client";

import { useRouter } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { WorkflowBuilder } from "@/features/automation";

export default function AutomationNewPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Automation", href: "/automation" }, { label: "New" }]}
        />
        <PageHeader title="New workflow" description="Build a When → If → Then flow." />
      </div>
      <WorkflowBuilder onCreated={(id) => router.push(`/automation/${id}`)} />
    </div>
  );
}
