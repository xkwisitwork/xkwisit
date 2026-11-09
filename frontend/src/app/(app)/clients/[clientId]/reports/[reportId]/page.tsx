"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReportDispatchDialog, ReportPreview, useReport } from "@/features/reporting";

export default function ClientReportDetailPage({
  params,
}: {
  params: Promise<{ clientId: string; reportId: string }>;
}) {
  const { clientId, reportId } = use(params);
  const { data, isLoading } = useReport(reportId);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: "Client", href: `/clients/${clientId}` },
            { label: "Reports", href: `/clients/${clientId}/reports` },
            { label: data?.title ?? "Report" },
          ]}
        />
        <PageHeader title={data?.title ?? "Report"} description="Client report detail." />
      </div>
      <ReportPreview report={data} loading={isLoading} />
      <ReportDispatchDialog reportId={reportId} />
    </div>
  );
}
