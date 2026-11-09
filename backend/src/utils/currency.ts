import type { Money } from "../types/common.types.js";

const symbols: Record<Money["currency"], string> = {
  NGN: "₦",
  USD: "$",
  GBP: "£",
  EUR: "€",
};

export function formatMoney(money: Money, locale = "en-NG"): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: money.currency,
      maximumFractionDigits: 2,
    }).format(money.amount);
  } catch {
    return `${symbols[money.currency] ?? ""}${money.amount.toFixed(2)}`;
  }
}

export function toMoney(amount: number, currency: Money["currency"] = "NGN"): Money {
  return { amount, currency };
}
