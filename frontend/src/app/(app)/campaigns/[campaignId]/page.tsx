"use client";

import { use } from "react";

import { Skeleton } from "@/components/ui/Skeleton";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CampaignWorkspace, useCampaign } from "@/features/campaigns";

export default function CampaignDetailPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = use(params);
  const { data: campaign, isLoading } = useCampaign(campaignId);

  if (isLoading || !campaign) {
    return (
      <div className="space-y-6">
        <Skeleton variant="text" className="h-8 w-64" />
        <Skeleton variant="rectangle" className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[{ label: "Campaigns", href: "/campaigns" }, { label: campaign.name }]}
      />
      <CampaignWorkspace campaign={campaign} />
    </div>
  );
}
