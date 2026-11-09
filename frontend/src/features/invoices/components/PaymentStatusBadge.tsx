"use client";

import { StatusBadge } from "@/components/ui/Badge";

import type { PaymentStatus } from "../types";
import { paymentStatusLabel, paymentStatusTone } from "../utils/invoiceLabels";

export function PaymentStatusBadge({
  status,
  size = "sm",
}: {
  status: PaymentStatus;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <StatusBadge tone={paymentStatusTone(status)} size={size} dot>
      {paymentStatusLabel(status)}
    </StatusBadge>
  );
}
