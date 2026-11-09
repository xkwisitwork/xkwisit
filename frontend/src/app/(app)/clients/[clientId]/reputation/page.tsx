"use client";

import Link from "next/link";
import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardStat } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { buttonVariants } from "@/components/ui/Button/variants";
import { cn } from "@/lib/utils/cn";
import { formatNumber, formatPercent } from "@/lib/utils/format";
import {
  RatingTrend,
  SentimentChart,
  formatRating,
  useReputationOverview,
} from "@/features/reputation";

export default function ClientReputationPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = use(params);
  const { data, isLoading } = useReputationOverview(clientId);
  const base = `/clients/${clientId}/reputation`;

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Clients", href: "/clients" },
            {
              label: data?.clientName ?? "Client",
              href: `/clients/${clientId}`,
            },
            { label: "Reputation" },
          ]}
        />
        <PageHeader
          title="Reputation"
          description="Reviews, sentiment, and response health."
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {(
          [
            ["Overview", base],
            ["Reviews", `${base}/reviews`],
            ["Sentiment", `${base}/sentiment`],
            ["Responses", `${base}/responses`],
          ] as const
        ).map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={cn(buttonVariants({ variant: "outlined", size: "sm" }))}
          >
            {label}
          </Link>
        ))}
      </div>

      {isLoading || !data ? (
        <Skeleton variant="rectangle" className="h-40 w-full" />
      ) : (
        <>
          <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
            <Card>
              <CardStat label="Average rating" value={formatRating(data.averageRating)} />
            </Card>
            <Card>
              <CardStat label="Reviews" value={formatNumber(data.reviewCount)} />
            </Card>
            <Card>
              <CardStat label="Response rate" value={formatPercent(data.responseRate)} />
            </Card>
            <Card>
              <CardStat label="Pending" value={formatNumber(data.pendingResponses)} />
            </Card>
          </div>
          <div className="grid gap-4 laptop:grid-cols-2">
            <SentimentChart split={data.sentimentSplit} />
            <RatingTrend points={data.ratingTrend} />
          </div>
        </>
      )}
    </div>
  );
}
