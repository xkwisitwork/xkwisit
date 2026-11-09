"use client";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { INVOICE_STATUSES, type InvoiceStatus } from "@/lib/constants/statuses";

import type { InvoiceFilterState, PaymentStatus } from "../types";
import { invoiceStatusLabel, paymentStatusLabel } from "../utils/invoiceLabels";

const PAYMENT_STATUSES: PaymentStatus[] = [
  "UNPAID",
  "PENDING",
  "PARTIAL",
  "PAID",
  "FAILED",
  "REFUNDED",
];

export type InvoiceFiltersProps = {
  filters: InvoiceFilterState;
  activeCount: number;
  onUpdate: <K extends keyof InvoiceFilterState>(
    key: K,
    value: InvoiceFilterState[K],
  ) => void;
  onReset: () => void;
};

export function InvoiceFilters({
  filters,
  activeCount,
  onUpdate,
  onReset,
}: InvoiceFiltersProps) {
  const toggleStatus = (status: InvoiceStatus) => {
    const next = filters.statuses.includes(status)
      ? filters.statuses.filter((s) => s !== status)
      : [...filters.statuses, status];
    onUpdate("statuses", next);
  };

  const togglePayment = (status: PaymentStatus) => {
    const next = filters.paymentStatuses.includes(status)
      ? filters.paymentStatuses.filter((s) => s !== status)
      : [...filters.paymentStatuses, status];
    onUpdate("paymentStatuses", next);
  };

  return (
    <div className="space-y-3 rounded-2xl border border-neutral-400 bg-neutral-100 p-4">
      <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
          <Input
            value={filters.search}
            onChange={(e) => onUpdate("search", e.target.value)}
            placeholder="Search by number or client…"
            className="pl-9"
          />
        </div>
        <Button
          variant={filters.overdueOnly ? "contained" : "outlined"}
          size="sm"
          onClick={() => onUpdate("overdueOnly", !filters.overdueOnly)}
        >
          Overdue only
        </Button>
        {activeCount > 0 ? (
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<X className="h-4 w-4" />}
            onClick={onReset}
          >
            Clear ({activeCount})
          </Button>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(INVOICE_STATUSES) as InvoiceStatus[]).map((status) => {
          const active = filters.statuses.includes(status);
          return (
            <button
              key={status}
              type="button"
              onClick={() => toggleStatus(status)}
              className={`rounded-full px-3 py-1 text-300 ${
                active
                  ? "bg-mint text-white"
                  : "bg-white text-neutral-700 ring-1 ring-neutral-400"
              }`}
            >
              {invoiceStatusLabel(status)}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        {PAYMENT_STATUSES.map((status) => {
          const active = filters.paymentStatuses.includes(status);
          return (
            <button
              key={status}
              type="button"
              onClick={() => togglePayment(status)}
              className={`rounded-full px-3 py-1 text-300 ${
                active
                  ? "bg-neutral-900 text-white"
                  : "bg-white text-neutral-700 ring-1 ring-neutral-400"
              }`}
            >
              {paymentStatusLabel(status)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
