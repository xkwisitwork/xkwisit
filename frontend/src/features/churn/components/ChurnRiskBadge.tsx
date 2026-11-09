"use client";

import { StatusBadge, type StatusTone } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

export type ChurnRiskBadgeProps = {
  label?: string;
  tone?: StatusTone;
  className?: string;
};

export function ChurnRiskBadge({
  label = "Churn Risk",
  tone = "info",
  className,
}: ChurnRiskBadgeProps) {
  return (
    <StatusBadge tone={tone} size="sm" className={cn(className)} dot>
      {label}
    </StatusBadge>
  );
}
