"use client";

import Link from "next/link";

import { PageHeader } from "@/components/layout/PageHeader";
import { CampaignEmptyState, CampaignList, useCampaigns } from "@/features/campaigns";

export default function PortalCampaignsPage() {
  const { data, isLoading } = useCampaigns({ pageSize: 50 });

  return (
    <div className="space-y-6">
      <PageHeader title="Campaigns" description="Campaigns running for your business." />

      <CampaignList
        items={data?.items ?? []}
        loading={isLoading}
        emptyState={<CampaignEmptyState hasFilters={false} />}
      />

      {!isLoading && (data?.items?.length ?? 0) > 0 ? (
        <p className="text-300 text-neutral-600">
          Open a campaign for performance detail.{" "}
          <Link href="/portal/campaigns" className="text-primary hover:underline">
            View all
          </Link>
        </p>
      ) : null}
    </div>
  );
}
