/**
 * Currency formatting helpers.
 * Default currency is Nigerian Naira (₦) - the primary market for Xkwisit.
 */

export type SupportedCurrency = "NGN" | "USD" | "GBP" | "EUR";

const DEFAULT_CURRENCY: SupportedCurrency = "NGN";
const DEFAULT_LOCALE = "en-NG";

/**
 * Formats a number as currency.
 * formatCurrency(8400000) → "₦8,400,000"
 * formatCurrency(8400000, { compact: true }) → "₦8.4M"
 */
export function formatCurrency(
  value: number,
  options: {
    currency?: SupportedCurrency;
    locale?: string;
    compact?: boolean;
    showSymbol?: boolean;
    fractionDigits?: number;
  } = {},
): string {
  const {
    currency = DEFAULT_CURRENCY,
    locale = DEFAULT_LOCALE,
    compact = false,
    showSymbol = true,
    fractionDigits,
  } = options;

  if (!Number.isFinite(value)) return showSymbol ? "₦0" : "0";

  const formatter = new Intl.NumberFormat(locale, {
    style: showSymbol ? "currency" : "decimal",
    currency,
    notation: compact ? "compact" : "standard",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits ?? (compact ? 1 : 2),
  });

  return formatter.format(value);
}

/**
 * Compact form. ₦8,400,000 → "₦8.4M"
 * Useful for stat cards and dashboard KPIs.
 */
export function formatCurrencyCompact(
  value: number,
  currency: SupportedCurrency = DEFAULT_CURRENCY,
): string {
  return formatCurrency(value, { currency, compact: true });
}

/**
 * Parses a currency string into a number.
 * "₦8,400,000" → 8400000
 * "8.4M" → 8400000
 */
export function parseCurrency(value: string): number {
  if (!value) return 0;

  const cleaned = value.replace(/[₦$£€,\s]/g, "").replace(/[^\d.\-kKmMbB]/g, "");

  const multipliers: Record<string, number> = {
    k: 1_000,
    K: 1_000,
    m: 1_000_000,
    M: 1_000_000,
    b: 1_000_000_000,
    B: 1_000_000_000,
  };

  const lastChar = cleaned.slice(-1);
  const multiplier = multipliers[lastChar];

  if (multiplier) {
    const numeric = Number.parseFloat(cleaned.slice(0, -1));

    return Number.isFinite(numeric) ? numeric * multiplier : 0;
  }

  const numeric = Number.parseFloat(cleaned);

  return Number.isFinite(numeric) ? numeric : 0;
}

/**
 * Returns the currency symbol for a supported currency.
 */
export function getCurrencySymbol(
  currency: SupportedCurrency = DEFAULT_CURRENCY,
): string {
  const symbols: Record<SupportedCurrency, string> = {
    NGN: "₦",
    USD: "$",
    GBP: "£",
    EUR: "€",
  };

  return symbols[currency];
}

/**
 * Calculates a percentage change between two values.
 * calculateDelta(100, 120) → { value: 20, direction: "up", percent: 20 }
 * calculateDelta(100, 80) → { value: -20, direction: "down", percent: -20 }
 */
export function calculateDelta(
  previous: number,
  current: number,
): {
  value: number;
  direction: "up" | "down" | "flat";
  percent: number;
} {
  const value = current - previous;

  if (previous === 0) {
    return {
      value,
      direction: value > 0 ? "up" : value < 0 ? "down" : "flat",
      percent: value === 0 ? 0 : 100,
    };
  }

  const percent = (value / Math.abs(previous)) * 100;

  return {
    value,
    direction: percent > 0 ? "up" : percent < 0 ? "down" : "flat",
    percent,
  };
}

/**
 * Returns the return on ad spend (ROAS).
 * calculateRoas(4800000, 1200000) → 4
 */
export function calculateRoas(revenue: number, spend: number): number {
  if (!spend || spend === 0) return 0;

  return revenue / spend;
}
