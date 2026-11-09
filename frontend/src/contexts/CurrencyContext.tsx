"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { fromNgn } from "@/config/commercial";
import { formatCurrency, type SupportedCurrency } from "@/lib/utils/currency";

const STORAGE_KEY = "xkwisit-currency";

type CurrencyContextValue = {
  currency: SupportedCurrency;
  setCurrency: (currency: SupportedCurrency) => void;
  formatFromNgn: (amountNgn: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

function isCurrency(value: string | null): value is SupportedCurrency {
  return value === "NGN" || value === "USD" || value === "GBP" || value === "EUR";
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<SupportedCurrency>("NGN");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isCurrency(saved)) setCurrencyState(saved);
  }, []);

  const value = useMemo<CurrencyContextValue>(() => {
    return {
      currency,
      setCurrency: (next) => {
        setCurrencyState(next);
        window.localStorage.setItem(STORAGE_KEY, next);
      },
      formatFromNgn: (amountNgn) => {
        const converted = fromNgn(amountNgn, currency);
        const fractionDigits = currency === "NGN" ? 0 : converted >= 100 ? 0 : 2;
        return formatCurrency(converted, { currency, fractionDigits });
      },
    };
  }, [currency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return ctx;
}
