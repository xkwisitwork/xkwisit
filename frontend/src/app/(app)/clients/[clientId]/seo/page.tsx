"use client";

import Link from "next/link";
import { use } from "react";

import { PageHeader } from "@/components/layout/PageHeader";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils/cn";
import { buttonVariants } from "@/components/ui/Button/variants";
import { SeoDimensionBreakdown, SeoHealthScore, useSeoOverview } from "@/features/seo";

export default function ClientSeoPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data, isLoading } = useSeoOverview(clientId);
  const base = `/clients/${clientId}/seo`;

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: data?.clientName ?? "Client", href: `/clients/${clientId}` },
            { label: "SEO" },
          ]}
        />
        <PageHeader
          title="SEO"
          description={data?.domain ?? "Search visibility and health."}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {(
          [
            ["Overview", base],
            ["Technical", `${base}/technical`],
            ["Content", `${base}/content`],
            ["Rankings", `${base}/rankings`],
            ["Backlinks", `${base}/backlinks`],
            ["Local", `${base}/local`],
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

      {isLoading ? (
        <Skeleton variant="rectangle" className="h-40 w-full" />
      ) : (
        <>
          <SeoHealthScore overview={data} />
          <SeoDimensionBreakdown dimensions={data?.dimensions ?? []} />
        </>
      )}
    </div>
  );
}
