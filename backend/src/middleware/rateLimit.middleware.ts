import type { NextFunction, Request, Response } from "express";
import { tooManyRequests } from "../utils/errors.js";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/**
 * Lightweight in-memory rate limiter (per-process).
 * Suitable for local/dev; replace with Redis in production scale-out.
 */
export function rateLimitMiddleware(options?: {
  windowMs?: number;
  max?: number;
  key?: (req: Request) => string;
}) {
  const windowMs = options?.windowMs ?? 60_000;
  const max = options?.max ?? 120;
  const keyFn =
    options?.key ??
    ((req: Request) => req.ip || req.headers["x-forwarded-for"]?.toString() || "unknown");

  return (req: Request, _res: Response, next: NextFunction) => {
    const key = keyFn(req);
    const now = Date.now();
    const current = buckets.get(key);
    if (!current || current.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }
    current.count += 1;
    if (current.count > max) {
      return next(tooManyRequests("Too many requests"));
    }
    return next();
  };
}
