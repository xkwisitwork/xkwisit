import { NextResponse } from "next/server";

import {
  isAppLocale,
  translateTarget,
  type AppLocale,
} from "@/lib/i18n/locales";
import { toPidgin } from "@/lib/i18n/pidgin";

export const runtime = "nodejs";

type Body = {
  texts?: unknown;
  target?: unknown;
};

const cache = new Map<string, string>();
const CONCURRENCY = 10;

async function mapPool<T, R>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;

  async function run() {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await worker(items[index]!, index);
    }
  }

  const runners = Array.from({ length: Math.min(limit, items.length) }, () =>
    run(),
  );
  await Promise.all(runners);
  return results;
}

function googleLang(target: AppLocale): string {
  return translateTarget(target);
}

/** Google gtx — broader coverage for ig/yo/ha/zh/fr than MyMemory. */
async function translateGoogle(text: string, target: AppLocale): Promise<string | null> {
  const tl = googleLang(target);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(tl)}&dt=t&q=${encodeURIComponent(text.slice(0, 900))}`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0 (compatible; XkwisitTranslate/1.0)",
    },
    next: { revalidate: 60 * 60 * 24 },
  });
  if (!res.ok) return null;

  const data = (await res.json()) as unknown;
  // Shape: [[["translated","source",...], ...], ...]
  if (!Array.isArray(data) || !Array.isArray(data[0])) return null;
  const parts = (data[0] as unknown[])
    .map((row) => (Array.isArray(row) && typeof row[0] === "string" ? row[0] : ""))
    .filter(Boolean);
  const translated = parts.join("").trim();
  if (!translated) return null;
  return translated;
}

async function translateMyMemory(text: string, target: AppLocale): Promise<string | null> {
  const pair = `en|${translateTarget(target)}`;
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 450))}&langpair=${encodeURIComponent(pair)}`;

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 60 * 60 * 24 },
  });
  if (!res.ok) return null;

  const data = (await res.json()) as {
    responseData?: { translatedText?: string };
    responseStatus?: number | string;
  };
  const translated = data.responseData?.translatedText?.trim();
  const status = Number(data.responseStatus);
  if (!translated || (status && status !== 200)) return null;
  if (/QUERY LENGTH LIMIT/i.test(translated)) return null;
  return translated;
}

async function translateOne(text: string, target: AppLocale): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed || target === "en") return text;

  const cacheKey = `${target}::${trimmed}`;
  const hit = cache.get(cacheKey);
  if (hit) return hit;

  if (target === "pcm") {
    const pidgin = toPidgin(trimmed);
    cache.set(cacheKey, pidgin);
    return pidgin;
  }

  try {
    const google = await translateGoogle(trimmed, target);
    if (google) {
      cache.set(cacheKey, google);
      return google;
    }
  } catch {
    // fall through
  }

  try {
    const memory = await translateMyMemory(trimmed, target);
    if (memory) {
      cache.set(cacheKey, memory);
      return memory;
    }
  } catch {
    // fall through
  }

  return text;
}

/**
 * POST /api/translate
 * Body: { texts: string[], target: AppLocale }
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;
    const targetRaw = typeof body.target === "string" ? body.target : "en";
    if (!isAppLocale(targetRaw)) {
      return NextResponse.json(
        { success: false, error: { message: "Unsupported language." } },
        { status: 400 },
      );
    }

    const texts = Array.isArray(body.texts)
      ? body.texts.filter((t): t is string => typeof t === "string").slice(0, 120)
      : [];

    if (!texts.length) {
      return NextResponse.json({ success: true, data: { translations: [] } });
    }

    const unique: string[] = [];
    const firstIndex = new Map<string, number>();
    for (const text of texts) {
      if (!firstIndex.has(text)) {
        firstIndex.set(text, unique.length);
        unique.push(text);
      }
    }

    const uniqueTranslated = await mapPool(unique, CONCURRENCY, (text) =>
      translateOne(text, targetRaw),
    );

    const translations = texts.map((text) => {
      const idx = firstIndex.get(text)!;
      return uniqueTranslated[idx] || text;
    });

    return NextResponse.json({ success: true, data: { translations } });
  } catch {
    return NextResponse.json(
      { success: false, error: { message: "Translate failed." } },
      { status: 500 },
    );
  }
}
