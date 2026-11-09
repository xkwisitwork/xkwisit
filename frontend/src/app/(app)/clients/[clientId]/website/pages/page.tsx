"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { PagePerformanceTable, useWebsitePages } from "@/features/website";

export default function ClientWebsitePagesPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data = [], isLoading } = useWebsitePages(clientId);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: "Client", href: `/clients/${clientId}` },
            { label: "Website", href: `/clients/${clientId}/website` },
            { label: "Pages" },
          ]}
        />
        <PageHeader title="Pages" description="Performance by URL." />
      </div>
      <PagePerformanceTable pages={data} loading={isLoading} />
    </div>
  );
}
