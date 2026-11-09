"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { AiContentPanel } from "@/features/ai";

export default function AiContentPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "AI", href: "/ai" }, { label: "Content" }]} />
        <PageHeader title="Content" description="Briefs and copy drafts." />
      </div>
      <AiContentPanel />
    </div>
  );
}
