"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  REPORT_TEMPLATES,
  ReportTemplateList,
  useReportTemplates,
} from "@/features/reporting";

export default function ReportTemplatesPage() {
  const { data, isLoading } = useReportTemplates();
  const templates = data?.length ? data : REPORT_TEMPLATES;

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Reports", href: "/reports" }, { label: "Templates" }]}
        />
        <PageHeader title="Templates" description="Reusable report layouts." />
      </div>
      <ReportTemplateList templates={templates} loading={isLoading} />
    </div>
  );
}
