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
import { formatDate } from "@/lib/utils/date";

import type { TechnicalIssue } from "../types";
import { severityTone } from "../utils/seoScoring";

export function TechnicalIssuesList({
  issues,
  loading,
}: {
  issues: TechnicalIssue[];
  loading?: boolean;
}) {
  if (loading) return <TableSkeleton rows={6} columns={5} />;
  if (issues.length === 0) {
    return <p className="text-400 text-neutral-600">No technical issues found.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-neutral-400 bg-neutral-200/60 hover:bg-neutral-200/60">
            <TableHead>Issue</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">URLs</TableHead>
            <TableHead>Detected</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow
              key={issue.id}
              className="border-b border-neutral-300 last:border-0"
            >
              <TableCell>
                <p className="text-400 font-medium">{issue.title}</p>
                <p className="text-200 text-neutral-600">{issue.description}</p>
              </TableCell>
              <TableCell>
                <Badge variant={severityTone(issue.severity)} size="sm">
                  {issue.severity}
                </Badge>
              </TableCell>
              <TableCell className="text-300">{issue.category}</TableCell>
              <TableCell className="text-right tabular-nums">
                {issue.affectedUrls}
              </TableCell>
              <TableCell className="text-300 text-neutral-600">
                {formatDate(issue.detectedAt, "d MMM yyyy")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
