"use client";

import { ENGAGEMENT_DAYS } from "@/config/commercial";
import { useCurrency } from "@/contexts/CurrencyContext";

export function PackagePrice({ amountNgn }: { amountNgn: number }) {
  const { formatFromNgn } = useCurrency();

  if (amountNgn <= 0) {
    return (
      <p className="mt-4 font-display text-700 font-bold text-neutral-900">
        Custom
        <span className="ml-1 text-300 font-semibold text-neutral-600">
          / {ENGAGEMENT_DAYS} days
        </span>
      </p>
    );
  }

  return (
    <p className="mt-4 font-display text-700 font-bold text-neutral-900">
      {formatFromNgn(amountNgn)}
      <span className="ml-1 text-300 font-semibold text-neutral-600">
        / {ENGAGEMENT_DAYS} days
      </span>
    </p>
  );
}
