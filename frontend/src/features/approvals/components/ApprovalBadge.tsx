"use client";

import { StatusBadge } from "@/components/ui/Badge";
import type { ApprovalStatus } from "@/lib/constants/statuses";

import { approvalStatusLabel, approvalStatusTone } from "../utils/approvalLabels";

export function ApprovalBadge({
  status,
  size = "sm",
}: {
  status: ApprovalStatus;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <StatusBadge tone={approvalStatusTone(status)} size={size} dot>
      {approvalStatusLabel(status)}
    </StatusBadge>
  );
}
