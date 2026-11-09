"use client";

import Link from "next/link";
import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardStat } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { buttonVariants } from "@/components/ui/Button/variants";
import { cn } from "@/lib/utils/cn";
import { formatNumber } from "@/lib/utils/format";
import { useGrowthOverview } from "@/features/intelligence";

export default function ClientGrowthPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data, isLoading } = useGrowthOverview(clientId);
  const base = `/clients/${clientId}/growth`;

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            {
              label: data?.clientName ?? "Client",
              href: `/clients/${clientId}`,
            },
            { label: "Growth" },
          ]}
        />
        <PageHeader title="Growth" description="Health, leaks, and bottlenecks." />
      </div>

      <div className="flex flex-wrap gap-2">
        {(
          [
            ["Overview", base],
            ["Health", `${base}/health`],
            ["Funnel", `${base}/funnel`],
            ["Bottlenecks", `${base}/bottlenecks`],
            ["Leaks", `${base}/leaks`],
            ["Graph", `${base}/graph`],
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

      {isLoading || !data ? (
        <Skeleton variant="rectangle" className="h-32 w-full" />
      ) : (
        <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
          <Card>
            <CardStat label="Health" value={String(data.healthScore)} />
          </Card>
          <Card>
            <CardStat label="Anomalies" value={formatNumber(data.openAnomalies)} />
          </Card>
          <Card>
            <CardStat label="Bottlenecks" value={formatNumber(data.openBottlenecks)} />
          </Card>
          <Card>
            <CardStat label="Leaks" value={formatNumber(data.openLeaks)} />
          </Card>
        </div>
      )}
    </div>
  );
}
