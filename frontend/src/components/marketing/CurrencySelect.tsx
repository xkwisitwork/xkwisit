"use client";

import { CURRENCY_OPTIONS } from "@/config/commercial";
import { useCurrency } from "@/contexts/CurrencyContext";

export function CurrencySelect() {
  const { currency, setCurrency } = useCurrency();

  return (
    <label className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-neutral-700">
      <span className="sr-only">Currency</span>
      <select
        value={currency}
        onChange={(event) => setCurrency(event.target.value as typeof currency)}
        aria-label="Currency. Amounts convert from naira at an indicative rate."
        className="h-9 rounded-full border border-neutral-300 bg-white px-2.5 text-[0.75rem] font-semibold text-[#16024A] outline-none focus:border-[#3B05C4]"
      >
        {CURRENCY_OPTIONS.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
