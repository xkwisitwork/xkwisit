import type { NextFunction, Request, Response } from "express";

import { env } from "../../config/env.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { assertBotShield } from "./bot-shield.service.js";

function clientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0]!.trim();
  }
  return req.ip || "unknown";
}

function stripShieldFields(body: Record<string, unknown>) {
  delete body._hp;
  delete body._bc;
  delete body._bts;
  delete body._bsig;
}

function isTrustedInternal(req: Request): boolean {
  const provided = req.headers["x-xkwisit-internal"];
  if (typeof provided !== "string" || !provided) return false;
  const expected = env.INTERNAL_API_SECRET || env.JWT_ACCESS_SECRET;
  return provided === expected;
}

/**
 * Enforces honeypot + signed challenge + timing + UA checks on public POSTs.
 * Strips `_hp`, `_bc`, `_bts`, `_bsig` from the body after verification so
 * strict Zod schemas stay clean.
 */
export const botShieldMiddleware = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const body =
      req.body && typeof req.body === "object"
        ? (req.body as Record<string, unknown>)
        : {};

    // NextAuth (and other trusted server callers) may authenticate without a browser challenge.
    if (isTrustedInternal(req)) {
      stripShieldFields(body);
      req.body = body;
      next();
      return;
    }

    assertBotShield(body, {
      ip: clientIp(req),
      userAgent: req.headers["user-agent"],
      origin: typeof req.headers.origin === "string" ? req.headers.origin : undefined,
      referer:
        typeof req.headers.referer === "string"
          ? req.headers.referer
          : typeof req.headers.referrer === "string"
            ? req.headers.referrer
            : undefined,
    });

    req.body = body;
    next();
  },
);
