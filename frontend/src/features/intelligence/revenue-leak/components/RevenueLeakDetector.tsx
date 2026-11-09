"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { formatCurrencyCompact } from "@/lib/utils/currency";

import type { RevenueLeak } from "../../types";
import { totalEstimatedLoss } from "../utils/detectLeaks";
import { LeakEvidenceList } from "./LeakEvidenceList";

export function RevenueLeakDetector({
  leaks,
  loading,
}: {
  leaks: RevenueLeak[];
  loading?: boolean;
}) {
  if (loading) {
    return <Skeleton variant="rectangle" className="h-40 w-full" />;
  }

  if (leaks.length === 0) {
    return <p className="text-400 text-neutral-600">No revenue leaks detected.</p>;
  }

  const currency = leaks[0]!.currency;
  const total = totalEstimatedLoss(leaks);

  return (
    <div className="space-y-4">
      <p className="text-400">
        Estimated monthly loss:{" "}
        <span className="font-medium tabular-nums">
          {formatCurrencyCompact(total, currency)}
        </span>
      </p>
      <div className="space-y-3">
        {leaks.map((leak) => (
          <LeakEvidenceList key={leak.id} leak={leak} />
        ))}
      </div>
    </div>
  );
}
