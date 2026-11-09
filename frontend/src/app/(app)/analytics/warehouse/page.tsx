"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { WarehouseSyncStatus, useWarehouseStatus } from "@/features/analytics";

export default function AnalyticsWarehousePage() {
  const { data, isLoading } = useWarehouseStatus();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Analytics", href: "/analytics" }, { label: "Warehouse" }]}
        />
        <PageHeader
          title="Warehouse"
          description="Sync status for analytics warehouse."
        />
      </div>
      <WarehouseSyncStatus status={data} loading={isLoading} />
    </div>
  );
}
