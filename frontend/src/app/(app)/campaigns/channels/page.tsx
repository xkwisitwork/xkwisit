"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { ChannelBreakdown, useChannelBreakdown } from "@/features/campaigns";

export default function CampaignsChannelsPage() {
  const { data = [], isLoading } = useChannelBreakdown();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Channels"
        description="Spend and performance broken down by channel."
      />

      <ChannelBreakdown rows={data} loading={isLoading} />
    </div>
  );
}
