"use client";

import { formatCurrency } from "@/lib/utils/currency";

import type { Money } from "@/types/common";

export function OpportunityValue({
  value,
  probability,
  compact = true,
}: {
  value: Money;
  probability?: number;
  compact?: boolean;
}) {
  return (
    <div className="text-right">
      <p className="text-400 font-semibold tabular-nums text-neutral-900">
        {formatCurrency(value.amount, {
          currency: value.currency,
          compact,
          fractionDigits: compact ? 1 : 0,
        })}
      </p>
      {typeof probability === "number" ? (
        <p className="text-200 tabular-nums text-neutral-600">{probability}% likely</p>
      ) : null}
    </div>
  );
}
