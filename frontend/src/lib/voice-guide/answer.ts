import {
  buildVoiceGuideKnowledge,
  type KnowledgeChunk,
  type VoiceGuideCta,
} from "./knowledge";
import { voiceFaq, type VoiceFaqEntry } from "./voiceFaq";

export type VoiceGuideAnswer = {
  reply: string;
  cta?: VoiceGuideCta;
  matchedId?: string;
};

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "can",
  "do",
  "does",
  "for",
  "guys",
  "how",
  "i",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "our",
  "please",
  "tell",
  "the",
  "this",
  "to",
  "us",
  "want",
  "what",
  "when",
  "where",
  "which",
  "who",
  "with",
  "you",
  "your",
]);

/** Light typo / speech-noise normalization for vague site questions. */
function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\b(ebste|webste|websit|web site|webiste)\b/g, "website")
    .replace(/\b(buid|biuld|bulid)\b/g, "build")
    .replace(/\b(aplication|aplications|appication|appications)\b/g, "application")
    .replace(/\b(apps?)\b/g, (m) => (m.startsWith("apps") ? "apps" : "app"))
    .replace(/\b(wat|wot)\b/g, "what")
    .replace(/\b(dis|diz)\b/g, "this")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(text: string) {
  return normalize(text)
    .split(" ")
    .filter((t) => t.length > 1);
}

function contentTokens(text: string) {
  return tokens(text).filter((t) => !STOPWORDS.has(t));
}

function phraseHit(query: string, phrase: string) {
  const q = normalize(query);
  const p = normalize(phrase);
  if (!p) return 0;
  if (q === p) return 28;
  if (q.includes(p) || p.includes(q)) return 18;

  // Fuzzy overlap must be driven by content words — not "do/you/what"
  const qContent = new Set(contentTokens(q));
  const pContent = contentTokens(p);
  if (!pContent.length) return 0;

  const overlap = pContent.filter((t) => qContent.has(t)).length;
  if (!overlap) return 0;

  const ratio = overlap / pContent.length;
  // Short phrases need a distinctive word (avoid “help” / “start” stealing answers)
  if (pContent.length === 1) {
    const only = pContent[0]!;
    return only.length >= 6 && qContent.has(only) ? 10 : 0;
  }
  if (pContent.length === 2) {
    return ratio === 1 && pContent.some((t) => t.length >= 5) ? 12 : 0;
  }
  if (ratio >= 0.8 && overlap >= 2) return 14;
  if (ratio >= 0.65 && overlap >= 2) return 9;
  return 0;
}

function capabilityAsk(q: string) {
  return /\b(do you|can you|do you guys|will you|are you|offer|provide|build|develop|make|create|help with)\b/.test(
    q,
  );
}

function scoreFaq(query: string, entry: VoiceFaqEntry) {
  const q = normalize(query);
  let score = 0;

  for (const phrase of entry.phrases) {
    score = Math.max(score, phraseHit(q, phrase));
  }

  for (const keyword of entry.keywords) {
    const k = normalize(keyword);
    if (!k) continue;
    if (q.includes(k)) score += k.length > 5 ? 4 : 2;
  }

  // Multi-word keyword pieces (mobile + app/application)
  if (entry.id === "web-development") {
    const mobile = /\bmobile\b/.test(q);
    const appish = /\b(app|apps|application|applications|ios|android)\b/.test(q);
    if (mobile && appish) score += 18;
    else if (appish && capabilityAsk(q)) score += 10;
    else if (mobile && capabilityAsk(q)) score += 8;
  }

  // Strong boost for vague “what is this website/site about” intents
  if (entry.aboutIntent) {
    const aboutShape =
      /\b(what|tell|explain)\b/.test(q) &&
      /\b(this|the)?\s*(website|site|platform|company|agency|xkwisit)\b/.test(q);
    const allAbout =
      /\b(all about|about)\b/.test(q) && /\b(website|site|ebste|web)\b/.test(q);
    const whatIsXkwisit = /\bwhat is xkwisit\b/.test(q) || /\bwho are you\b/.test(q);
    // Do NOT treat capability asks (“do you build…”) as about-site
    if ((aboutShape || allAbout || whatIsXkwisit) && !capabilityAsk(q)) {
      score += 30;
    } else if (capabilityAsk(q)) {
      score -= 10;
    }
  }

  // If a concrete service topic is named, don't let overview/about steal it
  if (
    entry.id === "about-site" ||
    entry.id === "services-overview" ||
    entry.id === "pricing"
  ) {
    if (
      /\b(crm|seo|branding|brand|paid media|automation|mobile|app|apps|application|website|web)\b/.test(
        q,
      )
    ) {
      score -= 10;
    }
  }

  return score;
}

function scoreChunk(query: string, chunk: KnowledgeChunk) {
  const q = normalize(query);
  if (!q) return 0;
  let score = 0;
  const qContent = new Set(contentTokens(q));

  for (const keyword of chunk.keywords) {
    const k = normalize(keyword);
    if (!k || STOPWORDS.has(k)) continue;
    if (q.includes(k)) score += k.length > 6 ? 4 : 2;
    // Token-level hit for multi-word keywords already covered by includes
  }

  const titleBits = contentTokens(chunk.title);
  for (const bit of titleBits) {
    if (qContent.has(bit)) score += 3;
  }

  if (chunk.id.startsWith("service-") && titleBits.some((bit) => qContent.has(bit))) {
    score += 8;
  }

  // Capability asks: boost service chunks that share distinctive nouns
  if (capabilityAsk(q) && chunk.id.startsWith("service-")) {
    const bodyBits = contentTokens(chunk.body).slice(0, 40);
    const hits = bodyBits.filter((b) => qContent.has(b) && b.length > 3);
    score += Math.min(12, hits.length * 3);
  }

  // Demote legacy concatenated about chunk if it still exists
  if (chunk.id === "about") score -= 20;
  return score;
}

function relatedServicesReply(query: string, ranked: { chunk: KnowledgeChunk; score: number }[]): VoiceGuideAnswer | null {
  const q = normalize(query);
  if (!capabilityAsk(q) && !/\b(service|services|offer|pricing|cost|price)\b/.test(q)) {
    return null;
  }

  // Need a real topical hit — not a lone stopword / generic verb score
  const usable = ranked.filter((r) => r.score >= 6).slice(0, 2);
  if (!usable.length) return null;

  const best = usable[0]!;
  return {
    reply: clipSpoken(best.chunk.body),
    cta: best.chunk.cta,
    matchedId: best.chunk.id,
  };
}

function offTopicReply(): VoiceGuideAnswer {
  return {
    reply:
      "I focus on Xkwisit — who we are, free checks, services (including web and mobile apps), pricing floors, and booking a call. What should I cover?",
    cta: { label: "Browse services", href: "/services" },
    matchedId: "off-topic",
  };
}

function greetReply(): VoiceGuideAnswer {
  return {
    reply:
      "Hi — I am the Xkwisit voice guide. Ask what this site is about, how to start free, or how to book a strategy call.",
    cta: { label: "Book a call", href: "/book" },
    matchedId: "greet",
  };
}

function clipSpoken(text: string) {
  const spoken = text.replace(/\s+/g, " ").trim();
  if (spoken.length <= 360) return spoken;
  return `${spoken.slice(0, 340).replace(/\s+\S*$/, "")}. Want me to open the page?`;
}

/**
 * Grounded product answers — curated FAQ first, then service/package fallback.
 */
export function answerVoiceGuideQuestion(message: string): VoiceGuideAnswer {
  const q = normalize(message);
  if (!q) {
    return {
      reply: "I did not catch that. Ask what Xkwisit is about, or how to get started.",
      matchedId: "empty",
    };
  }

  if (/^(hi|hello|hey|good (morning|afternoon|evening))\b/.test(q)) {
    return greetReply();
  }

  const faqRanked = voiceFaq
    .map((entry) => ({ entry, score: scoreFaq(q, entry) }))
    .sort((a, b) => b.score - a.score);

  const bestFaq = faqRanked[0];
  if (bestFaq && bestFaq.score >= 8) {
    return {
      reply: clipSpoken(bestFaq.entry.answer),
      cta: bestFaq.entry.cta,
      matchedId: bestFaq.entry.id,
    };
  }

  const knowledge = buildVoiceGuideKnowledge();
  const ranked = knowledge
    .map((chunk) => ({ chunk, score: scoreChunk(q, chunk) }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  // FAQ near-miss still preferred over weak knowledge
  if (bestFaq && bestFaq.score >= 5 && (!best || best.score < bestFaq.score + 4)) {
    return {
      reply: clipSpoken(bestFaq.entry.answer),
      cta: bestFaq.entry.cta,
      matchedId: bestFaq.entry.id,
    };
  }

  if (best && best.score >= 4) {
    return {
      reply: clipSpoken(best.chunk.body),
      cta: best.chunk.cta,
      matchedId: best.chunk.id,
    };
  }

  // Soft landing for Xkwisit-shaped asks that missed hard thresholds
  const related = relatedServicesReply(q, ranked);
  if (related) return related;

  return offTopicReply();
}
