"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { AiSalesPanel } from "@/features/ai";

export default function AiSalesPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "AI", href: "/ai" }, { label: "Sales" }]} />
        <PageHeader title="Sales" description="Outreach and proposals." />
      </div>
      <AiSalesPanel />
    </div>
  );
}
