"use client";

import { StatusBadge, type StatusTone } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

export type ProjectHealthBadgeProps = {
  label?: string;
  tone?: StatusTone;
  className?: string;
};

export function ProjectHealthBadge({
  label = "Project Health",
  tone = "info",
  className,
}: ProjectHealthBadgeProps) {
  return (
    <StatusBadge tone={tone} size="sm" className={cn(className)} dot>
      {label}
    </StatusBadge>
  );
}
