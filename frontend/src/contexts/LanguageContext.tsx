"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  APP_LOCALES,
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  isAppLocale,
  localeMeta,
  type AppLocale,
} from "@/lib/i18n/locales";

type LanguageContextValue = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
  locales: typeof APP_LOCALES;
  label: string;
  translateTexts: (texts: string[]) => Promise<string[]>;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

async function fetchTranslations(texts: string[], target: AppLocale) {
  if (target === "en" || !texts.length) return texts;

  const { resolveFromCache, setCachedTranslations } = await import(
    "@/lib/i18n/clientTranslateCache"
  );
  const { resolved, misses, missIndexes } = resolveFromCache(target, texts);
  const out = texts.map((text, i) => resolved[i] ?? text);

  if (!misses.length) return out;

  try {
    const unique = [...new Set(misses)];
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts: unique, target }),
    });
    const json = (await res.json()) as {
      success?: boolean;
      data?: { translations?: string[] };
    };
    if (!res.ok || !json.success || !json.data?.translations) return out;

    const byText = new Map<string, string>();
    unique.forEach((text, i) => {
      byText.set(text, json.data!.translations![i] || text);
    });
    setCachedTranslations(
      target,
      unique.map((text) => ({
        text,
        translated: byText.get(text) || text,
      })),
    );
    missIndexes.forEach((index) => {
      const source = texts[index]!;
      out[index] = byText.get(source) || source;
    });
    return out;
  } catch {
    return out;
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    const saved = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isAppLocale(saved)) setLocaleState(saved);
  }, []);

  useEffect(() => {
    const meta = localeMeta(locale);
    document.documentElement.lang = meta.htmlLang;
  }, [locale]);

  const setLocale = useCallback((next: AppLocale) => {
    setLocaleState(next);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
  }, []);

  const translateTexts = useCallback(
    (texts: string[]) => fetchTranslations(texts, locale),
    [locale],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      locales: APP_LOCALES,
      label: localeMeta(locale).label,
      translateTexts,
    }),
    [locale, setLocale, translateTexts],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
