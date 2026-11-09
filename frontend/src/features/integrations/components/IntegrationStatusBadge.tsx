"use client";

import { StatusBadge, type StatusTone } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

export type IntegrationStatusBadgeProps = {
  label?: string;
  tone?: StatusTone;
  className?: string;
};

export function IntegrationStatusBadge({
  label = "Integration Status",
  tone = "info",
  className,
}: IntegrationStatusBadgeProps) {
  return (
    <StatusBadge tone={tone} size="sm" className={cn(className)} dot>
      {label}
    </StatusBadge>
  );
}
