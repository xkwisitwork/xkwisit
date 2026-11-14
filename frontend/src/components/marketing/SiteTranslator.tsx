"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { useLanguage } from "@/contexts/LanguageContext";
import type { AppLocale } from "@/lib/i18n/locales";
import {
  resolveFromCache,
  setCachedTranslations,
} from "@/lib/i18n/clientTranslateCache";
import { lookupPidginPhrase, toPidgin } from "@/lib/i18n/pidgin";

const SKIP_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "CODE",
  "PRE",
  "TEXTAREA",
  "INPUT",
  "SELECT",
  "OPTION",
  "SVG",
  "PATH",
]);

const BLOCK_SELECTOR =
  "h1, h2, h3, h4, h5, h6, p, button, a, li, label, figcaption";

type TextNodeRecord = {
  node: Text;
  original: string;
  parentBlock: Element | null;
};

function closestBlock(el: Element | null): Element | null {
  if (!el) return null;
  return el.closest(BLOCK_SELECTOR);
}

function collectTextNodes(root: HTMLElement): TextNodeRecord[] {
  const out: TextNodeRecord[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (parent.closest("[data-no-translate], [data-voice-guide]")) {
        return NodeFilter.FILTER_REJECT;
      }
      const text = node.nodeValue?.trim() ?? "";
      if (!text || text.length < 2) return NodeFilter.FILTER_REJECT;
      if (/^[\d\s.,:%$€£₦+/−-]+$/.test(text)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let current = walker.nextNode();
  while (current) {
    const textNode = current as Text;
    const original =
      (textNode as Text & { __xkwOriginal?: string }).__xkwOriginal ??
      textNode.nodeValue ??
      "";
    (textNode as Text & { __xkwOriginal?: string }).__xkwOriginal = original;
    out.push({
      node: textNode,
      original,
      parentBlock: closestBlock(textNode.parentElement),
    });
    current = walker.nextNode();
  }
  return out;
}

function applyPidginBlockPhrases(nodes: TextNodeRecord[]) {
  const groups = new Map<Element, TextNodeRecord[]>();
  for (const record of nodes) {
    if (!record.parentBlock) continue;
    const list = groups.get(record.parentBlock) ?? [];
    list.push(record);
    groups.set(record.parentBlock, list);
  }

  const consumed = new Set<Text>();

  for (const [, group] of groups) {
    if (group.length < 2) continue;
    const joined = group
      .map((g) => g.original.replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    const phrase = lookupPidginPhrase(joined);
    if (!phrase) continue;

    const [first, ...rest] = group;
    if (!first) continue;
    first.node.nodeValue = phrase;
    consumed.add(first.node);
    for (const extra of rest) {
      extra.node.nodeValue = "";
      consumed.add(extra.node);
    }
  }

  return consumed;
}

async function fetchMisses(
  texts: string[],
  target: AppLocale,
): Promise<string[]> {
  if (!texts.length) return [];
  const res = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texts, target }),
  });
  const json = (await res.json()) as {
    success?: boolean;
    data?: { translations?: string[] };
  };
  if (!res.ok || !json.success || !json.data?.translations) return texts;
  return json.data.translations.map((t, i) => t || texts[i] || "");
}

/**
 * Instant language switch: cache-first paint, then parallel fill for misses.
 * English / Pidgin resolve locally in the same frame.
 */
export function SiteTranslator() {
  const { locale } = useLanguage();
  const pathname = usePathname();
  const runIdRef = useRef(0);

  useEffect(() => {
    const root =
      document.querySelector("[data-marketing-shell]") ||
      document.querySelector("main");
    if (!root) return;

    const runId = ++runIdRef.current;
    let cancelled = false;

    const apply = async () => {
      const nodes = collectTextNodes(root as HTMLElement);

      // English — restore originals immediately
      if (locale === "en") {
        for (const { node, original } of nodes) {
          if (node.nodeValue !== original) node.nodeValue = original;
        }
        return;
      }

      // Pidgin — local grammar, same-frame
      if (locale === "pcm") {
        const consumed = applyPidginBlockPhrases(nodes);
        for (const record of nodes) {
          if (consumed.has(record.node)) continue;
          const next = toPidgin(record.original);
          if (record.node.nodeValue !== next) record.node.nodeValue = next;
        }
        return;
      }

      const originals = nodes.map((n) => n.original);
      const { resolved, misses, missIndexes } = resolveFromCache(
        locale,
        originals,
      );

      // 1) Cache hits → new language. Misses → restore English first
      //    (avoids leaving the previous language stuck on screen).
      nodes.forEach((record, index) => {
        const hit = resolved[index];
        const next = hit ?? record.original;
        if (record.node.nodeValue !== next) record.node.nodeValue = next;
      });

      if (!misses.length || cancelled || runId !== runIdRef.current) return;

      const vh = typeof window !== "undefined" ? window.innerHeight : 800;
      const rankedMissIndexes = [...missIndexes].sort((a, b) => {
        const aTop =
          nodes[a]?.node.parentElement?.getBoundingClientRect().top ?? 9999;
        const bTop =
          nodes[b]?.node.parentElement?.getBoundingClientRect().top ?? 9999;
        const aVisible = aTop < vh * 1.15 ? 0 : 1;
        const bVisible = bTop < vh * 1.15 ? 0 : 1;
        if (aVisible !== bVisible) return aVisible - bVisible;
        return aTop - bTop;
      });

      const paintMisses = (
        indexes: number[],
        byText: Map<string, string>,
      ) => {
        for (const nodeIndex of indexes) {
          const record = nodes[nodeIndex];
          if (!record) continue;
          const next = byText.get(record.original) || record.original;
          if (record.node.nodeValue !== next) record.node.nodeValue = next;
        }
      };

      // 2) Visible copy first (fast perceived switch), then the rest
      const visibleIndexes = rankedMissIndexes.filter((idx) => {
        const top =
          nodes[idx]?.node.parentElement?.getBoundingClientRect().top ?? 9999;
        return top < vh * 1.15;
      });
      const restIndexes = rankedMissIndexes.filter(
        (idx) => !visibleIndexes.includes(idx),
      );

      const runChunk = async (indexes: number[]) => {
        if (!indexes.length || cancelled || runId !== runIdRef.current) return;
        const chunkTexts = indexes.map((i) => nodes[i]!.original);
        const unique = [...new Set(chunkTexts)];
        const uniqueTranslated = await fetchMisses(unique, locale);
        if (cancelled || runId !== runIdRef.current) return;

        const byText = new Map<string, string>();
        unique.forEach((text, i) => {
          byText.set(text, uniqueTranslated[i] || text);
        });
        setCachedTranslations(
          locale,
          unique.map((text) => ({
            text,
            translated: byText.get(text) || text,
          })),
        );
        paintMisses(indexes, byText);
      };

      try {
        await runChunk(visibleIndexes);
        if (cancelled || runId !== runIdRef.current) return;
        await runChunk(restIndexes);
      } catch {
        // keep whatever we already painted
      }
    };

    // Kick off on the next frame so the locale UI updates first
    const raf = window.requestAnimationFrame(() => {
      void apply();
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
    };
  }, [locale, pathname]);

  return null;
}
