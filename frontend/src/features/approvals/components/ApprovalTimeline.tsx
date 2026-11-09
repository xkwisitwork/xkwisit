"use client";

import { formatDate } from "@/lib/utils/date";

import type { ApprovalTimelineEvent } from "../types";

const EVENT_LABEL: Record<ApprovalTimelineEvent["type"], string> = {
  SUBMITTED: "Submitted",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  CHANGES_REQUESTED: "Changes requested",
  REASSIGNED: "Reassigned",
  COMMENTED: "Commented",
  EXPIRED: "Expired",
};

export function ApprovalTimeline({
  events,
  loading,
}: {
  events: ApprovalTimelineEvent[];
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-14 animate-pulse rounded-xl bg-neutral-200" />
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return <p className="text-300 text-neutral-600">No timeline events yet.</p>;
  }

  return (
    <ol className="relative space-y-4 border-l border-neutral-300 pl-5">
      {events.map((event) => (
        <li key={event.id} className="relative">
          <span className="absolute -left-[1.41rem] top-1.5 h-2.5 w-2.5 rounded-full bg-mint" />
          <p className="text-400 font-medium text-neutral-900">
            {EVENT_LABEL[event.type]}
            {event.actorName ? (
              <span className="font-normal text-neutral-600"> by {event.actorName}</span>
            ) : null}
          </p>
          {event.note ? (
            <p className="mt-1 text-300 text-neutral-600">{event.note}</p>
          ) : null}
          <p className="mt-1 text-200 text-neutral-600">
            {formatDate(event.createdAt, "d MMM yyyy · HH:mm")}
          </p>
        </li>
      ))}
    </ol>
  );
}
