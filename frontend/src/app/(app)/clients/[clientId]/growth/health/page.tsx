"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  HealthScoreGrid,
  HealthTrend,
  useClientHealth,
  useHealthTrend,
} from "@/features/intelligence";

export default function ClientGrowthHealthPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const health = useClientHealth(clientId);
  const trend = useHealthTrend(clientId);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: "Client", href: `/clients/${clientId}` },
            { label: "Growth", href: `/clients/${clientId}/growth` },
            { label: "Health" },
          ]}
        />
        <PageHeader title="Health" description="Dimension scores over time." />
      </div>
      <HealthScoreGrid snapshot={health.data} loading={health.isLoading} />
      <HealthTrend points={trend.data ?? []} loading={trend.isLoading} />
    </div>
  );
}
