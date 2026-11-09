"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { ExperimentRegistry, useExperimentRegistry } from "@/features/intelligence";

export default function IntelligenceExperimentsPage() {
  const { data = [], isLoading } = useExperimentRegistry();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Intelligence", href: "/intelligence" },
            { label: "Experiments" },
          ]}
        />
        <PageHeader
          title="Experiments"
          description="Hypothesis registry and decisions."
        />
      </div>
      <ExperimentRegistry experiments={data} loading={isLoading} />
    </div>
  );
}
