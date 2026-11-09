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
import { formatNumber } from "@/lib/utils/format";

import type { AnalyticsEventListItem } from "../types";

export function EventTable({
  events,
  loading,
}: {
  events: AnalyticsEventListItem[];
  loading?: boolean;
}) {
  if (loading) return <TableSkeleton rows={6} columns={5} />;
  if (events.length === 0) {
    return <p className="text-400 text-neutral-600">No events defined.</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-neutral-400 bg-neutral-200/60 hover:bg-neutral-200/60">
            <TableHead>Event</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Key</TableHead>
            <TableHead className="text-right">30d</TableHead>
            <TableHead>Last seen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow
              key={event.id}
              className="border-b border-neutral-300 last:border-0"
            >
              <TableCell className="font-medium">{event.name}</TableCell>
              <TableCell className="text-300 text-neutral-600">
                {event.category ?? "-"}
              </TableCell>
              <TableCell>
                {event.isKeyEvent ? (
                  <Badge variant="success" size="sm">
                    Key
                  </Badge>
                ) : (
                  <span className="text-300 text-neutral-600"> - </span>
                )}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {formatNumber(event.count30d)}
              </TableCell>
              <TableCell className="text-300 text-neutral-600">
                {event.lastSeenAt ? formatDate(event.lastSeenAt, "d MMM yyyy") : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
