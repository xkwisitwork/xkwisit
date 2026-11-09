"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { KeywordTable, useKeywordRankings } from "@/features/seo";

export default function ClientSeoRankingsPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data = [], isLoading } = useKeywordRankings(clientId);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: "Client", href: `/clients/${clientId}` },
            { label: "SEO", href: `/clients/${clientId}/seo` },
            { label: "Rankings" },
          ]}
        />
        <PageHeader title="Rankings" description="Keyword positions over time." />
      </div>
      <KeywordTable rankings={data} loading={isLoading} />
    </div>
  );
}
