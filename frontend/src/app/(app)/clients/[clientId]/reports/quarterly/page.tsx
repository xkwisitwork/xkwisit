"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReportHistoryTable, useReports } from "@/features/reporting";

export default function ClientQuarterlyReportsPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data = [], isLoading } = useReports({ clientId });
  const quarterly = data.filter((r) => r.period === "QUARTERLY");

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: "Client", href: `/clients/${clientId}` },
            { label: "Reports", href: `/clients/${clientId}/reports` },
            { label: "Quarterly" },
          ]}
        />
        <PageHeader title="Quarterly reports" description="Quarterly scorecards." />
      </div>
      <ReportHistoryTable reports={quarterly} loading={isLoading} />
    </div>
  );
}
