import { packages } from "@/config/packages";
import { services } from "@/config/services";
import { ROUTES } from "@/config/site";

import type { VoiceGuideCta } from "./knowledge";

export type VoiceFaqEntry = {
  id: string;
  /** Human label for debugging / ranking ties */
  title: string;
  /** Natural phrases people say (including vague + typo-prone forms) */
  phrases: string[];
  /** Extra keywords beyond phrases */
  keywords: string[];
  /** Clear spoken answer — 2–4 sentences, TTS-friendly */
  answer: string;
  cta?: VoiceGuideCta;
  /** Boost vague “what is this site” style queries */
  aboutIntent?: boolean;
};

function naira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

const foundationFloor = naira(packages[0]?.priceMonthly ?? 1_200_000);
const crmFloor = naira(
  services.find((s) => s.slug === "crm-automation")?.startingFrom ?? 700_000,
);
const brandingFloor = naira(
  services.find((s) => s.slug === "branding")?.startingFrom ?? 1_200_000,
);
const webFloor = naira(
  services.find((s) => s.slug === "web-development")?.startingFrom ?? 1_500_000,
);

/**
 * Hand-written Voice Guide answers for Xkwisit.
 * Prefer these over concatenated siteConfig / service dumps.
 */
export const voiceFaq: VoiceFaqEntry[] = [
  {
    id: "about-site",
    title: "What this website is about",
    aboutIntent: true,
    phrases: [
      "what is this website about",
      "what is this site about",
      "what is this website all about",
      "what is this site all about",
      "what is this web site about",
      "what is this ebste about",
      "what is this ebste all about",
      "what is this website",
      "what is this site",
      "tell me about this website",
      "tell me about this site",
      "what do you do",
      "what does xkwisit do",
      "what is xkwisit",
      "who are you",
      "explain this website",
      "what is this platform",
      "what is this company",
    ],
    keywords: [
      "about",
      "website",
      "site",
      "ebste",
      "webste",
      "websit",
      "xkwisit",
      "agency",
      "company",
      "purpose",
      "overview",
    ],
    answer:
      "Xkwisit is a growth agency website for business owners. We help you find why sales are stuck — brand, website, ads, or follow-up — then fix that with clear services and free checks. Start with the Growth Assessment or Business X-Ray, or book a strategy call.",
    cta: { label: "About Xkwisit", href: ROUTES.about },
  },
  {
    id: "who-for",
    title: "Who Xkwisit is for",
    phrases: [
      "who is this for",
      "who do you help",
      "is this for me",
      "who should use xkwisit",
      "what kind of businesses",
    ],
    keywords: ["who", "for", "founder", "business owner", "client", "audience"],
    answer:
      "Xkwisit is for founders and operators who already have a business, but sales feel stuck. If brand, website, ads, or follow-up is leaking revenue, this site shows the fix path — free checks first, then paid services when you are ready.",
    cta: { label: "See services", href: ROUTES.services },
  },
  {
    id: "how-it-works",
    title: "How it works",
    phrases: [
      "how does it work",
      "how do you work",
      "what is the process",
      "how do we start",
      "what happens next",
    ],
    keywords: ["how", "process", "start", "steps", "workflow", "engagement"],
    answer:
      "First, run a free Growth Assessment or Business X-Ray to see what is stuck. Then book a strategy call. If we work together, we set a clear Monday number, fix the leak, and you get a private login to watch the work.",
    cta: { label: "Start free check", href: ROUTES.growthAssessment },
  },
  {
    id: "free-tools",
    title: "Free tools",
    phrases: [
      "what is free",
      "any free tools",
      "free checks",
      "can i try for free",
      "free diagnostic",
    ],
    keywords: ["free", "trial", "check", "diagnostic", "no cost"],
    answer:
      "Yes — two free starting points. The Growth Assessment is a short questionnaire diagnostic. Business X-Ray audits your public website from a domain. Both help you see what to fix before you spend on a full engagement.",
    cta: { label: "Growth Assessment", href: ROUTES.growthAssessment },
  },
  {
    id: "assessment",
    title: "Growth Assessment",
    phrases: [
      "what is the growth assessment",
      "tell me about the assessment",
      "how does the assessment work",
    ],
    keywords: ["assessment", "questionnaire", "score", "diagnostic"],
    answer:
      "The Growth Assessment asks plain questions about your business and returns a diagnostic using the same framework Xkwisit uses with clients. It takes about ten minutes and shows where sales are leaking.",
    cta: { label: "Start assessment", href: ROUTES.growthAssessment },
  },
  {
    id: "xray",
    title: "Business X-Ray",
    phrases: [
      "what is business x-ray",
      "what is the xray",
      "website audit",
      "scan my website",
    ],
    keywords: ["x-ray", "xray", "audit", "domain", "scan"],
    answer:
      "Business X-Ray is a free instant audit. Enter your domain and get a read on digital presence, SEO, reputation, and conversion setup — without filling a long form.",
    cta: { label: "Run Business X-Ray", href: ROUTES.businessXray },
  },
  {
    id: "services-overview",
    title: "Services overview",
    phrases: [
      "what services do you offer",
      "list your services",
      "what can you help with",
      "what do you sell",
    ],
    keywords: ["services", "offer", "help with", "solutions", "catalog"],
    answer:
      "We offer branding, business growth, web development, SEO, paid media, content, CRM and automation, consulting, and profit optimization.\nEach service page lists deliverables, fit notes, and a published starting-from price.",
    cta: { label: "Browse services", href: ROUTES.services },
  },
  {
    id: "crm",
    title: "CRM & Automation",
    phrases: [
      "tell me about crm",
      "what is crm automation",
      "how much is crm",
      "crm pricing",
      "pipeline automation",
    ],
    keywords: ["crm", "automation", "pipeline", "whatsapp", "follow up", "leads"],
    answer: `CRM and Automation installs stages, routing, and lifecycle sequences so leads do not die in spreadsheets. It is built for busy sales desks. It starts from ${crmFloor} for a ninety-day block.`,
    cta: { label: "See CRM & Automation", href: "/services/crm-automation" },
  },
  {
    id: "branding",
    title: "Branding",
    phrases: [
      "tell me about branding",
      "brand identity",
      "how much is branding",
      "do you do branding",
      "can you help with branding",
      "do you offer branding",
    ],
    keywords: ["branding", "brand identity", "identity", "logo", "brand voice"],
    answer: `Branding builds the identity and messaging that earns trust before you speak. It covers voice, decks, and assets sales can actually use. Branding starts from ${brandingFloor}.`,
    cta: { label: "See Branding", href: "/services/branding" },
  },
  {
    id: "web-development",
    title: "Web Development",
    phrases: [
      "tell me about web development",
      "do you build websites",
      "do you guys build websites",
      "do you build mobile apps",
      "do you build mobile applications",
      "do you guys build mobile apps",
      "do you guys build mobile applications",
      "do you make mobile apps",
      "do you develop apps",
      "do you build apps",
      "can you build a mobile app",
      "do you do mobile development",
      "ios and android",
      "how much is web development",
    ],
    keywords: [
      "web development",
      "website build",
      "site build",
      "mobile app",
      "mobile apps",
      "mobile application",
      "mobile applications",
      "ios",
      "android",
      "cross platform",
      "app development",
      "web app",
      "portal",
    ],
    answer: `Yes — under Web Development we build conversion-focused websites, customer portals, and mobile apps (iOS, Android, or cross-platform), with payments and analytics included.\nEngagements start from ${webFloor} for a ninety-day block.`,
    cta: { label: "See Web Development", href: "/services/web-development" },
  },
  {
    id: "pricing",
    title: "Pricing",
    phrases: [
      "how much does it cost",
      "what are your prices",
      "pricing",
      "how expensive",
      "what is the price",
    ],
    keywords: ["pricing", "price", "cost", "fee", "budget", "how much", "packages"],
    answer: `Published package floors start around ${foundationFloor}. Individual services also list starting-from prices on their pages. Final scope is confirmed after a strategy call — we do not invent unpublished numbers.`,
    cta: { label: "See pricing", href: ROUTES.pricing },
  },
  {
    id: "book",
    title: "Book a call",
    phrases: [
      "how do i book",
      "book a call",
      "talk to someone",
      "schedule a meeting",
      "strategy call",
    ],
    keywords: ["book", "call", "meeting", "schedule", "demo", "talk"],
    answer:
      "You can book a strategy call from the site. We use the call to name what is stuck — brand, website, ads, or follow-up — and agree the next clear step. No long email chase required.",
    cta: { label: "Book a call", href: ROUTES.book },
  },
  {
    id: "login",
    title: "Login and portal",
    phrases: [
      "how do i login",
      "what is the portal",
      "client dashboard",
      "where do i see my work",
    ],
    keywords: ["login", "portal", "dashboard", "account", "sign in"],
    answer:
      "Clients get a private login to see work, leads, approvals, invoices, and what comes next. The Xkwisit team works from the same system, so you are not chasing updates across WhatsApp and PDFs.",
    cta: { label: "Log in", href: ROUTES.login },
  },
  {
    id: "contact",
    title: "Contact",
    phrases: [
      "how do i contact you",
      "what is your email",
      "where are you based",
      "office location",
    ],
    keywords: ["contact", "email", "phone", "lagos", "nigeria", "location", "based"],
    answer:
      "Xkwisit is based in Lagos, Nigeria.\nEmail: hello@xkwisit.com\nYou can also use the contact page, or book a strategy call for a faster next step.",
    cta: { label: "Contact", href: ROUTES.contact },
  },
  {
    id: "get-started",
    title: "Where to start",
    phrases: [
      "where should i start",
      "what should i do first",
      "i am new here",
      "getting started",
    ],
    keywords: ["start", "begin", "first", "new", "next step"],
    answer:
      "If you are new, start with a free check: Growth Assessment for a business diagnostic, or Business X-Ray for your website. After that, book a strategy call if you want us to help fix the stuck part.",
    cta: { label: "Start free check", href: ROUTES.growthAssessment },
  },
];
