"use client";

import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/Button/variants";
import { cn } from "@/lib/utils/cn";
import { AnalyticsOverviewPanel, useAnalyticsOverview } from "@/features/analytics";

const links = [
  ["Overview", "/analytics"],
  ["Events", "/analytics/events"],
  ["UTM builder", "/analytics/utm-builder"],
  ["Data sources", "/analytics/data-sources"],
  ["Warehouse", "/analytics/warehouse"],
  ["Explorer", "/analytics/explorer"],
] as const;

export default function AnalyticsPage() {
  const { data, isLoading } = useAnalyticsOverview();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Analytics" }]} />
        <PageHeader title="Analytics" description="Traffic, events, and data sources." />
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
      <AnalyticsOverviewPanel overview={data} loading={isLoading} />
    </div>
  );
}
