import { StatusBadge, type StatusTone } from "@/components/ui/Badge";
import { LEAD_STATUS_LABELS, type LeadStatus } from "@/lib/constants/statuses";

const toneMap: Record<LeadStatus, StatusTone> = {
  NEW: "info",
  CONTACTED: "default",
  QUALIFIED: "info",
  DISCOVERY: "info",
  PROPOSAL: "warning",
  NEGOTIATION: "warning",
  WON: "success",
  LOST: "destructive",
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return <StatusBadge tone={toneMap[status]}>{LEAD_STATUS_LABELS[status]}</StatusBadge>;
}
