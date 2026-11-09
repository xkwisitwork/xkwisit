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

import type { Backlink } from "../types";

export function BacklinkTable({
  backlinks,
  loading,
}: {
  backlinks: Backlink[];
  loading?: boolean;
}) {
  if (loading) return <TableSkeleton rows={8} columns={5} />;
  if (backlinks.length === 0) {
    return <p className="text-400 text-neutral-600">No backlinks tracked yet.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-neutral-400 bg-neutral-200/60 hover:bg-neutral-200/60">
            <TableHead>Source</TableHead>
            <TableHead>Anchor</TableHead>
            <TableHead className="text-right">DR</TableHead>
            <TableHead>Follow</TableHead>
            <TableHead>Target</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {backlinks.map((link) => (
            <TableRow key={link.id} className="border-b border-neutral-300 last:border-0">
              <TableCell>
                <p className="text-400 font-medium">{link.sourceDomain}</p>
                <p className="max-w-[240px] truncate text-200 text-neutral-600">
                  {link.sourceUrl}
                </p>
              </TableCell>
              <TableCell className="text-300">{link.anchorText ?? "-"}</TableCell>
              <TableCell className="text-right tabular-nums">
                {link.domainRating ?? "-"}
              </TableCell>
              <TableCell>
                <Badge variant={link.isFollow ? "success" : "muted"} size="sm">
                  {link.isFollow ? "Follow" : "Nofollow"}
                </Badge>
              </TableCell>
              <TableCell className="max-w-[200px] truncate text-300 text-neutral-600">
                {link.targetUrl}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
