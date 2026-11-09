"use client";

import Link from "next/link";
import { Pause, Play } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";
import { cn } from "@/lib/utils/cn";
import { buttonVariants } from "@/components/ui/Button/variants";

import { usePauseCampaign, useResumeCampaign } from "../hooks/useCampaigns";
import { useCampaignMetrics } from "../hooks/useCampaignMetrics";
import { useAttribution, useChannelBreakdown } from "../hooks/useAttribution";
import type { Campaign } from "../types";
import {
  campaignObjectiveLabel,
  campaignStatusLabel,
  campaignStatusTone,
} from "../utils/metricsCalculator";
import { AttributionTable } from "./AttributionTable";
import { AudiencePanel } from "./AudiencePanel";
import { CampaignChannelBadge } from "./CampaignChannelBadge";
import { CampaignMetricsGrid } from "./CampaignMetricsGrid";
import { ChannelBreakdown } from "./ChannelBreakdown";
import { CreativeGrid } from "./CreativeGrid";
import { MarketingToMoneyMap } from "./MarketingToMoneyMap";
import { MultiTouchJourney } from "./MultiTouchJourney";

export type CampaignWorkspaceProps = {
  campaign: Campaign;
};

export function CampaignWorkspace({ campaign }: CampaignWorkspaceProps) {
  const metricsQuery = useCampaignMetrics(campaign.id);
  const channelsQuery = useChannelBreakdown({ clientId: campaign.clientId });
  const attributionQuery = useAttribution({ clientId: campaign.clientId });
  const pauseMutation = usePauseCampaign();
  const resumeMutation = useResumeCampaign();

  const canPause = campaign.status === "ACTIVE" || campaign.status === "SCHEDULED";
  const canResume = campaign.status === "PAUSED";

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-col gap-4 tablet:flex-row tablet:items-start tablet:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle>{campaign.name}</CardTitle>
              <StatusBadge tone={campaignStatusTone(campaign.status)}>
                {campaignStatusLabel(campaign.status)}
              </StatusBadge>
            </div>
            <CardDescription>
              <Link href={`/clients/${campaign.clientId}`} className="hover:text-primary">
                {campaign.clientName}
              </Link>
              {" · "}
              {campaignObjectiveLabel(campaign.objective)}
            </CardDescription>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {campaign.channels.map((channel) => (
                <CampaignChannelBadge key={channel} channel={channel} />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {canPause ? (
              <Button
                variant="outlined"
                size="sm"
                loading={pauseMutation.isPending}
                onClick={() => pauseMutation.mutate(campaign.id)}
              >
                <Pause className="h-4 w-4" />
                Pause
              </Button>
            ) : null}
            {canResume ? (
              <Button
                variant="outlined"
                size="sm"
                loading={resumeMutation.isPending}
                onClick={() => resumeMutation.mutate(campaign.id)}
              >
                <Play className="h-4 w-4" />
                Resume
              </Button>
            ) : null}
            <Link
              href={`/campaigns/${campaign.id}/performance`}
              className={cn(buttonVariants({ variant: "outlined", size: "sm" }))}
            >
              Performance
            </Link>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 tablet:grid-cols-3">
          <div>
            <p className="text-200 text-neutral-600">Budget</p>
            <p className="text-500 tabular-nums">
              {formatCurrency(campaign.budgetAmount, {
                currency: campaign.currency,
              })}
            </p>
          </div>
          <div>
            <p className="text-200 text-neutral-600">Spend</p>
            <p className="text-500 tabular-nums">
              {formatCurrency(campaign.spendAmount, {
                currency: campaign.currency,
              })}
            </p>
          </div>
          <div>
            <p className="text-200 text-neutral-600">Timeline</p>
            <p className="text-400 text-neutral-600">
              {campaign.startDate
                ? `${formatDate(campaign.startDate, "d MMM yyyy")}${
                    campaign.endDate
                      ? ` – ${formatDate(campaign.endDate, "d MMM yyyy")}`
                      : ""
                  }`
                : "Not scheduled"}
            </p>
            {campaign.ownerName ? (
              <Badge variant="muted" size="sm" className="mt-2">
                {campaign.ownerName}
              </Badge>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="text-500 font-medium">Performance</h2>
        <CampaignMetricsGrid
          metrics={metricsQuery.data}
          loading={metricsQuery.isLoading}
          currency={campaign.currency}
        />
        {metricsQuery.data ? (
          <MarketingToMoneyMap metrics={metricsQuery.data} currency={campaign.currency} />
        ) : metricsQuery.isLoading ? (
          <Skeleton className="h-40 w-full" />
        ) : null}
      </section>

      <section className="space-y-3">
        <h2 className="text-500 font-medium">Channels</h2>
        <ChannelBreakdown
          rows={channelsQuery.data ?? []}
          loading={channelsQuery.isLoading}
          currency={campaign.currency}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-500 font-medium">Attribution</h2>
        <MultiTouchJourney
          rows={attributionQuery.data ?? []}
          currency={campaign.currency}
        />
        <AttributionTable
          rows={attributionQuery.data ?? []}
          loading={attributionQuery.isLoading}
          currency={campaign.currency}
        />
      </section>

      <AudiencePanel campaign={campaign} />
      <CreativeGrid />
    </div>
  );
}
