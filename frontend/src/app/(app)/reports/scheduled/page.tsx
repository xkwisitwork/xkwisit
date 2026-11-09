"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReportScheduler, useScheduledReports } from "@/features/reporting";

export default function ScheduledReportsPage() {
  const { data = [], isLoading } = useScheduledReports();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Reports", href: "/reports" }, { label: "Scheduled" }]}
        />
        <PageHeader title="Scheduled" description="Recurring report deliveries." />
      </div>
      <ReportScheduler schedules={data} loading={isLoading} />
    </div>
  );
}
