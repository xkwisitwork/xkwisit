"use client";

import { StatusBadge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

export function GrowthScoreCard({
  score,
  label,
  businessName,
}: {
  score: number;
  label: string;
  businessName?: string | null;
}) {
  const tone =
    score >= 70
      ? ("success" as const)
      : score >= 50
        ? ("warning" as const)
        : ("destructive" as const);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.5rem] bg-[#3B05C4] p-6 text-white mobile-sm:p-8",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
      />
      <div className="relative flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/90">
            {businessName ? businessName : "Growth health"}
          </p>
          <p className="mt-2 font-display text-[clamp(2.5rem,8vw,3.5rem)] font-bold tabular-nums leading-none">
            {score}
          </p>
          <p className="mt-2 text-300 text-white/80">out of 100</p>
        </div>
        <StatusBadge tone={tone} className="!bg-white/15 !text-white">
          {label}
        </StatusBadge>
      </div>
    </div>
  );
}
