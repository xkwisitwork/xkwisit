"use client";

import { formatDate } from "@/lib/utils/date";

import type { ContractTimelineEvent } from "../types";

export function ContractTimeline({ events }: { events: ContractTimelineEvent[] }) {
  if (events.length === 0) {
    return <p className="text-300 text-neutral-600">No timeline events.</p>;
  }

  return (
    <ol className="space-y-3 border-l border-neutral-400 pl-4">
      {events.map((event) => (
        <li key={event.id} className="relative">
          <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
          <p className="text-400 font-medium">{event.label}</p>
          <p className="text-200 text-neutral-600">
            {formatDate(event.at, "d MMM yyyy HH:mm")}
          </p>
        </li>
      ))}
    </ol>
  );
}
