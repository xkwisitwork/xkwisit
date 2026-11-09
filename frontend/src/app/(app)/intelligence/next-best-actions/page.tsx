"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { NextBestActions, useRecommendations } from "@/features/intelligence";

export default function IntelligenceNextBestActionsPage() {
  const { data = [], isLoading } = useRecommendations();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Intelligence", href: "/intelligence" },
            { label: "Next best actions" },
          ]}
        />
        <PageHeader
          title="Next best actions"
          description="Prioritized recommendations."
        />
      </div>
      <NextBestActions actions={data} loading={isLoading} />
    </div>
  );
}
