"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { UtmBuilder } from "@/features/analytics";

export default function AnalyticsUtmBuilderPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Analytics", href: "/analytics" }, { label: "UTM builder" }]}
        />
        <PageHeader title="UTM builder" description="Build campaign tracking URLs." />
      </div>
      <UtmBuilder />
    </div>
  );
}
