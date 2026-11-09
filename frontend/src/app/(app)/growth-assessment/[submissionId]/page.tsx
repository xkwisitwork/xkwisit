"use client";

import { use } from "react";
import { useRouter } from "next/navigation";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  AssessmentWizard,
  DiagnosticReport,
  ReportDownloadButton,
  useDiagnosticReport,
} from "@/features/assessment";

export default function GrowthAssessmentSubmissionPage({
  params,
}: {
  params: Promise<{ submissionId: string }>;
}) {
  const { submissionId: token } = use(params);
  const router = useRouter();
  const report = useDiagnosticReport(token, false);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Growth assessment", href: "/growth-assessment/submissions" },
            { label: token },
          ]}
        />
        <PageHeader
          title="Assessment"
          description="Answer each section, then review the diagnostic."
        />
      </div>
      <AssessmentWizard
        token={token}
        onComplete={() => {
          void report.refetch();
          router.refresh();
        }}
      />
      {report.data ? (
        <>
          <ReportDownloadButton token={token} />
          <DiagnosticReport report={report.data} />
        </>
      ) : null}
    </div>
  );
}
