"use client";

import { StatusBadge } from "@/components/ui/Badge";
import type { ContractStatus } from "@/lib/constants/statuses";

function tone(status: ContractStatus) {
  if (status === "SIGNED") return "success" as const;
  if (status === "VOID" || status === "EXPIRED") return "destructive" as const;
  if (status === "SENT" || status === "VIEWED") return "info" as const;
  return "muted" as const;
}

export function ContractStatusBadge({ status }: { status: ContractStatus }) {
  return (
    <StatusBadge tone={tone(status)} size="sm">
      {status}
    </StatusBadge>
  );
}
