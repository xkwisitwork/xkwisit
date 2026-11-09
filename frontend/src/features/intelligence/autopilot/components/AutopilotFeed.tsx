"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils/date";

import type { AutopilotEvent } from "../../types";

export function AutopilotFeed({
  events,
  loading,
}: {
  events: AutopilotEvent[];
  loading?: boolean;
}) {
  if (loading) {
    return <Skeleton variant="rectangle" className="h-40 w-full" />;
  }

  if (events.length === 0) {
    return <p className="text-400 text-neutral-600">No autopilot events.</p>;
  }

  return (
    <ul className="divide-y divide-neutral-300 rounded-xl border border-neutral-400">
      {events.map((event) => (
        <li
          key={event.id}
          className="flex flex-wrap items-start justify-between gap-3 px-4 py-3"
        >
          <div>
            <p className="text-400 font-medium">{event.ruleName}</p>
            <p className="text-300 text-neutral-600">{event.summary}</p>
            <p className="mt-1 text-200 text-neutral-600">
              {formatDate(event.createdAt, "d MMM yyyy HH:mm")}
            </p>
          </div>
          {event.needsReview ? (
            <StatusBadge tone="warning" size="sm">
              Review
            </StatusBadge>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
