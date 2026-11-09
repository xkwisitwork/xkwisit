"use client";

import { Skeleton } from "@/components/ui/Skeleton";

import type { CapacityRow } from "../types";

export function WorkloadChart({
  rows,
  loading,
}: {
  rows: CapacityRow[];
  loading?: boolean;
}) {
  if (loading) {
    return <Skeleton variant="rectangle" className="h-40 w-full" />;
  }

  if (rows.length === 0) {
    return <p className="text-400 text-neutral-600">No workload data.</p>;
  }

  const max = Math.max(...rows.map((r) => r.allocatedHours), 1);

  return (
    <div className="flex h-40 items-end gap-2 rounded-xl border border-neutral-400 p-4">
      {rows.map((row) => (
        <div
          key={row.memberId}
          className="flex flex-1 flex-col items-center gap-1"
          title={`${row.memberName}: ${row.allocatedHours}h`}
        >
          <div
            className="w-full rounded-t bg-primary/80"
            style={{
              height: `${Math.max(8, (row.allocatedHours / max) * 100)}%`,
            }}
          />
          <span className="text-100 truncate text-neutral-600">
            {row.memberName.split(" ")[0]}
          </span>
        </div>
      ))}
    </div>
  );
}
