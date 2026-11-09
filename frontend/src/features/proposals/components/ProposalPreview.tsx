"use client";

import { Skeleton } from "@/components/ui/Skeleton";

import type { Proposal } from "../types";
import { DeliverablesSection } from "./DeliverablesSection";
import { MilestonesSection } from "./MilestonesSection";
import { PricingSection } from "./PricingSection";
import { ScopeSection } from "./ScopeSection";
import { TermsSection } from "./TermsSection";

export function ProposalPreview({
  proposal,
  loading,
}: {
  proposal?: Proposal | null;
  loading?: boolean;
}) {
  if (loading || !proposal) {
    return <Skeleton variant="rectangle" className="h-64 w-full" />;
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-600 font-medium">{proposal.title}</h2>
        <p className="text-300 text-neutral-600">{proposal.clientName}</p>
      </div>
      <ScopeSection scope={proposal.scope} />
      <DeliverablesSection items={proposal.deliverables} />
      <MilestonesSection milestones={proposal.milestones} currency={proposal.currency} />
      <PricingSection
        totalAmount={proposal.totalAmount}
        currency={proposal.currency}
        notes={proposal.pricingNotes}
      />
      <TermsSection terms={proposal.terms} />
    </div>
  );
}
