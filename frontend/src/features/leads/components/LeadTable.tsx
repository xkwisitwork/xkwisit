"use client";

import Link from "next/link";
import { ArrowUpDown } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
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
import { formatShortRelative } from "@/lib/utils/date";

import type { LeadListItem } from "../types";
import { LeadScoreBadge } from "./LeadScoreBadge";
import { LeadSourceBadge } from "./LeadSourceBadge";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { LeadQuickActions } from "./LeadQuickActions";

export type LeadTableProps = {
  items: LeadListItem[];
  loading?: boolean;
  emptyState?: React.ReactNode;
};

export function LeadTable({ items, loading, emptyState }: LeadTableProps) {
  if (loading) return <TableSkeleton rows={8} columns={6} />;

  if (items.length === 0) {
    return <>{emptyState}</>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-neutral-400 bg-neutral-200/60 hover:bg-neutral-200/60">
            <TableHead className="w-[280px]">
              <span className="inline-flex items-center gap-1.5">
                Lead <ArrowUpDown className="h-3 w-3" />
              </span>
            </TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="w-12 text-right" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((lead) => (
            <TableRow key={lead.id} className="border-b border-neutral-300 last:border-0">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar name={lead.fullName} size="sm" />
                  <div className="min-w-0">
                    <Link
                      href={`/crm/leads/${lead.id}`}
                      className="block truncate text-400 font-medium leading-tight hover:text-primary"
                    >
                      {lead.fullName}
                    </Link>
                    <p className="truncate text-300 text-neutral-600">{lead.email}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <span className="text-400 text-neutral-600">{lead.company}</span>
              </TableCell>

              <TableCell>
                <LeadSourceBadge source={lead.source} />
              </TableCell>

              <TableCell>
                <LeadStatusBadge status={lead.status} />
              </TableCell>

              <TableCell>
                <LeadScoreBadge score={lead.score} />
              </TableCell>

              <TableCell>
                {lead.ownerName ? (
                  <span className="text-400 text-neutral-600">{lead.ownerName}</span>
                ) : (
                  <Badge variant="muted" size="sm">
                    Unassigned
                  </Badge>
                )}
              </TableCell>

              <TableCell>
                <span className="text-300 text-neutral-600">
                  {formatShortRelative(lead.createdAt)}
                </span>
              </TableCell>

              <TableCell className="text-right">
                <LeadQuickActions leadId={lead.id} leadName={lead.fullName} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
