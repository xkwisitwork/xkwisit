"use client";

import { formatDate } from "@/lib/utils/date";

import type { BrandRevision } from "../types";

export type RevisionTimelineProps = {
  revisions: BrandRevision[];
};

export function RevisionTimeline({ revisions }: RevisionTimelineProps) {
  if (revisions.length === 0) {
    return <p className="text-400 text-neutral-600">No revisions yet.</p>;
  }

  const sorted = [...revisions].sort((a, b) => b.version - a.version);

  return (
    <ol className="space-y-4 border-l border-neutral-400 pl-4">
      {sorted.map((revision) => (
        <li key={revision.id} className="relative">
          <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
          <div className="rounded-xl border border-neutral-400 bg-neutral-100 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-400 font-medium">v{revision.version}</p>
              <p className="text-200 text-neutral-600">
                {formatDate(revision.createdAt, "d MMM yyyy")}
              </p>
            </div>
            <p className="mt-1 text-300 text-neutral-700">{revision.summary}</p>
            {revision.authorName ? (
              <p className="mt-1 text-200 text-neutral-600">{revision.authorName}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
