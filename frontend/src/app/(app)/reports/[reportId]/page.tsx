"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReportDispatchDialog, ReportPreview, useReport } from "@/features/reporting";

export default function ReportDetailPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = use(params);
  const { data, isLoading } = useReport(reportId);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Reports", href: "/reports" },
            { label: data?.title ?? "Report" },
          ]}
        />
        <PageHeader
          title={data?.title ?? "Report"}
          description={data?.clientName ?? "Report detail"}
        />
      </div>
      <ReportPreview report={data} loading={isLoading} />
      <ReportDispatchDialog reportId={reportId} />
    </div>
  );
}
