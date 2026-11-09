"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  BottleneckCard,
  BottleneckTimeline,
  useBottlenecks,
} from "@/features/intelligence";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ClientGrowthBottlenecksPage({
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
            { label: "Bottlenecks" },
          ]}
        />
        <PageHeader
          title="Bottlenecks"
          description="Client-specific growth constraints."
        />
      </div>
      {isLoading ? (
        <Skeleton variant="rectangle" className="h-40 w-full" />
      ) : (
        <>
          <BottleneckTimeline bottlenecks={data} />
          <div className="grid gap-4 tablet:grid-cols-2">
            {data.map((item) => (
              <BottleneckCard key={item.id} bottleneck={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
