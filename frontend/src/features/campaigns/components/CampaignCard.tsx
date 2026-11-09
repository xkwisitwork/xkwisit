"use client";

import Link from "next/link";

import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatCurrencyCompact } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";

import type { CampaignListItem } from "../types";
import {
  campaignObjectiveLabel,
  campaignStatusLabel,
  campaignStatusTone,
} from "../utils/metricsCalculator";
import { CampaignChannelBadge } from "./CampaignChannelBadge";

export type CampaignCardProps = {
  campaign: CampaignListItem;
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <Card className="transition hover:border-neutral-500">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/campaigns/${campaign.id}`}
              className="text-500 font-medium hover:text-primary"
            >
              {campaign.name}
            </Link>
            <p className="mt-1 text-300 text-neutral-600">
              <Link href={`/clients/${campaign.clientId}`} className="hover:text-primary">
                {campaign.clientName}
              </Link>
            </p>
          </div>
          <StatusBadge tone={campaignStatusTone(campaign.status)} size="sm">
            {campaignStatusLabel(campaign.status)}
          </StatusBadge>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Badge variant="muted" size="sm">
            {campaignObjectiveLabel(campaign.objective)}
          </Badge>
          {campaign.channels.slice(0, 3).map((channel) => (
            <CampaignChannelBadge key={channel} channel={channel} />
          ))}
          {campaign.channels.length > 3 ? (
            <Badge variant="muted" size="sm">
              +{campaign.channels.length - 3}
            </Badge>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="grid min-w-0 grid-cols-1 gap-3 border-t border-neutral-300 pt-4 mobile-lg:grid-cols-3">
        <div>
          <p className="text-200 text-neutral-600">Spend</p>
          <p className="text-400 tabular-nums">
            {formatCurrencyCompact(campaign.spendAmount, campaign.currency)}
          </p>
        </div>
        <div>
          <p className="text-200 text-neutral-600">Leads</p>
          <p className="text-400 tabular-nums">{campaign.leads}</p>
        </div>
        <div>
          <p className="text-200 text-neutral-600">ROAS</p>
          <p className="text-400 tabular-nums">{campaign.roas.toFixed(2)}x</p>
        </div>
        <div className="col-span-3 text-300 text-neutral-600">
          {campaign.startDate
            ? `${formatDate(campaign.startDate, "d MMM yyyy")}${
                campaign.endDate ? ` – ${formatDate(campaign.endDate, "d MMM yyyy")}` : ""
              }`
            : "No dates set"}
          {campaign.ownerName ? ` · ${campaign.ownerName}` : ""}
        </div>
      </CardContent>
    </Card>
  );
}
