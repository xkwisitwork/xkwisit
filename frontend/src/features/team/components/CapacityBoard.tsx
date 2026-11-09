"use client";

import { Skeleton } from "@/components/ui/Skeleton";

import type { CapacityRow } from "../types";
import { CapacityMeter } from "./CapacityMeter";

export function CapacityBoard({
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
    return <p className="text-400 text-neutral-600">No capacity data.</p>;
  }

  return (
    <ul className="space-y-4 rounded-xl border border-neutral-400 p-4">
      {rows.map((row) => (
        <li key={row.memberId}>
          <CapacityMeter
            percent={row.utilizationPercent}
            label={`${row.memberName} · ${row.allocatedHours}/${row.capacityHours}h`}
          />
        </li>
      ))}
    </ul>
  );
}
