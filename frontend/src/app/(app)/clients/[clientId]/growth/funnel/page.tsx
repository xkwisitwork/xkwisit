"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { BottleneckTimeline, useBottlenecks } from "@/features/intelligence";

export default function ClientGrowthFunnelPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data = [], isLoading } = useBottlenecks(clientId);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: "Client", href: `/clients/${clientId}` },
            { label: "Growth", href: `/clients/${clientId}/growth` },
            { label: "Funnel" },
          ]}
        />
        <PageHeader
          title="Funnel"
          description="Stage friction across the growth funnel."
        />
      </div>
      {isLoading ? (
        <Skeleton variant="rectangle" className="h-40 w-full" />
      ) : (
        <BottleneckTimeline bottlenecks={data} />
      )}
    </div>
  );
}
