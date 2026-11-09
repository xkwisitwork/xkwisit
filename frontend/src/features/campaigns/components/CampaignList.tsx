"use client";

import Link from "next/link";

import { Badge, StatusBadge } from "@/components/ui/Badge";
import { TableSkeleton } from "@/components/ui/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { formatCurrencyCompact } from "@/lib/utils/currency";
import { formatDate } from "@/lib/utils/date";

import type { CampaignListItem } from "../types";
import {
  campaignObjectiveLabel,
  campaignStatusLabel,
  campaignStatusTone,
} from "../utils/metricsCalculator";
import { CampaignChannelBadge } from "./CampaignChannelBadge";

export type CampaignListProps = {
  items: CampaignListItem[];
  loading?: boolean;
  emptyState?: React.ReactNode;
};

export function CampaignList({ items, loading, emptyState }: CampaignListProps) {
  if (loading) return <TableSkeleton rows={8} columns={7} />;
  if (items.length === 0) return <>{emptyState}</>;

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-neutral-400 bg-neutral-200/60 hover:bg-neutral-200/60">
            <TableHead className="w-[260px]">Campaign</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Channels</TableHead>
            <TableHead className="text-right">Spend</TableHead>
            <TableHead className="text-right">Leads</TableHead>
            <TableHead className="text-right">ROAS</TableHead>
            <TableHead>Dates</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((campaign) => (
            <TableRow
              key={campaign.id}
              className="border-b border-neutral-300 last:border-0"
            >
              <TableCell>
                <Link
                  href={`/campaigns/${campaign.id}`}
                  className="text-400 font-medium hover:text-primary"
                >
                  {campaign.name}
                </Link>
                <p className="mt-0.5 text-200 text-neutral-600">
                  {campaignObjectiveLabel(campaign.objective)}
                </p>
              </TableCell>

              <TableCell>
                <Link
                  href={`/clients/${campaign.clientId}`}
                  className="text-400 text-neutral-600 hover:text-primary"
                >
                  {campaign.clientName}
                </Link>
              </TableCell>

              <TableCell>
                <StatusBadge tone={campaignStatusTone(campaign.status)} size="sm">
                  {campaignStatusLabel(campaign.status)}
                </StatusBadge>
              </TableCell>

              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {campaign.channels.slice(0, 2).map((channel) => (
                    <CampaignChannelBadge key={channel} channel={channel} />
                  ))}
                  {campaign.channels.length > 2 ? (
                    <Badge variant="muted" size="sm">
                      +{campaign.channels.length - 2}
                    </Badge>
                  ) : null}
                </div>
              </TableCell>

              <TableCell className="text-right tabular-nums">
                {formatCurrencyCompact(campaign.spendAmount, campaign.currency)}
              </TableCell>

              <TableCell className="text-right tabular-nums">{campaign.leads}</TableCell>

              <TableCell className="text-right tabular-nums">
                {campaign.roas.toFixed(2)}x
              </TableCell>

              <TableCell>
                <span className="text-300 text-neutral-600">
                  {campaign.startDate
                    ? `${formatDate(campaign.startDate, "d MMM")}${
                        campaign.endDate
                          ? ` – ${formatDate(campaign.endDate, "d MMM")}`
                          : ""
                      }`
                    : "-"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
