"use client";

import { use } from "react";

import { Skeleton } from "@/components/ui/Skeleton";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { CreativeGrid, useCampaign } from "@/features/campaigns";

export default function CampaignCreativesPage({
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
        <Skeleton variant="rectangle" className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Campaigns", href: "/campaigns" },
            { label: campaign.name, href: `/campaigns/${campaign.id}` },
            { label: "Creatives" },
          ]}
        />
        <PageHeader title="Creatives" description={`Assets for ${campaign.name}.`} />
      </div>

      <CreativeGrid />
    </div>
  );
}
