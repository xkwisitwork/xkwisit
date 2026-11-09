"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { AiReportingPanel } from "@/features/ai";

export default function AiReportingPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "AI", href: "/ai" }, { label: "Reporting" }]} />
        <PageHeader title="Reporting" description="Executive summaries." />
      </div>
      <AiReportingPanel />
    </div>
  );
}
