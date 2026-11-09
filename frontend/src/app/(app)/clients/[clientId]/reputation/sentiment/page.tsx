"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  ComplaintThemes,
  PositiveThemes,
  RatingTrend,
  SentimentChart,
  useSentimentSnapshot,
} from "@/features/reputation";

export default function ClientReputationSentimentPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data, isLoading } = useSentimentSnapshot(clientId);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            { label: "Client", href: `/clients/${clientId}` },
            { label: "Reputation", href: `/clients/${clientId}/reputation` },
            { label: "Sentiment" },
          ]}
        />
        <PageHeader
          title="Sentiment"
          description={data?.periodLabel ?? "Themes and rating trend."}
        />
      </div>

      {isLoading || !data ? (
        <Skeleton variant="rectangle" className="h-40 w-full" />
      ) : (
        <>
          <SentimentChart split={data.split} />
          <RatingTrend points={data.ratingTrend} />
          <div className="grid gap-4 laptop:grid-cols-2">
            <PositiveThemes themes={data.positiveThemes} />
            <ComplaintThemes themes={data.complaintThemes} />
          </div>
        </>
      )}
    </div>
  );
}
