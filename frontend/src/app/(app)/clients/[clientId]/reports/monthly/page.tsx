"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReportHistoryTable, useReports } from "@/features/reporting";

export default function ClientMonthlyReportsPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data = [], isLoading } = useReports({ clientId });
  const monthly = data.filter((r) => r.period === "MONTHLY");

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: "Client", href: `/clients/${clientId}` },
            { label: "Reports", href: `/clients/${clientId}/reports` },
            { label: "Monthly" },
          ]}
        />
        <PageHeader title="Monthly reports" description="Month-end packs." />
      </div>
      <ReportHistoryTable reports={monthly} loading={isLoading} />
    </div>
  );
}
