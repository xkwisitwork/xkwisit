"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  CapacityBoard,
  UtilizationWidget,
  WorkloadChart,
  useCapacity,
  useUtilization,
} from "@/features/team";

export default function TeamCapacityPage() {
  const capacity = useCapacity();
  const utilization = useUtilization();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Team", href: "/team" }, { label: "Capacity" }]} />
        <PageHeader title="Capacity" description="Allocation and utilization." />
      </div>
      <UtilizationWidget snapshot={utilization.data} loading={utilization.isLoading} />
      <WorkloadChart rows={capacity.data ?? []} loading={capacity.isLoading} />
      <CapacityBoard rows={capacity.data ?? []} loading={capacity.isLoading} />
    </div>
  );
}
