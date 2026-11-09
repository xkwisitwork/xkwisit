import dns from "node:dns/promises";
import net from "node:net";

import { badRequest } from "../../utils/errors.js";
import type {
  PageSignals,
  XrayFinding,
  XrayScanResult,
  XraySignal,
  XraySignalLabel,
} from "./xray.types.js";

const FETCH_TIMEOUT_MS = 12_000;
const MAX_BYTES = 1_500_000;
const USER_AGENT =
  "XkwisitBusinessXRay/1.0 (+https://xkwisit.com; growth diagnostic)";

const CTA_RE =
  /\b(book|buy|shop|get started|start now|contact|talk to|schedule|demo|sign up|signup|enquire|inquiry|whatsapp|order now|claim|apply)\b/i;
const NEWSLETTER_RE =
  /\b(newsletter|subscribe|mailing list|join our list|get updates)\b/i;
const LOGIN_RE = /\b(log\s?in|sign\s?in|my account|dashboard|portal)\b/i;
const CART_RE = /\b(cart|checkout|bag|buy now|add to cart)\b/i;
const BLOG_RE = /\b(blog|insights|resources|articles|news)\b/i;
const PRIVACY_RE = /\b(privacy|cookie policy|data protection|gdpr)\b/i;
const WHATSAPP_RE = /wa\.me\/|api\.whatsapp\.com|whatsapp/i;

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(n)));
}

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&nbsp;/gi, " ")
    .trim();
}

function stripTags(html: string) {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " "),
  ).trim();
}

function metaContent(html: string, name: string) {
  const re = new RegExp(
    `<meta[^>]+(?:name|property)=["']${name}["'][^>]*content=["']([^"']*)["'][^>]*>|<meta[^>]+content=["']([^"']*)["'][^>]*(?:name|property)=["']${name}["'][^>]*>`,
    "i",
  );
  const m = html.match(re);
  return decodeEntities(m?.[1] ?? m?.[2] ?? "");
}

function allMatches(html: string, re: RegExp) {
  const out: string[] = [];
  const flags = re.flags.includes("g") ? re.flags : `${re.flags}g`;
  const global = new RegExp(re.source, flags);
  for (const m of html.matchAll(global)) {
    if (m[1]) out.push(decodeEntities(m[1]));
  }
  return out;
}

function isPrivateIp(ip: string) {
  if (ip === "::1") return true;
  if (ip.startsWith("fc") || ip.startsWith("fd") || ip.startsWith("fe80")) {
    return true;
  }
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return false;
  const a = parts[0] ?? 0;
  const b = parts[1] ?? 0;
  if (a === 10 || a === 127 || a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 100 && b >= 64 && b <= 127) return true;
  return false;
}

export function normalizeScanUrl(raw: string) {
  const trimmed = raw.trim();
  if (!trimmed || trimmed.length < 3) {
    throw badRequest("Enter a website - e.g. yourbrand.com");
  }

  let candidate = trimmed;
  if (!/^https?:\/\//i.test(candidate)) {
    candidate = `https://${candidate}`;
  }

  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    throw badRequest("That does not look like a valid website URL");
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw badRequest("Only http and https URLs are supported");
  }

  const host = url.hostname.toLowerCase();
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host === "0.0.0.0"
  ) {
    throw badRequest("That host cannot be scanned");
  }

  if (net.isIP(host) && isPrivateIp(host)) {
    throw badRequest("Private network addresses cannot be scanned");
  }

  url.hash = "";
  return url;
}

async function assertPublicHost(hostname: string) {
  if (net.isIP(hostname)) {
    if (isPrivateIp(hostname)) {
      throw badRequest("Private network addresses cannot be scanned");
    }
    return;
  }

  let records: string[] = [];
  try {
    const result = await dns.lookup(hostname, { all: true, verbatim: true });
    records = result.map((r) => r.address);
  } catch {
    throw badRequest("Could not resolve that domain");
  }

  if (!records.length) {
    throw badRequest("Could not resolve that domain");
  }

  if (records.some(isPrivateIp)) {
    throw badRequest("That host resolves to a private address and cannot be scanned");
  }
}

async function fetchHtml(url: URL): Promise<{
  html: string;
  finalUrl: string;
  status: number;
  timingMs: number;
}> {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en",
        "User-Agent": USER_AGENT,
      },
    });

    const contentType = response.headers.get("content-type") ?? "";
    if (
      contentType &&
      !/text\/html|application\/xhtml\+xml|application\/xml|text\/plain/i.test(
        contentType,
      )
    ) {
      throw badRequest("That URL did not return an HTML page we can read");
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw badRequest("Could not read the page body");
    }

    const chunks: Uint8Array[] = [];
    let total = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      total += value.byteLength;
      if (total > MAX_BYTES) {
        await reader.cancel();
        break;
      }
      chunks.push(value);
    }

    const merged = Buffer.concat(chunks.map((c) => Buffer.from(c)));
    const html = merged.toString("utf8");
    return {
      html,
      finalUrl: response.url || url.toString(),
      status: response.status,
      timingMs: Date.now() - started,
    };
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw badRequest("The site took too long to respond");
    }
    if (err && typeof err === "object" && "status" in err) throw err;
    throw badRequest("Could not reach that website");
  } finally {
    clearTimeout(timer);
  }
}

export function extractPageSignals(
  html: string,
  finalUrl: string,
  status: number,
  timingMs: number,
): PageSignals {
  const title =
    decodeEntities(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "")
      .replace(/\s+/g, " ")
      .trim();
  const metaDescription = metaContent(html, "description");
  const canonical =
    html.match(
      /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>|<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i,
    )?.[1] ??
    html.match(
      /<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i,
    )?.[1] ??
    "";
  const ogTitle = metaContent(html, "og:title");
  const ogImage = metaContent(html, "og:image");
  const h1s = allMatches(html, /<h1[^>]*>([\s\S]*?)<\/h1>/gi).map((h) =>
    stripTags(h),
  );
  const text = stripTags(html);

  const hrefs = allMatches(html, /href=["']([^"']+)["']/gi);
  const alts = allMatches(html, /alt=["']([^"']*)["']/gi);

  const hasTel =
    /href=["']tel:/i.test(html) || /\+\d[\d\s()-]{7,}\d/.test(text);
  const hasMailto = /href=["']mailto:/i.test(html);
  const hasWhatsApp = hrefs.some((h) => WHATSAPP_RE.test(h)) || WHATSAPP_RE.test(html);
  const hasForm = /<form\b/i.test(html);
  const hasViewport = /name=["']viewport["']/i.test(html);
  const hasCta = CTA_RE.test(text) || CTA_RE.test(html);
  const hasCartOrCheckout =
    CART_RE.test(text) || hrefs.some((h) => CART_RE.test(h));
  const hasLogin = LOGIN_RE.test(text) || hrefs.some((h) => LOGIN_RE.test(h));
  const hasNewsletter =
    NEWSLETTER_RE.test(text) ||
    /type=["']email["']/i.test(html) ||
    /name=["']email["']/i.test(html);
  const hasSchema =
    /application\/ld\+json/i.test(html) ||
    /\bitemscope\b/i.test(html) ||
    /\bitemtype=/i.test(html);
  const hasBlogLink =
    BLOG_RE.test(text) || hrefs.some((h) => /blog|insights|resources|articles/i.test(h));
  const hasPrivacy =
    PRIVACY_RE.test(text) || hrefs.some((h) => /privacy|cookie/i.test(h));
  const hasLogoAlt = alts.some((a) => /logo|brand/i.test(a) && a.trim().length > 0);

  return {
    finalUrl,
    status,
    https: finalUrl.startsWith("https://"),
    title,
    metaDescription,
    canonical: decodeEntities(canonical),
    ogTitle,
    ogImage,
    h1s,
    hasViewport,
    hasForm,
    hasTel,
    hasMailto,
    hasWhatsApp,
    hasCta,
    hasCartOrCheckout,
    hasLogin,
    hasNewsletter,
    hasSchema,
    hasBlogLink,
    hasPrivacy,
    hasLogoAlt,
    wordCount: text ? text.split(/\s+/).filter(Boolean).length : 0,
    timingMs,
  };
}

function scoreDimension(
  label: XraySignalLabel,
  checks: Array<{ ok: boolean; weight: number; finding: Omit<XrayFinding, "dimension"> }>,
): { score: number; findings: XrayFinding[] } {
  const totalWeight = checks.reduce((s, c) => s + c.weight, 0) || 1;
  const earned = checks.reduce((s, c) => s + (c.ok ? c.weight : 0), 0);
  const score = clamp((earned / totalWeight) * 100, 18, 96);
  const findings = checks.map((c) => ({
    ...c.finding,
    dimension: label,
    severity: c.ok ? ("ok" as const) : c.finding.severity,
  }));
  return { score, findings };
}

export function scorePage(signals: PageSignals, domain: string): XrayScanResult {
  const brand = scoreDimension("Brand clarity", [
    {
      ok: signals.https,
      weight: 2,
      finding: {
        id: "https",
        label: "HTTPS",
        detail: signals.https
          ? "Site is served over HTTPS."
          : "Site is not on HTTPS.",
        severity: "fail",
      },
    },
    {
      ok: signals.title.length >= 10 && signals.title.length <= 70,
      weight: 3,
      finding: {
        id: "title",
        label: "Page title",
        detail: signals.title
          ? `Title: “${signals.title.slice(0, 80)}”`
          : "Missing or weak <title>.",
        severity: signals.title ? "warn" : "fail",
      },
    },
    {
      ok: signals.metaDescription.length >= 50,
      weight: 2,
      finding: {
        id: "meta-description",
        label: "Meta description",
        detail: signals.metaDescription
          ? "Meta description is present."
          : "No useful meta description.",
        severity: "warn",
      },
    },
    {
      ok: signals.h1s.length === 1,
      weight: 2,
      finding: {
        id: "h1",
        label: "H1 headline",
        detail:
          signals.h1s.length === 1
            ? `H1: “${signals.h1s[0]!.slice(0, 80)}”`
            : signals.h1s.length === 0
              ? "No H1 found."
              : `Found ${signals.h1s.length} H1 tags - usually one is clearer.`,
        severity: signals.h1s.length ? "warn" : "fail",
      },
    },
    {
      ok: Boolean(signals.ogTitle || signals.ogImage),
      weight: 1,
      finding: {
        id: "og",
        label: "Open Graph",
        detail:
          signals.ogTitle || signals.ogImage
            ? "Social preview tags found."
            : "No Open Graph preview tags.",
        severity: "warn",
      },
    },
    {
      ok: signals.hasLogoAlt || signals.wordCount > 80,
      weight: 1,
      finding: {
        id: "brand-surface",
        label: "Brand surface",
        detail: signals.hasLogoAlt
          ? "Logo alt text present."
          : signals.wordCount > 80
            ? "Page has readable copy."
            : "Very little brand copy on the homepage.",
        severity: "warn",
      },
    },
  ]);

  const demand = scoreDimension("Demand quality", [
    {
      ok: signals.hasViewport,
      weight: 2,
      finding: {
        id: "viewport",
        label: "Mobile viewport",
        detail: signals.hasViewport
          ? "Viewport meta is set."
          : "Missing viewport meta - weak on mobile.",
        severity: "fail",
      },
    },
    {
      ok: Boolean(signals.canonical),
      weight: 1,
      finding: {
        id: "canonical",
        label: "Canonical",
        detail: signals.canonical
          ? "Canonical URL is set."
          : "No canonical link.",
        severity: "warn",
      },
    },
    {
      ok: signals.hasSchema,
      weight: 2,
      finding: {
        id: "schema",
        label: "Structured data",
        detail: signals.hasSchema
          ? "Schema / structured data detected."
          : "No structured data found.",
        severity: "warn",
      },
    },
    {
      ok: signals.wordCount >= 120,
      weight: 2,
      finding: {
        id: "copy-depth",
        label: "Offer copy",
        detail:
          signals.wordCount >= 120
            ? "Homepage has enough copy to explain the offer."
            : "Homepage copy looks thin for demand capture.",
        severity: "warn",
      },
    },
    {
      ok: signals.hasBlogLink,
      weight: 1,
      finding: {
        id: "content-hub",
        label: "Content path",
        detail: signals.hasBlogLink
          ? "Blog/resources path found."
          : "No clear content/insights path.",
        severity: "warn",
      },
    },
    {
      ok: signals.timingMs < 4000 && signals.status >= 200 && signals.status < 400,
      weight: 2,
      finding: {
        id: "response",
        label: "Response",
        detail:
          signals.status >= 200 && signals.status < 400
            ? `Responded ${signals.status} in ${signals.timingMs}ms.`
            : `HTTP ${signals.status} - demand pages need a clean response.`,
        severity: signals.status >= 400 ? "fail" : "warn",
      },
    },
  ]);

  const sales = scoreDimension("Sales follow-through", [
    {
      ok: signals.hasCta,
      weight: 3,
      finding: {
        id: "cta",
        label: "Clear CTA",
        detail: signals.hasCta
          ? "Call-to-action language found."
          : "No clear CTA language on the page.",
        severity: "fail",
      },
    },
    {
      ok: signals.hasForm,
      weight: 2,
      finding: {
        id: "form",
        label: "Capture form",
        detail: signals.hasForm
          ? "At least one form found."
          : "No form found on the homepage.",
        severity: "warn",
      },
    },
    {
      ok: signals.hasTel || signals.hasMailto || signals.hasWhatsApp,
      weight: 3,
      finding: {
        id: "contact",
        label: "Contact path",
        detail: signals.hasWhatsApp
          ? "WhatsApp contact path found."
          : signals.hasTel
            ? "Phone link found."
            : signals.hasMailto
              ? "Email link found."
              : "No phone, email, or WhatsApp path found.",
        severity: "fail",
      },
    },
    {
      ok: signals.hasCartOrCheckout,
      weight: 1,
      finding: {
        id: "commerce",
        label: "Commerce path",
        detail: signals.hasCartOrCheckout
          ? "Cart/checkout path found."
          : "No cart/checkout path (fine for service businesses).",
        severity: "ok",
      },
    },
  ]);

  const retention = scoreDimension("Retention loop", [
    {
      ok: signals.hasNewsletter,
      weight: 3,
      finding: {
        id: "newsletter",
        label: "Email capture",
        detail: signals.hasNewsletter
          ? "Email/newsletter capture looks present."
          : "No newsletter or email capture spotted.",
        severity: "warn",
      },
    },
    {
      ok: signals.hasLogin,
      weight: 2,
      finding: {
        id: "login",
        label: "Account return path",
        detail: signals.hasLogin
          ? "Login/account path found."
          : "No login/account return path.",
        severity: "warn",
      },
    },
    {
      ok: signals.hasBlogLink,
      weight: 2,
      finding: {
        id: "habit-content",
        label: "Return content",
        detail: signals.hasBlogLink
          ? "Ongoing content path found."
          : "No ongoing content loop for return visits.",
        severity: "warn",
      },
    },
    {
      ok: signals.hasPrivacy,
      weight: 1,
      finding: {
        id: "trust",
        label: "Trust page",
        detail: signals.hasPrivacy
          ? "Privacy/trust page linked."
          : "No privacy/trust page linked.",
        severity: "warn",
      },
    },
  ]);

  const signalsOut: XraySignal[] = [
    { label: "Brand clarity", score: brand.score },
    { label: "Demand quality", score: demand.score },
    { label: "Sales follow-through", score: sales.score },
    { label: "Retention loop", score: retention.score },
  ];

  const overall = clamp(
    signalsOut.reduce((s, x) => s + x.score, 0) / signalsOut.length,
  );
  const weakest = [...signalsOut].sort((a, b) => a.score - b.score)[0]!;

  return {
    domain,
    finalUrl: signals.finalUrl,
    overall,
    constraint: weakest.label,
    signals: signalsOut,
    findings: [
      ...brand.findings,
      ...demand.findings,
      ...sales.findings,
      ...retention.findings,
    ],
    scannedAt: new Date().toISOString(),
    timingMs: signals.timingMs,
  };
}

export async function analyzeWebsite(rawUrl: string): Promise<XrayScanResult> {
  const url = normalizeScanUrl(rawUrl);
  await assertPublicHost(url.hostname);
  const fetched = await fetchHtml(url);
  if (fetched.status >= 400) {
    throw badRequest(
      `The site responded with HTTP ${fetched.status}. Try the homepage URL.`,
    );
  }
  const page = extractPageSignals(
    fetched.html,
    fetched.finalUrl,
    fetched.status,
    fetched.timingMs,
  );
  return scorePage(page, url.hostname.replace(/^www\./, ""));
}
