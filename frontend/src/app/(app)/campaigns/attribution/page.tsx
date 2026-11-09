"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import {
  AttributionTable,
  MultiTouchJourney,
  useAttribution,
} from "@/features/campaigns";

export default function CampaignsAttributionPage() {
  const { data = [], isLoading } = useAttribution();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attribution"
        description="First and last touch across campaign-sourced leads."
      />

      <MultiTouchJourney rows={data} />
      <AttributionTable rows={data} loading={isLoading} />
    </div>
  );
}
