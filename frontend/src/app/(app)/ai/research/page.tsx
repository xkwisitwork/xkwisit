"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { AiResearchPanel } from "@/features/ai";

export default function AiResearchPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "AI", href: "/ai" }, { label: "Research" }]} />
        <PageHeader title="Research" description="Market research drafts." />
      </div>
      <AiResearchPanel />
    </div>
  );
}
