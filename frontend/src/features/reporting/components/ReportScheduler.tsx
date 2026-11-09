"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils/date";

import type { ReportSchedule } from "../types";
import { periodLabel } from "../data/reportTemplates";

export function ReportScheduler({
  schedules,
  loading,
}: {
  schedules: ReportSchedule[];
  loading?: boolean;
}) {
  if (loading) {
    return <Skeleton variant="rectangle" className="h-40 w-full" />;
  }

  if (schedules.length === 0) {
    return <p className="text-400 text-neutral-600">No scheduled reports.</p>;
  }

  return (
    <ul className="divide-y divide-neutral-300 rounded-xl border border-neutral-400">
      {schedules.map((item) => (
        <li
          key={item.id}
          className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
        >
          <div>
            <p className="text-400 font-medium">
              {item.clientName ?? "Org-wide"} · {periodLabel(item.cadence)}
            </p>
            <p className="text-200 text-neutral-600">
              Next {formatDate(item.nextRunAt, "d MMM yyyy HH:mm")}
            </p>
          </div>
          <StatusBadge tone={item.enabled ? "success" : "muted"} size="sm">
            {item.enabled ? "Enabled" : "Paused"}
          </StatusBadge>
        </li>
      ))}
    </ul>
  );
}
