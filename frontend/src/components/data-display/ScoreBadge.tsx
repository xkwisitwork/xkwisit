"use client";

import { StatusBadge, type StatusTone } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

export type ScoreBadgeProps = {
  label?: string;
  tone?: StatusTone;
  className?: string;
};

export function ScoreBadge({
  label = "Score",
  tone = "info",
  className,
}: ScoreBadgeProps) {
  return (
    <StatusBadge tone={tone} size="sm" className={cn(className)} dot>
      {label}
    </StatusBadge>
  );
}
