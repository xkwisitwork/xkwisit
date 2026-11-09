"use client";

import { StatusBadge } from "@/components/ui/Badge";
import type { InvoiceStatus } from "@/lib/constants/statuses";

import { invoiceStatusLabel, invoiceStatusTone } from "../utils/invoiceLabels";

export function InvoiceStatusBadge({
  status,
  size = "sm",
}: {
  status: InvoiceStatus;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <StatusBadge tone={invoiceStatusTone(status)} size={size} dot>
      {invoiceStatusLabel(status)}
    </StatusBadge>
  );
}
