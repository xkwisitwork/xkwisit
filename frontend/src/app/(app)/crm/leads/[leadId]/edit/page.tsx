"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/Skeleton";

import { LeadForm, useLead } from "@/features/leads";

export default function EditLeadPage({
  params,
}: {
  params: Promise<{ leadId: string }>;
}) {
  const { leadId } = use(params);
  const { data: lead, isLoading } = useLead(leadId);

  if (isLoading || !lead) {
    return (
      <div className="space-y-6">
        <Skeleton variant="text" className="h-6 w-64" />
        <Skeleton variant="rectangle" className="h-[600px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "CRM", href: "/crm" },
            { label: "Leads", href: "/crm/leads" },
            { label: lead.fullName, href: `/crm/leads/${lead.id}` },
            { label: "Edit" },
          ]}
        />

        <PageHeader
          title={`Edit ${lead.fullName}`}
          description="Update contact details, qualification, or notes."
        />
      </div>

      <LeadForm mode="edit" lead={lead} cancelHref={`/crm/leads/${lead.id}`} />
    </div>
  );
}
