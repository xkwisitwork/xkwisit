import {
  lookupPidginPhrase,
  normalizePidginKey,
  PIDGIN_FRAGMENTS,
} from "./dictionary";

/**
 * Proper English → Naija Pidgin for Xkwisit.
 * Order: curated phrase → long fragments → grammar rewrite.
 */

function preserveCase(sample: string, translated: string): string {
  if (!translated) return translated;
  if (sample === sample.toUpperCase() && sample.length > 2) {
    return translated.toUpperCase();
  }
  if (sample[0] && sample[0] === sample[0].toUpperCase()) {
    return translated.charAt(0).toUpperCase() + translated.slice(1);
  }
  return translated;
}

function applyFragments(text: string): string {
  let out = text;
  const sorted = [...PIDGIN_FRAGMENTS].sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of sorted) {
    const re = new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
    out = out.replace(re, (match) => preserveCase(match, to));
  }
  return out;
}

/**
 * Structural Naija Pidgin grammar — not a dictionary dump.
 * Handles relative clauses, aspect markers, negation, copula, and common lexicon.
 */
function applyGrammar(text: string): string {
  let out = text;

  // Relative clauses: that / which / who → wey
  out = out.replace(/\b(that|which|who)\b/gi, "wey");

  // Progressive / continuous
  out = out.replace(/\b(am|is|are|was|were)\s+(\w+)ing\b/gi, "dey $2");
  out = out.replace(/\b(am|is|are)\s+not\s+(\w+)ing\b/gi, "no dey $2");

  // Future / intention
  out = out.replace(/\b(will|shall|'ll)\s+/gi, "go ");
  out = out.replace(/\b(going to|gonna)\b/gi, "go");
  out = out.replace(/\bwant to\b/gi, "wan");
  out = out.replace(/\bwants to\b/gi, "wan");
  out = out.replace(/\bneed to\b/gi, "need to");
  out = out.replace(/\bhave to\b/gi, "gats");
  out = out.replace(/\bhas to\b/gi, "gats");
  out = out.replace(/\bmust\b/gi, "gats");
  out = out.replace(/\bshould\b/gi, "suppose");
  out = out.replace(/\bcan\b/gi, "fit");
  out = out.replace(/\bcannot\b/gi, "no fit");
  out = out.replace(/\bcan't\b/gi, "no fit");
  out = out.replace(/\bcould\b/gi, "fit");

  // Negation
  out = out.replace(/\b(do not|does not|did not|don't|doesn't|didn't)\b/gi, "no");
  out = out.replace(/\b(is not|are not|am not|isn't|aren't|ain't)\b/gi, "no be");
  out = out.replace(/\b(has not|have not|hasn't|haven't)\b/gi, "neva");
  out = out.replace(/\bnever\b/gi, "neva");

  // Copula / existential
  out = out.replace(/\bthere is\b/gi, "e get");
  out = out.replace(/\bthere are\b/gi, "dem get");
  out = out.replace(/\bthis is\b/gi, "dis na");
  out = out.replace(/\bthat is\b/gi, "dat na");
  out = out.replace(/\bit is\b/gi, "e be");
  out = out.replace(/\bit's\b/gi, "e be");
  out = out.replace(/\bI am\b/gi, "I be");
  out = out.replace(/\bI'm\b/gi, "I dey");
  out = out.replace(/\byou are\b/gi, "you be");
  out = out.replace(/\byou're\b/gi, "you dey");
  out = out.replace(/\bwe are\b/gi, "we be");
  out = out.replace(/\bwe're\b/gi, "we dey");
  out = out.replace(/\bthey are\b/gi, "dem be");
  out = out.replace(/\bthey're\b/gi, "dem dey");
  out = out.replace(/\bhe is\b/gi, "e be");
  out = out.replace(/\bshe is\b/gi, "e be");
  out = out.replace(/\bhe's\b/gi, "e dey");
  out = out.replace(/\bshe's\b/gi, "e dey");

  // Determiners / pronouns
  out = out.replace(/\bthe\b/gi, "di");
  out = out.replace(/\bthis\b/gi, "dis");
  out = out.replace(/\bthese\b/gi, "dis");
  out = out.replace(/\bthat\b/gi, "dat");
  out = out.replace(/\bthose\b/gi, "dose");
  out = out.replace(/\bwith\b/gi, "wit");
  out = out.replace(/\bwithout\b/gi, "witout");
  out = out.replace(/\bbecause\b/gi, "because");
  out = out.replace(/\bif\b/gi, "if");
  out = out.replace(/\blet's\b/gi, "make we");
  out = out.replace(/\blet us\b/gi, "make we");
  out = out.replace(/\bpeople\b/gi, "pipo");
  out = out.replace(/\bproblem\b/gi, "wahala");
  out = out.replace(/\bproblems\b/gi, "wahala");
  out = out.replace(/\bmoney\b/gi, "moni");
  out = out.replace(/\bchild\b/gi, "pikin");
  out = out.replace(/\bchildren\b/gi, "pikin dem");
  out = out.replace(/\bfriend\b/gi, "padi");
  out = out.replace(/\bfriends\b/gi, "padi dem");
  out = out.replace(/\bplease\b/gi, "abeg");
  out = out.replace(/\bhello\b/gi, "how far");
  out = out.replace(/\bwhat is\b/gi, "wetin be");
  out = out.replace(/\bwhat's\b/gi, "wetin be");
  out = out.replace(/\bwhat\b/gi, "wetin");
  out = out.replace(/\bhow much\b/gi, "how much");
  out = out.replace(/\bhow many\b/gi, "how many");
  out = out.replace(/\blook at\b/gi, "check");
  out = out.replace(/\blook\b/gi, "see");
  out = out.replace(/\bspeak\b/gi, "yarn");
  out = out.replace(/\btalk to\b/gi, "yarn wit");
  out = out.replace(/\btalk\b/gi, "yarn");
  out = out.replace(/\bbroken\b/gi, "spoil");
  out = out.replace(/\bguessing\b/gi, "to dey guess");
  out = out.replace(/\bvery\b/gi, "well well");
  out = out.replace(/\breally\b/gi, "sef");
  out = out.replace(/\bthem\b/gi, "dem");
  out = out.replace(/\bthey\b/gi, "dem");
  // Locative “in/on/at” → “for” (Naija), keep brand/product tokens alone
  out = out.replace(/\bin\b/gi, "for");
  out = out.replace(/\bon\b/gi, "for");
  out = out.replace(/\bat\b/gi, "for");

  // Clean doubled particles / awkward sequences from stacked rules
  out = out.replace(/\bno no\b/gi, "no");
  out = out.replace(/\bdey dey\b/gi, "dey");
  out = out.replace(/\bgo go\b/gi, "go");
  out = out.replace(/\bdi di\b/gi, "di");
  out = out.replace(/\s+/g, " ").trim();

  return out;
}

/**
 * Headline-style cleft: “Growth System wey …” → “Na system wey … be this”
 * Only when the line still reads like English headline after fragment pass.
 */
function maybeCleftHeadline(text: string): string {
  const soft = text.trim();
  if (soft.length > 120) return text;

  // Already Pidgin cleft
  if (/^na\b/i.test(soft)) return text;

  // “X wey Y” headline without leading Na
  const m = soft.match(/^([A-Z][\w\s-]{2,40}?)\s+wey\s+(.+)$/i);
  if (m) {
    const head = m[1]!.trim();
    const rest = m[2]!.trim().replace(/[。.]$/, "");
    // Prefer shorter generic "system" phrasing when head is product-y
    if (/growth\s+system/i.test(head)) {
      return `Na system wey ${rest.replace(/^dey\s+/i, "dey ")} be this`;
    }
    return `Na ${head.toLowerCase()} wey ${rest} be this`;
  }
  return text;
}

/**
 * Translate one English string into natural Naija Pidgin.
 */
export function toPidgin(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return text;

  // 1) Exact curated phrase
  const exact = lookupPidginPhrase(trimmed);
  if (exact) {
    // Preserve surrounding whitespace from original
    const lead = text.match(/^\s*/)?.[0] ?? "";
    const trail = text.match(/\s*$/)?.[0] ?? "";
    return `${lead}${exact}${trail}`;
  }

  // 2) Long fragment replacements (covers split headlines)
  let out = applyFragments(trimmed);

  // If fragments already produced the full curated hero line, stop
  if (
    normalizePidginKey(out) ===
    normalizePidginKey(
      "Na system wey dey show wetin dey spoil for your business be this",
    )
  ) {
    const lead = text.match(/^\s*/)?.[0] ?? "";
    const trail = text.match(/\s*$/)?.[0] ?? "";
    return `${lead}${out}${trail}`;
  }

  // 3) Grammar rewrite
  out = applyGrammar(out);
  out = maybeCleftHeadline(out);

  const lead = text.match(/^\s*/)?.[0] ?? "";
  const trail = text.match(/\s*$/)?.[0] ?? "";
  return `${lead}${out}${trail}`;
}

/** @deprecated Use toPidgin — kept for older imports */
export function toPidginApprox(text: string): string {
  return toPidgin(text);
}
