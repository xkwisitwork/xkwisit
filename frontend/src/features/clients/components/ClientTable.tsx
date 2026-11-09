"use client";

import Link from "next/link";

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
import { humanize } from "@/lib/utils/format";

import type { ClientListItem } from "../types";
import { ClientHealthBadge } from "./ClientHealthBadge";
import { ClientStatusBadge } from "./ClientStatusBadge";

export type ClientTableProps = {
  items: ClientListItem[];
  loading?: boolean;
  emptyState?: React.ReactNode;
};

export function ClientTable({ items, loading, emptyState }: ClientTableProps) {
  if (loading) return <TableSkeleton rows={8} columns={6} />;

  if (items.length === 0) return <>{emptyState}</>;

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-neutral-400 bg-neutral-200/60 hover:bg-neutral-200/60">
            <TableHead className="w-[280px]">Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Health</TableHead>
            <TableHead>Lifecycle</TableHead>
            <TableHead className="text-right">Projects</TableHead>
            <TableHead>Account manager</TableHead>
            <TableHead className="text-right">Attention</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((client) => (
            <TableRow
              key={client.id}
              className="border-b border-neutral-300 last:border-0"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar
                    src={client.logoUrl ?? undefined}
                    name={client.name}
                    size="sm"
                  />
                  <div className="min-w-0">
                    <Link
                      href={`/clients/${client.id}`}
                      className="block truncate text-400 font-medium leading-tight hover:text-primary"
                    >
                      {client.name}
                    </Link>
                    <p className="truncate text-300 text-neutral-600">
                      {client.industry}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <ClientStatusBadge status={client.status} />
              </TableCell>

              <TableCell>
                <ClientHealthBadge
                  level={client.healthLevel}
                  score={client.healthScore}
                />
              </TableCell>

              <TableCell>
                <span className="text-300 text-neutral-600">
                  {humanize(client.lifecycleStage)}
                </span>
              </TableCell>

              <TableCell className="text-right tabular-nums">
                <span className="text-400 font-medium">{client.openProjectsCount}</span>
              </TableCell>

              <TableCell>
                {client.accountManagerName ? (
                  <span className="text-400 text-neutral-600">
                    {client.accountManagerName}
                  </span>
                ) : (
                  <Badge variant="muted" size="sm">
                    Unassigned
                  </Badge>
                )}
              </TableCell>

              <TableCell className="text-right">
                <div className="flex flex-wrap items-center justify-end gap-1">
                  {client.overdueTasksCount > 0 ? (
                    <Badge variant="destructive" size="sm">
                      {client.overdueTasksCount} overdue
                    </Badge>
                  ) : null}
                  {client.pendingApprovalsCount > 0 ? (
                    <Badge variant="warning" size="sm">
                      {client.pendingApprovalsCount} pending
                    </Badge>
                  ) : null}
                  {client.overdueTasksCount === 0 &&
                  client.pendingApprovalsCount === 0 ? (
                    <span className="text-300 text-neutral-600"> - </span>
                  ) : null}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
