import type { StatusTone } from "@/components/ui/Badge";
import { INVOICE_STATUS_LABELS, type InvoiceStatus } from "@/lib/constants/statuses";

import type { PaymentStatus } from "../types";

export function invoiceStatusLabel(status: InvoiceStatus): string {
  return INVOICE_STATUS_LABELS[status] ?? status;
}

export function invoiceStatusTone(status: InvoiceStatus): StatusTone {
  switch (status) {
    case "PAID":
      return "success";
    case "OVERDUE":
      return "destructive";
    case "PARTIALLY_PAID":
    case "VIEWED":
      return "warning";
    case "VOID":
      return "muted";
    case "SENT":
      return "info";
    default:
      return "default";
  }
}

export function paymentStatusLabel(status: PaymentStatus): string {
  return (
    {
      UNPAID: "Unpaid",
      PENDING: "Pending",
      PARTIAL: "Partial",
      PAID: "Paid",
      FAILED: "Failed",
      REFUNDED: "Refunded",
    } as const
  )[status];
}

export function paymentStatusTone(status: PaymentStatus): StatusTone {
  switch (status) {
    case "PAID":
      return "success";
    case "FAILED":
      return "destructive";
    case "PARTIAL":
    case "PENDING":
      return "warning";
    case "REFUNDED":
      return "muted";
    default:
      return "default";
  }
}
