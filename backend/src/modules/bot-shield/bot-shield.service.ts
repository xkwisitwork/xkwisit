import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

import { env } from "../../config/env.js";
import { forbidden, tooManyRequests, unauthorized } from "../../utils/errors.js";

/** Minimum time a human form is expected to take after receiving a challenge. */
export const BOT_MIN_WAIT_MS = 3_000;
/** Challenges older than this are rejected. */
export const BOT_MAX_AGE_MS = 10 * 60 * 1000;
/** Max concurrent unused challenges tracked (evict oldest). */
const MAX_CHALLENGES = 20_000;

type ChallengeRecord = {
  issuedAt: number;
  used: boolean;
  ip: string;
};

const challenges = new Map<string, ChallengeRecord>();

function signingSecret() {
  return env.JWT_ACCESS_SECRET;
}

function sign(challengeId: string, issuedAt: number): string {
  return createHmac("sha256", signingSecret())
    .update(`${challengeId}.${issuedAt}`)
    .digest("hex");
}

function safeEqualHex(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a, "hex");
    const bb = Buffer.from(b, "hex");
    if (ba.length !== bb.length) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}

function pruneChallenges(now: number) {
  if (challenges.size < MAX_CHALLENGES) {
    // Still drop expired entries opportunistically.
    for (const [id, row] of challenges) {
      if (row.used || now - row.issuedAt > BOT_MAX_AGE_MS) {
        challenges.delete(id);
      }
    }
    return;
  }
  const ordered = [...challenges.entries()].sort(
    (a, b) => a[1].issuedAt - b[1].issuedAt,
  );
  const drop = Math.ceil(ordered.length * 0.2);
  for (let i = 0; i < drop; i += 1) {
    const id = ordered[i]?.[0];
    if (id) challenges.delete(id);
  }
}

export function issueChallenge(ip: string) {
  const now = Date.now();
  pruneChallenges(now);

  const challengeId = randomBytes(16).toString("hex");
  const issuedAt = now;
  const signature = sign(challengeId, issuedAt);

  challenges.set(challengeId, { issuedAt, used: false, ip });

  return {
    challengeId,
    issuedAt,
    signature,
    minWaitMs: BOT_MIN_WAIT_MS,
    expiresInMs: BOT_MAX_AGE_MS,
  };
}

export type BotShieldPayload = {
  _hp?: unknown;
  _bc?: unknown;
  _bts?: unknown;
  _bsig?: unknown;
};

const BOT_UA_RE =
  /(bot|crawler|spider|curl|wget|python-requests|scrapy|httpclient|go-http|java\/|libwww|phantom|headless|selenium|puppeteer)/i;

/**
 * Strict verification for public write endpoints.
 * Mutates `body` to strip shield fields after a successful check.
 */
export function assertBotShield(
  body: Record<string, unknown>,
  meta: { ip: string; userAgent?: string; origin?: string; referer?: string },
) {
  const honeypot = typeof body._hp === "string" ? body._hp : "";
  if (honeypot.trim().length > 0) {
    throw forbidden("Request blocked.");
  }

  const ua = (meta.userAgent ?? "").trim();
  if (!ua || ua.length < 10) {
    throw unauthorized("Request blocked.");
  }
  if (BOT_UA_RE.test(ua)) {
    throw forbidden("Request blocked.");
  }

  if (env.NODE_ENV === "production") {
    const allowed = env.CORS_ORIGIN.split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const origin = (meta.origin ?? "").trim();
    const referer = (meta.referer ?? "").trim();
    const matches = (value: string) =>
      allowed.some((o) => value === o || value.startsWith(`${o}/`));

    if (origin) {
      if (!matches(origin)) throw forbidden("Request blocked.");
    } else if (referer) {
      if (!matches(referer)) throw forbidden("Request blocked.");
    } else {
      throw forbidden("Request blocked.");
    }
  }

  const challengeId = typeof body._bc === "string" ? body._bc.trim() : "";
  const issuedAt =
    typeof body._bts === "number"
      ? body._bts
      : typeof body._bts === "string"
        ? Number(body._bts)
        : NaN;
  const signature = typeof body._bsig === "string" ? body._bsig.trim() : "";

  if (!challengeId || !Number.isFinite(issuedAt) || !signature) {
    throw unauthorized("Security check failed. Refresh the page and try again.");
  }

  const expected = sign(challengeId, issuedAt);
  if (!safeEqualHex(signature, expected)) {
    throw unauthorized("Security check failed. Refresh the page and try again.");
  }

  const now = Date.now();
  const age = now - issuedAt;
  if (age < BOT_MIN_WAIT_MS) {
    throw tooManyRequests(
      "Please wait a moment and try again — forms need a few seconds to verify.",
    );
  }
  if (age > BOT_MAX_AGE_MS) {
    throw unauthorized("Security check expired. Refresh the page and try again.");
  }

  const record = challenges.get(challengeId);
  if (!record) {
    throw unauthorized("Security check expired. Refresh the page and try again.");
  }
  if (record.used) {
    throw tooManyRequests("Security check already used. Refresh and try again.");
  }
  // Soft IP bind — allow NAT variance but prefer same client.
  if (record.ip && meta.ip && record.ip !== meta.ip && record.ip !== "unknown") {
    // Still accept, but mark — many mobile networks rotate. Do not hard-fail.
  }

  record.used = true;
  challenges.set(challengeId, record);

  delete body._hp;
  delete body._bc;
  delete body._bts;
  delete body._bsig;
}
