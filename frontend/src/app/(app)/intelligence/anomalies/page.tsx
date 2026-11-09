"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnomalyFeed, useAnomalies } from "@/features/intelligence";

export default function IntelligenceAnomaliesPage() {
  const { data = [], isLoading } = useAnomalies();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Intelligence", href: "/intelligence" },
            { label: "Anomalies" },
          ]}
        />
        <PageHeader title="Anomalies" description="Metric spikes and drops." />
      </div>
      <AnomalyFeed anomalies={data} loading={isLoading} />
    </div>
  );
}
