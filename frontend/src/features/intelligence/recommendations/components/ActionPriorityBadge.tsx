"use client";

import { StatusBadge } from "@/components/ui/Badge";

import type { ActionPriority } from "../../types";
import { actionPriorityTone } from "../utils/nextBestActions";

export function ActionPriorityBadge({ priority }: { priority: ActionPriority }) {
  return (
    <StatusBadge tone={actionPriorityTone(priority)} size="sm">
      {priority}
    </StatusBadge>
  );
}
