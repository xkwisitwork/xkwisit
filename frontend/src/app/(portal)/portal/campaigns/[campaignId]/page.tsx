"use client";

import { use } from "react";

import { Skeleton } from "@/components/ui/Skeleton";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  CampaignMetricsGrid,
  MarketingToMoneyMap,
  useCampaign,
  useCampaignMetrics,
} from "@/features/campaigns";
import { PageHeader } from "@/components/layout/PageHeader";

export default function PortalCampaignDetailPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = use(params);
  const { data: campaign, isLoading } = useCampaign(campaignId);
  const metricsQuery = useCampaignMetrics(campaignId);

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
            { label: "Campaigns", href: "/portal/campaigns" },
            { label: campaign.name },
          ]}
        />
        <PageHeader
          title={campaign.name}
          description="Performance overview for this campaign."
        />
      </div>

      <CampaignMetricsGrid
        metrics={metricsQuery.data}
        loading={metricsQuery.isLoading}
        currency={campaign.currency}
      />

      {metricsQuery.data ? (
        <MarketingToMoneyMap metrics={metricsQuery.data} currency={campaign.currency} />
      ) : null}
    </div>
  );
}
