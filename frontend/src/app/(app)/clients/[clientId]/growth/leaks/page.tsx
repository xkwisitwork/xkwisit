"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  LeakStageComparison,
  RevenueLeakDetector,
  useRevenueLeak,
} from "@/features/intelligence";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ClientGrowthLeaksPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data = [], isLoading } = useRevenueLeak(clientId);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: "Client", href: `/clients/${clientId}` },
            { label: "Growth", href: `/clients/${clientId}/growth` },
            { label: "Leaks" },
          ]}
        />
        <PageHeader
          title="Revenue leaks"
          description="Estimated monthly loss by stage."
        />
      </div>
      {isLoading ? (
        <Skeleton variant="rectangle" className="h-40 w-full" />
      ) : (
        <>
          <LeakStageComparison leaks={data} />
          <RevenueLeakDetector leaks={data} />
        </>
      )}
    </div>
  );
}
