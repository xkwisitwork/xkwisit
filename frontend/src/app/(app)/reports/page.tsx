"use client";

import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/Button/variants";
import { cn } from "@/lib/utils/cn";
import { ReportBuilder, ReportHistoryTable, useReports } from "@/features/reporting";

const links = [
  ["Overview", "/reports"],
  ["Templates", "/reports/templates"],
  ["Scheduled", "/reports/scheduled"],
] as const;

export default function ReportsPage() {
  const { data = [], isLoading } = useReports();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Reports" }]} />
        <PageHeader title="Reports" description="Client and internal reports." />
      </div>
      <div className="flex flex-wrap gap-2">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={cn(buttonVariants({ variant: "outlined", size: "sm" }))}
          >
            {label}
          </Link>
        ))}
      </div>
      <ReportBuilder />
      <ReportHistoryTable reports={data} loading={isLoading} />
    </div>
  );
}
