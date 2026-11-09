"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  PROPOSAL_TEMPLATES,
  ProposalTemplatePicker,
  useProposalTemplates,
} from "@/features/proposals";

export default function SalesProposalTemplatesPage() {
  const { data } = useProposalTemplates();
  const templates = data?.length ? data : PROPOSAL_TEMPLATES;

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Sales", href: "/sales" },
            { label: "Proposals", href: "/sales/proposals" },
            { label: "Templates" },
          ]}
        />
        <PageHeader
          title="Proposal templates"
          description="Reusable proposal starting points."
        />
      </div>
      <ProposalTemplatePicker templates={templates} />
    </div>
  );
}
