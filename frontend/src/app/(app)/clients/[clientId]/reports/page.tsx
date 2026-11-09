"use client";

import Link from "next/link";
import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/Button/variants";
import { cn } from "@/lib/utils/cn";
import { ReportHistoryTable, useReports } from "@/features/reporting";

export default function ClientReportsPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data = [], isLoading } = useReports({ clientId });
  const base = `/clients/${clientId}/reports`;

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: "Client", href: `/clients/${clientId}` },
            { label: "Reports" },
          ]}
        />
        <PageHeader title="Reports" description="Client report history." />
      </div>
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["All", base],
            ["Monthly", `${base}/monthly`],
            ["Quarterly", `${base}/quarterly`],
          ] as const
        ).map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={cn(buttonVariants({ variant: "outlined", size: "sm" }))}
          >
            {label}
          </Link>
        ))}
      </div>
      <ReportHistoryTable reports={data} loading={isLoading} />
    </div>
  );
}
