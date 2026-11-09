import type { StatusTone } from "@/components/ui/Badge";
import { APPROVAL_STATUS_LABELS, type ApprovalStatus } from "@/lib/constants/statuses";

import type { ApprovalPriority, ApprovalResourceType } from "../types";

export function approvalStatusLabel(status: ApprovalStatus): string {
  return APPROVAL_STATUS_LABELS[status] ?? status;
}

export function approvalStatusTone(status: ApprovalStatus): StatusTone {
  switch (status) {
    case "APPROVED":
      return "success";
    case "REJECTED":
      return "destructive";
    case "CHANGES_REQUESTED":
      return "warning";
    case "PENDING":
    default:
      return "info";
  }
}

export function approvalPriorityLabel(priority: ApprovalPriority): string {
  return (
    {
      LOW: "Low",
      NORMAL: "Normal",
      HIGH: "High",
      URGENT: "Urgent",
    } as const
  )[priority];
}

export function approvalPriorityTone(priority: ApprovalPriority): StatusTone {
  switch (priority) {
    case "URGENT":
      return "destructive";
    case "HIGH":
      return "warning";
    case "LOW":
      return "muted";
    default:
      return "default";
  }
}

export function approvalResourceLabel(type: ApprovalResourceType): string {
  return (
    {
      CONTENT: "Content",
      CREATIVE: "Creative",
      PROPOSAL: "Proposal",
      CONTRACT: "Contract",
      BRAND_ASSET: "Brand asset",
      CAMPAIGN: "Campaign",
      DELIVERABLE: "Deliverable",
      INVOICE: "Invoice",
      OTHER: "Other",
    } as const
  )[type];
}
