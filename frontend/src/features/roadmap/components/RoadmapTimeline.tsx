"use client";

import { cn } from "@/lib/utils/cn";

export type RoadmapTimelineEvent = {
  id: string;
  title: string;
  detail?: string;
  at: string;
};

export type RoadmapTimelineProps = {
  className?: string;
  events?: RoadmapTimelineEvent[];
};

const DEFAULT_EVENTS: RoadmapTimelineEvent[] = [];

export function RoadmapTimeline({ className, events = [] }: RoadmapTimelineProps) {
  return (
    <ol className={cn("relative space-y-4 border-l border-neutral-300 pl-5", className)}>
      {events.map((event) => (
        <li key={event.id} className="relative">
          <span className="absolute -left-[1.41rem] top-1.5 h-2.5 w-2.5 rounded-full bg-mint" />
          <p className="text-400 font-medium text-neutral-900">{event.title}</p>
          {event.detail ? (
            <p className="mt-1 text-300 text-neutral-600">{event.detail}</p>
          ) : null}
          <p className="mt-1 text-200 text-neutral-600">{event.at}</p>
        </li>
      ))}
    </ol>
  );
}
