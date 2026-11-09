"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataExplorer } from "@/features/analytics";

export default function AnalyticsExplorerPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Analytics", href: "/analytics" }, { label: "Explorer" }]}
        />
        <PageHeader title="Explorer" description="Ad-hoc metric queries." />
      </div>
      <DataExplorer />
    </div>
  );
}
