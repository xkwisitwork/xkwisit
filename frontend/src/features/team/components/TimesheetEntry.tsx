"use client";

import { formatDate } from "@/lib/utils/date";

import type { TimesheetEntry } from "../types";

export function TimesheetEntryRow({ entry }: { entry: TimesheetEntry }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-neutral-300 py-3 last:border-0">
      <div>
        <p className="text-400 font-medium">{entry.memberName}</p>
        <p className="text-200 text-neutral-600">
          {entry.projectName ?? "Internal"}
          {entry.clientName ? ` · ${entry.clientName}` : ""}
        </p>
        {entry.note ? (
          <p className="mt-1 text-300 text-neutral-600">{entry.note}</p>
        ) : null}
      </div>
      <div className="text-right text-300">
        <p className="font-medium tabular-nums">{entry.hours}h</p>
        <p className="text-200 text-neutral-600">
          {formatDate(entry.date, "d MMM yyyy")}
        </p>
      </div>
    </div>
  );
}
