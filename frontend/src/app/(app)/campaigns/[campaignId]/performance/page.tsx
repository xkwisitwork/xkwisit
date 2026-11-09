"use client";

import { use } from "react";

import { Skeleton } from "@/components/ui/Skeleton";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  CampaignMetricsGrid,
  MarketingToMoneyMap,
  useCampaign,
  useCampaignMetrics,
} from "@/features/campaigns";

export default function CampaignPerformancePage({
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
            { label: "Campaigns", href: "/campaigns" },
            { label: campaign.name, href: `/campaigns/${campaign.id}` },
            { label: "Performance" },
          ]}
        />
        <PageHeader
          title="Performance"
          description={`${campaign.name} · ${campaign.clientName}`}
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
