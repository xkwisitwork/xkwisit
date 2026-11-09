"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  ProposalEditor,
  ProposalPreview,
  ProposalSendDialog,
  useProposal,
} from "@/features/proposals";
import { Skeleton } from "@/components/ui/Skeleton";

export default function SalesProposalDetailPage({
  params,
}: {
  params: Promise<{ proposalId: string }>;
}) {
  const { proposalId } = use(params);
  const { data, isLoading } = useProposal(proposalId);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Sales", href: "/sales" },
            { label: "Proposals", href: "/sales/proposals" },
            { label: data?.title ?? "Proposal" },
          ]}
        />
        <PageHeader
          title={data?.title ?? "Proposal"}
          description={data?.clientName ?? "Proposal detail"}
        />
      </div>
      {isLoading || !data ? (
        <Skeleton variant="rectangle" className="h-40 w-full" />
      ) : (
        <>
          <ProposalEditor proposal={data} />
          <ProposalPreview proposal={data} />
          <ProposalSendDialog proposalId={proposalId} />
        </>
      )}
    </div>
  );
}
