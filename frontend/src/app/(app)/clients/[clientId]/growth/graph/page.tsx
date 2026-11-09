"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { HealthScoreGrid, useClientHealth } from "@/features/intelligence";

export default function ClientGrowthGraphPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data, isLoading } = useClientHealth(clientId);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: "Client", href: `/clients/${clientId}` },
            { label: "Growth", href: `/clients/${clientId}/growth` },
            { label: "Graph" },
          ]}
        />
        <PageHeader title="Growth graph" description="Dimension map for this client." />
      </div>
      <HealthScoreGrid snapshot={data} loading={isLoading} />
    </div>
  );
}
