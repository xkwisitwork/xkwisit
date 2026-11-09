"use client";

import { StatusBadge, type StatusTone } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

export type AlertSeverityBadgeProps = {
  label?: string;
  tone?: StatusTone;
  className?: string;
};

export function AlertSeverityBadge({
  label = "Alert Severity",
  tone = "info",
  className,
}: AlertSeverityBadgeProps) {
  return (
    <StatusBadge tone={tone} size="sm" className={cn(className)} dot>
      {label}
    </StatusBadge>
  );
}
