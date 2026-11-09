"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
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

import type { AttributionRow } from "../types";
import { attributionTouchLabel, hasConverted } from "../utils/attribution";

export type AttributionTableProps = {
  rows: AttributionRow[];
  loading?: boolean;
  currency?: "NGN" | "USD" | "GBP" | "EUR";
  emptyState?: React.ReactNode;
};

export function AttributionTable({
  rows,
  loading = false,
  currency = "NGN",
  emptyState,
}: AttributionTableProps) {
  if (loading) return <TableSkeleton rows={8} columns={7} />;
  if (rows.length === 0) {
    return (
      <>
        {emptyState ?? (
          <p className="text-400 text-neutral-600">No attribution rows yet.</p>
        )}
      </>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-neutral-400 bg-neutral-200/60 hover:bg-neutral-200/60">
            <TableHead>Lead</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>First touch</TableHead>
            <TableHead>Last touch</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Revenue</TableHead>
            <TableHead>Closed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.leadId}
              className="border-b border-neutral-300 last:border-0"
            >
              <TableCell>
                <Link
                  href={`/crm/leads/${row.leadId}`}
                  className="text-400 font-medium hover:text-primary"
                >
                  {row.leadName}
                </Link>
              </TableCell>
              <TableCell className="text-400 text-neutral-600">{row.source}</TableCell>
              <TableCell className="text-300 text-neutral-600">
                {attributionTouchLabel(row.firstTouch)}
              </TableCell>
              <TableCell className="text-300 text-neutral-600">
                {attributionTouchLabel(row.lastTouch)}
              </TableCell>
              <TableCell>
                {hasConverted(row) ? (
                  <Badge variant="success" size="sm">
                    Customer
                  </Badge>
                ) : (
                  <Badge variant="muted" size="sm">
                    Open
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatCurrencyCompact(row.revenue, currency)}
              </TableCell>
              <TableCell className="text-300 text-neutral-600">
                {row.closedAt ? formatDate(row.closedAt, "d MMM yyyy") : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
