"use client";

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
import { formatNumber } from "@/lib/utils/format";

import type { ChannelBreakdownRow } from "../types";
import { CampaignChannelBadge } from "./CampaignChannelBadge";

export type ChannelBreakdownProps = {
  rows: ChannelBreakdownRow[];
  loading?: boolean;
  currency?: "NGN" | "USD" | "GBP" | "EUR";
  emptyState?: React.ReactNode;
};

export function ChannelBreakdown({
  rows,
  loading = false,
  currency = "NGN",
  emptyState,
}: ChannelBreakdownProps) {
  if (loading) return <TableSkeleton rows={5} columns={7} />;
  if (rows.length === 0) {
    return (
      <>
        {emptyState ?? <p className="text-400 text-neutral-600">No channel data yet.</p>}
      </>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-neutral-400 bg-neutral-200/60 hover:bg-neutral-200/60">
            <TableHead>Channel</TableHead>
            <TableHead className="text-right">Spend</TableHead>
            <TableHead className="text-right">Impressions</TableHead>
            <TableHead className="text-right">Clicks</TableHead>
            <TableHead className="text-right">Leads</TableHead>
            <TableHead className="text-right">Customers</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead className="text-right">ROAS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.channel}
              className="border-b border-neutral-300 last:border-0"
            >
              <TableCell>
                <CampaignChannelBadge channel={row.channel} />
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatCurrencyCompact(row.spend, currency)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatNumber(row.impressions)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatNumber(row.clicks)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatNumber(row.leads)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatNumber(row.customers)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatCurrencyCompact(row.revenue, currency)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {row.roas.toFixed(2)}x
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
