"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import { TimesheetEntryRow, useTimesheets } from "@/features/team";

export default function TeamTimesheetsPage() {
  const { data = [], isLoading } = useTimesheets();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Team", href: "/team" }, { label: "Timesheets" }]}
        />
        <PageHeader title="Timesheets" description="Logged hours." />
      </div>
      {isLoading ? (
        <Skeleton variant="rectangle" className="h-40 w-full" />
      ) : data.length === 0 ? (
        <p className="text-400 text-neutral-600">No timesheet entries.</p>
      ) : (
        <div className="rounded-xl border border-neutral-400 px-4">
          {data.map((entry) => (
            <TimesheetEntryRow key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}
