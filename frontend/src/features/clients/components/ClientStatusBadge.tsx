import { StatusBadge, type StatusTone } from "@/components/ui/Badge";
import type { ClientStatus } from "../types";

const labels: Record<ClientStatus, string> = {
  ACTIVE: "Active",
  PAUSED: "Paused",
  CHURNED: "Churned",
  PROSPECT: "Prospect",
  ARCHIVED: "Archived",
};

const tones: Record<ClientStatus, StatusTone> = {
  ACTIVE: "success",
  PAUSED: "warning",
  CHURNED: "destructive",
  PROSPECT: "info",
  ARCHIVED: "muted",
};

export function ClientStatusBadge({ status }: { status: ClientStatus }) {
  return <StatusBadge tone={tones[status]}>{labels[status]}</StatusBadge>;
}
