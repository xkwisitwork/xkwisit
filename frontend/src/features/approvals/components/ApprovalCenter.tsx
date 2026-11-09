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
import { formatDate } from "@/lib/utils/date";

import type { ApprovalListItem } from "../types";
import {
  approvalPriorityLabel,
  approvalPriorityTone,
  approvalResourceLabel,
} from "../utils/approvalLabels";
import { ApprovalActions } from "./ApprovalActions";
import { ApprovalBadge } from "./ApprovalBadge";

export type ApprovalCenterProps = {
  items: ApprovalListItem[];
  loading?: boolean;
  emptyState?: React.ReactNode;
  variant?: "table" | "cards";
};

export function ApprovalCenter({ items, loading, emptyState }: ApprovalCenterProps) {
  if (loading) return <TableSkeleton rows={8} columns={7} />;
  if (items.length === 0) return <>{emptyState}</>;

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-neutral-400 bg-neutral-200/60 hover:bg-neutral-200/60">
            <TableHead className="w-[280px]">Item</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} className="border-b border-neutral-300 last:border-0">
              <TableCell>
                <p className="text-400 font-medium text-neutral-900">{item.title}</p>
                <p className="mt-0.5 text-200 text-neutral-600">
                  {item.requesterName ?? "Unknown requester"}
                </p>
              </TableCell>
              <TableCell>
                {item.clientId ? (
                  <Link
                    href={`/clients/${item.clientId}`}
                    className="text-400 text-neutral-600 hover:text-primary"
                  >
                    {item.clientName ?? "Client"}
                  </Link>
                ) : (
                  <span className="text-300 text-neutral-600"> - </span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant="muted" size="sm">
                  {approvalResourceLabel(item.resourceType)}
                </Badge>
              </TableCell>
              <TableCell>
                <ApprovalBadge status={item.status} />
              </TableCell>
              <TableCell>
                <StatusBadge tone={approvalPriorityTone(item.priority)} size="sm">
                  {approvalPriorityLabel(item.priority)}
                </StatusBadge>
              </TableCell>
              <TableCell>
                <span className="text-300 text-neutral-600">
                  {item.dueAt ? formatDate(item.dueAt, "d MMM") : "-"}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end">
                  <ApprovalActions approvalId={item.id} status={item.status} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
