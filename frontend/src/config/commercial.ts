import type { SupportedCurrency } from "@/lib/utils/currency";

/**
 * Public commercial terms.
 * Naira amounts stay the published prices. Rates are indicative so a
 * visitor can read the same fee in another currency. They are not a bank quote.
 */

export const ENGAGEMENT_DAYS = 90;

/** Lowest published starting fee (Growth Starter). Work cannot start below this. */
export const MINIMUM_START_NGN = 900_000;

/** Share of the fee for work that has not been delivered. */
export const REFUND_PERCENT_OF_UNDELIVERED = 100;

/** How many naira buy one unit of that currency. */
export const NGN_PER_UNIT: Record<SupportedCurrency, number> = {
  NGN: 1,
  USD: 1600,
  GBP: 2100,
  EUR: 1750,
};

export const CURRENCY_OPTIONS: { code: SupportedCurrency; label: string }[] = [
  { code: "NGN", label: "NGN ₦" },
  { code: "USD", label: "USD $" },
  { code: "GBP", label: "GBP £" },
  { code: "EUR", label: "EUR €" },
];

export function fromNgn(amountNgn: number, currency: SupportedCurrency): number {
  const perUnit = NGN_PER_UNIT[currency] || 1;
  return amountNgn / perUnit;
}

export function toNgn(amount: number, currency: SupportedCurrency): number {
  return amount * (NGN_PER_UNIT[currency] || 1);
}
