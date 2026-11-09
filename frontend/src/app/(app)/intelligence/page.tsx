"use client";

import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonVariants } from "@/components/ui/Button/variants";
import { cn } from "@/lib/utils/cn";
import { AnomalyFeed, useAnomalies } from "@/features/intelligence";

const links = [
  ["Overview", "/intelligence"],
  ["Anomalies", "/intelligence/anomalies"],
  ["Bottlenecks", "/intelligence/bottlenecks"],
  ["Next best actions", "/intelligence/next-best-actions"],
  ["Why did", "/intelligence/why-did"],
  ["Experiments", "/intelligence/experiments"],
  ["Autopilot", "/intelligence/autopilot"],
] as const;

export default function IntelligencePage() {
  const { data = [], isLoading } = useAnomalies();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Intelligence" }]} />
        <PageHeader
          title="Intelligence"
          description="Anomalies, bottlenecks, and recommended actions."
        />
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
      <AnomalyFeed anomalies={data.slice(0, 5)} loading={isLoading} />
    </div>
  );
}
