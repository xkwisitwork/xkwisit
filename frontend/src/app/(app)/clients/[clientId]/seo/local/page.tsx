"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { LocalSeoPanel, useLocalSeo } from "@/features/seo";

export default function ClientSeoLocalPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data, isLoading } = useLocalSeo(clientId);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: "Client", href: `/clients/${clientId}` },
            { label: "SEO", href: `/clients/${clientId}/seo` },
            { label: "Local" },
          ]}
        />
        <PageHeader title="Local SEO" description="Profile and NAP consistency." />
      </div>
      <LocalSeoPanel snapshot={data} loading={isLoading} />
    </div>
  );
}
