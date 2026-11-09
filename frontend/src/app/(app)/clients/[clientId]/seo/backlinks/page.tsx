"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { BacklinkTable, useBacklinks } from "@/features/seo";

export default function ClientSeoBacklinksPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data = [], isLoading } = useBacklinks(clientId);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: "Client", href: `/clients/${clientId}` },
            { label: "SEO", href: `/clients/${clientId}/seo` },
            { label: "Backlinks" },
          ]}
        />
        <PageHeader title="Backlinks" description="Referring domains and anchors." />
      </div>
      <BacklinkTable backlinks={data} loading={isLoading} />
    </div>
  );
}
