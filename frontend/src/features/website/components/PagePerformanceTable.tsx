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
import { formatNumber, formatPercent } from "@/lib/utils/format";

import type { PagePerformanceRow } from "../types";

export function PagePerformanceTable({
  pages,
  loading,
}: {
  pages: PagePerformanceRow[];
  loading?: boolean;
}) {
  if (loading) return <TableSkeleton rows={6} columns={5} />;
  if (pages.length === 0) {
    return <p className="text-400 text-neutral-600">No page data yet.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-neutral-400 bg-neutral-200/60 hover:bg-neutral-200/60">
            <TableHead>Page</TableHead>
            <TableHead className="text-right">Sessions</TableHead>
            <TableHead className="text-right">Bounce</TableHead>
            <TableHead className="text-right">Conv.</TableHead>
            <TableHead className="text-right">Avg duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages.map((page) => (
            <TableRow key={page.id} className="border-b border-neutral-300 last:border-0">
              <TableCell>
                <p className="font-medium">{page.title ?? page.path}</p>
                <p className="text-200 text-neutral-600">{page.path}</p>
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatNumber(page.sessions)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatPercent(page.bounceRate)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatPercent(page.conversionRate)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {Math.round(page.avgDurationSec)}s
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
