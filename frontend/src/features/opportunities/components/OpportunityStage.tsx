"use client";

import { Badge } from "@/components/ui/Badge";
import { LEAD_STATUS_LABELS } from "@/lib/constants/statuses";
import { cn } from "@/lib/utils/cn";

import type { OpportunityStage } from "../types";

const STAGE_VARIANT: Record<
  OpportunityStage,
  "muted" | "info" | "warning" | "success" | "destructive" | "default"
> = {
  QUALIFIED: "info",
  DISCOVERY: "default",
  PROPOSAL: "warning",
  NEGOTIATION: "warning",
  WON: "success",
  LOST: "destructive",
};

export function OpportunityStageBadge({
  stage,
  className,
}: {
  stage: OpportunityStage;
  className?: string;
}) {
  return (
    <Badge variant={STAGE_VARIANT[stage]} size="sm" className={cn(className)}>
      {LEAD_STATUS_LABELS[stage]}
    </Badge>
  );
}
