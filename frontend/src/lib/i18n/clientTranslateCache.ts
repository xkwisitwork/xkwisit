import type { AppLocale } from "./locales";
import { toPidgin } from "./pidgin";

const MEMORY = new Map<string, string>();
const STORAGE_KEY = "xkwisit-i18n-cache-v1";
let storageHydrated = false;

function cacheKey(locale: AppLocale, text: string) {
  return `${locale}::${text}`;
}

function hydrateFromSession() {
  if (storageHydrated || typeof window === "undefined") return;
  storageHydrated = true;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Record<string, string>;
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "string" && value) MEMORY.set(key, value);
    }
  } catch {
    // ignore corrupt cache
  }
}

function persistToSession() {
  if (typeof window === "undefined") return;
  try {
    const obj: Record<string, string> = {};
    let i = 0;
    for (const [key, value] of MEMORY) {
      obj[key] = value;
      i += 1;
      if (i >= 800) break; // keep session payload bounded
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  } catch {
    // quota / private mode
  }
}

export function getCachedTranslation(locale: AppLocale, text: string): string | null {
  hydrateFromSession();
  if (locale === "en") return text;
  if (locale === "pcm") return toPidgin(text);
  return MEMORY.get(cacheKey(locale, text)) ?? null;
}

export function setCachedTranslation(
  locale: AppLocale,
  text: string,
  translated: string,
) {
  if (locale === "en" || locale === "pcm") return;
  MEMORY.set(cacheKey(locale, text), translated);
}

export function setCachedTranslations(
  locale: AppLocale,
  pairs: Array<{ text: string; translated: string }>,
) {
  for (const pair of pairs) {
    setCachedTranslation(locale, pair.text, pair.translated);
  }
  persistToSession();
}

/** Resolve as many strings as possible from cache; return misses for network. */
export function resolveFromCache(
  locale: AppLocale,
  texts: string[],
): { resolved: Array<string | null>; misses: string[]; missIndexes: number[] } {
  hydrateFromSession();
  const resolved: Array<string | null> = new Array(texts.length).fill(null);
  const misses: string[] = [];
  const missIndexes: number[] = [];

  texts.forEach((text, index) => {
    const hit = getCachedTranslation(locale, text);
    if (hit != null) {
      resolved[index] = hit;
      return;
    }
    misses.push(text);
    missIndexes.push(index);
  });

  return { resolved, misses, missIndexes };
}
