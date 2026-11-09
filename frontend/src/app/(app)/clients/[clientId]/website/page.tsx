"use client";

import Link from "next/link";
import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { cn } from "@/lib/utils/cn";
import { buttonVariants } from "@/components/ui/Button/variants";
import { WebsiteOverviewPanel, useWebsiteOverview } from "@/features/website";

export default function ClientWebsitePage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data, isLoading } = useWebsiteOverview(clientId);
  const base = `/clients/${clientId}/website`;

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: data?.clientName ?? "Client", href: `/clients/${clientId}` },
            { label: "Website" },
          ]}
        />
        <PageHeader
          title="Website"
          description={data?.domain ?? "Traffic and conversion overview."}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["Overview", base],
            ["Pages", `${base}/pages`],
            ["Performance", `${base}/performance`],
            ["Experiments", `${base}/experiments`],
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
      <WebsiteOverviewPanel overview={data} loading={isLoading} />
    </div>
  );
}
