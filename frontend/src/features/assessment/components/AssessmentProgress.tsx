"use client";

import { cn } from "@/lib/utils/cn";

export function AssessmentProgress({
  progress,
  step,
  total,
}: {
  progress: number;
  step?: number;
  total?: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-200 text-neutral-600">
        <span>
          {step != null && total != null ? `Section ${step} of ${total}` : "Progress"}
        </span>
        <span className="font-medium tabular-nums text-mint">{progress}% answered</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-neutral-300">
        <div
          className={cn("h-full rounded-full bg-mint transition-all duration-300")}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}
