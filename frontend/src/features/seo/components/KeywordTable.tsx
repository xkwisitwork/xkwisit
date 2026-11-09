"use client";

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
import { formatNumber } from "@/lib/utils/format";

import type { KeywordRanking } from "../types";
import { positionDelta } from "../utils/seoScoring";

export function KeywordTable({
  rankings,
  loading,
}: {
  rankings: KeywordRanking[];
  loading?: boolean;
}) {
  if (loading) return <TableSkeleton rows={8} columns={5} />;
  if (rankings.length === 0) {
    return <p className="text-400 text-neutral-600">No keyword rankings yet.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-neutral-400 bg-neutral-200/60 hover:bg-neutral-200/60">
            <TableHead>Keyword</TableHead>
            <TableHead className="text-right">Position</TableHead>
            <TableHead className="text-right">Change</TableHead>
            <TableHead className="text-right">Volume</TableHead>
            <TableHead>URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rankings.map((row) => {
            const delta = positionDelta(row.position, row.previousPosition);
            return (
              <TableRow
                key={row.id}
                className="border-b border-neutral-300 last:border-0"
              >
                <TableCell className="font-medium">{row.keyword}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {row.position ?? "-"}
                </TableCell>
                <TableCell className="text-right">
                  {delta == null ? (
                    <Badge variant="muted" size="sm">
                      {row.trend}
                    </Badge>
                  ) : (
                    <Badge
                      variant={
                        delta > 0 ? "success" : delta < 0 ? "destructive" : "muted"
                      }
                      size="sm"
                    >
                      {delta > 0 ? `+${delta}` : delta}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {row.searchVolume != null ? formatNumber(row.searchVolume) : "-"}
                </TableCell>
                <TableCell className="max-w-[220px] truncate text-300 text-neutral-600">
                  {row.url ?? "-"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export function RankingTracker(props: { rankings: KeywordRanking[]; loading?: boolean }) {
  return <KeywordTable {...props} />;
}
