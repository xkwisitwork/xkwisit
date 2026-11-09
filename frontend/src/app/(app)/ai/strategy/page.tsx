"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { AiStrategyPanel } from "@/features/ai";

export default function AiStrategyPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "AI", href: "/ai" }, { label: "Strategy" }]} />
        <PageHeader title="Strategy" description="Growth strategy drafts." />
      </div>
      <AiStrategyPanel />
    </div>
  );
}
