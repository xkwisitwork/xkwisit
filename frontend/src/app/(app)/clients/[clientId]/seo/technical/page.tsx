"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  CoreWebVitals,
  TechnicalIssuesList,
  useCoreWebVitals,
  useTechnicalIssues,
} from "@/features/seo";

export default function ClientSeoTechnicalPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const issues = useTechnicalIssues(clientId);
  const vitals = useCoreWebVitals(clientId);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: "Client", href: `/clients/${clientId}` },
            { label: "SEO", href: `/clients/${clientId}/seo` },
            { label: "Technical" },
          ]}
        />
        <PageHeader title="Technical SEO" description="Issues and Core Web Vitals." />
      </div>
      <CoreWebVitals metrics={vitals.data ?? []} loading={vitals.isLoading} />
      <TechnicalIssuesList issues={issues.data ?? []} loading={issues.isLoading} />
    </div>
  );
}
