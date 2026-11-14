/**
 * Curated English → Naija Pidgin map for Xkwisit marketing + UI copy.
 * Keys are normalized (lowercase, collapsed whitespace, no trailing punctuation).
 */

function normKey(text: string) {
  return text
    .toLowerCase()
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[—–]/g, "-")
    .replace(/[^\w\s'%-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Exact phrase translations (natural Naija, not word swaps). */
export const PIDGIN_PHRASES: Record<string, string> = {
  // Hero
  "growth system that exposes leaks in your business":
    "Na system wey dey show wetin dey spoil for your business be this",
  "growth system that exposes leaks in your business.":
    "Na system wey dey show wetin dey spoil for your business be this",
  "we look at your brand, your ads, and your sales as one business. then we name the broken part, and fix that before you spend another week on the same ads.":
    "We go look your brand, your ads, and your sales as one business. Then we go name di part wey don spoil, and fix am before you waste another week for di same ads.",
  "free growth assessment - find the leak before you spend more":
    "Free growth check - find wetin dey spoil before you spend more money",
  "free growth assessment — find the leak before you spend more":
    "Free growth check - find wetin dey spoil before you spend more money",
  "book a strategy call": "Book strategy call",
  "see how it works": "See how e dey work",
  "new": "New",

  // Nav
  services: "Services",
  solutions: "Solutions",
  "case studies": "Case studies",
  insights: "Insights",
  pricing: "Pricing",
  about: "About",
  "log in": "Login",
  "get started": "Make we start",
  "book a call": "Book call",

  // Voice / assistant
  "ask xkwisit": "Ask Xkwisit",
  "ai assistant": "AI assistant",
  "hi, i'm xkwisit!": "How far, na Xkwisit be this!",
  "how can i help you today?": "How I fit help you today?",
  "about us": "About us",
  "crm price": "CRM price",
  "mobile apps": "Mobile apps",
  "free check": "Free check",
  message: "Message",
  "try asking": "Try ask",
  "what is this website about?": "Wetin be dis website about?",
  "how much is crm?": "How much CRM cost?",
  "do you build mobile apps?": "Una dey build mobile apps?",
  "how do i get a free check?": "How I go take get free check?",
  "how do i book a call?": "How I go take book call?",
  answer: "Answer",
  "hearing you": "I dey hear you",
  "hearing you…": "I dey hear you…",
  thinking: "E dey think…",
  "thinking…": "E dey think…",
  "speaking your answer…": "E dey yarn di answer…",
  "listening — speak now": "E dey listen — yarn now",
  "ask by voice or type a message": "Ask wit voice or type message",
  "mic unavailable · type instead": "Mic no dey · type instead",
  "message…": "Message…",
  "speak · send · read the answer here": "Yarn · send · read di answer here",

  // Common marketing
  "stop guessing": "Stop to dey guess",
  "check free": "Check free",
  "xkwisit check free": "Xkwisit check free",
  "selected work": "Work wey we don do",
  "all work": "All di work",
  "what keeps walking out": "Wetin dey waka comot for your money",
  "find the leak": "Find wetin dey spoil",
  "name the leak": "Name wetin dey spoil",
  "fix the leak": "Stop di spoil",
  "growth assessment": "Growth check",
  "see the leak, name the fix, grow on purpose":
    "See wetin dey spoil, name di fix, grow wit sense",
  "busy owners still can't name the one leak killing profit. this free":
    "Busy owners still no fit name di one tin wey dey kill profit. Dis free",

  // CTAs / chrome
  home: "Home",
  contact: "Contact",
  careers: "Careers",
  team: "Team",
  privacy: "Privacy",
  terms: "Terms",
  "learn more": "Learn more",
  continue: "Continue",
  next: "Next",
  prev: "Prev",
  previous: "Previous",
  close: "Close",
  send: "Send",
  submit: "Submit",
  "read more": "Read more",
  "view all": "See all",
  "talk to us": "Yarn wit us",
  "work with us": "Work wit us",
  "our work": "Our work",
  "who we are": "Who we be",
  "how it works": "How e dey work",
  "what we do": "Wetin we dey do",
  "why xkwisit": "Why Xkwisit",
  "book now": "Book now",
  "start free": "Start free",
  "get the free check": "Collect di free check",
};

/** Longer substring replacements applied longest-first. */
export const PIDGIN_FRAGMENTS: Array<[string, string]> = [
  ["growth system that exposes leaks in your business", "Na system wey dey show wetin dey spoil for your business be this"],
  ["exposes leaks in your business", "dey show wetin dey spoil for your business"],
  ["leaks in your business", "wetin dey spoil for your business"],
  ["find the leak before you spend more", "find wetin dey spoil before you spend more money"],
  ["name the broken part", "name di part wey don spoil"],
  ["as one business", "as one business"],
  ["book a strategy call", "Book strategy call"],
  ["free growth assessment", "Free growth check"],
  ["growth assessment", "growth check"],
  ["case studies", "case studies"],
  ["get started", "Make we start"],
  ["log in", "Login"],
  ["learn more", "Learn more"],
  ["how it works", "how e dey work"],
  ["what we do", "wetin we dey do"],
  ["who we are", "who we be"],
  ["talk to us", "yarn wit us"],
  ["work with us", "work wit us"],
  ["see how it works", "see how e dey work"],
  ["the leak", "wetin dey spoil"],
  ["a leak", "tin wey dey spoil"],
  ["leaks", "wetin dey spoil"],
  ["leak", "spoil"],
];

export function lookupPidginPhrase(text: string): string | null {
  const key = normKey(text);
  if (!key) return null;
  if (PIDGIN_PHRASES[key]) return PIDGIN_PHRASES[key]!;

  // Try without trailing period variants already normalized away;
  // also try original trimmed lowercase for punctuation-sensitive keys.
  const soft = text.toLowerCase().replace(/\s+/g, " ").trim();
  if (PIDGIN_PHRASES[soft]) return PIDGIN_PHRASES[soft]!;

  return null;
}

export { normKey as normalizePidginKey };
