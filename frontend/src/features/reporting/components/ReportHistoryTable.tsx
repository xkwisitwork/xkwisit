"use client";

import { StatusBadge } from "@/components/ui/Badge";
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

import type { ReportListItem, ReportStatus } from "../types";
import { periodLabel } from "../data/reportTemplates";

function statusTone(status: ReportStatus) {
  if (status === "SENT") return "success" as const;
  if (status === "READY") return "info" as const;
  if (status === "SCHEDULED") return "warning" as const;
  return "muted" as const;
}

export function ReportHistoryTable({
  reports,
  loading,
}: {
  reports: ReportListItem[];
  loading?: boolean;
}) {
  if (loading) return <TableSkeleton rows={6} columns={5} />;
  if (reports.length === 0) {
    return <p className="text-400 text-neutral-600">No reports yet.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-neutral-400 bg-neutral-200/60 hover:bg-neutral-200/60">
            <TableHead>Title</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((report) => (
            <TableRow
              key={report.id}
              className="border-b border-neutral-300 last:border-0"
            >
              <TableCell className="font-medium">{report.title}</TableCell>
              <TableCell className="text-300 text-neutral-600">
                {report.clientName ?? "-"}
              </TableCell>
              <TableCell className="text-300">{periodLabel(report.period)}</TableCell>
              <TableCell>
                <StatusBadge tone={statusTone(report.status)} size="sm">
                  {report.status}
                </StatusBadge>
              </TableCell>
              <TableCell className="text-300 text-neutral-600">
                {formatDate(report.updatedAt, "d MMM yyyy")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
