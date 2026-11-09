"use client";

import { useQuery } from "@tanstack/react-query";

import { PageHeader } from "@/components/layout/PageHeader";
import { CampaignCard, campaignKeys, listCampaignCalendar } from "@/features/campaigns";
import { Skeleton } from "@/components/ui/Skeleton";

export default function CampaignsCalendarPage() {
  const { data = [], isLoading } = useQuery({
    queryKey: campaignKeys.calendar(),
    queryFn: ({ signal }) => listCampaignCalendar({}, signal),
    staleTime: 30_000,
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Campaign calendar"
        description="Active and scheduled campaigns by date."
      />

      {isLoading ? (
        <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="rectangle" className="h-40 w-full" />
          ))}
        </div>
      ) : data.length === 0 ? (
        <p className="text-400 text-neutral-600">No scheduled campaigns.</p>
      ) : (
        <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
          {data.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
}
