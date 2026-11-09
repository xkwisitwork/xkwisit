"use client";

import { Skeleton } from "@/components/ui/Skeleton";

import type { Report } from "../types";
import { orderSections } from "../utils/reportGenerator";
import { ExecutiveSummary } from "./ExecutiveSummary";
import { ReportSectionView } from "./ReportSection";

export function ReportPreview({
  report,
  loading,
}: {
  report?: Report | null;
  loading?: boolean;
}) {
  if (loading || !report) {
    return <Skeleton variant="rectangle" className="h-64 w-full" />;
  }

  const sections = orderSections(report.sections);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-600 font-medium">{report.title}</h2>
        <p className="text-300 text-neutral-600">
          {report.clientName ?? "Internal"} · {report.period}
        </p>
      </div>
      <ExecutiveSummary summary={report.executiveSummary} />
      {sections.map((section) => (
        <ReportSectionView key={section.id} section={section} />
      ))}
    </div>
  );
}
