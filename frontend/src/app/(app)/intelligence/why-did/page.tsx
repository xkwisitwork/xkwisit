"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { WhyDidPanel } from "@/features/intelligence";

export default function IntelligenceWhyDidPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Intelligence", href: "/intelligence" }, { label: "Why did" }]}
        />
        <PageHeader
          title="Why did this change?"
          description="Attribute metric movement."
        />
      </div>
      <WhyDidPanel />
    </div>
  );
}
