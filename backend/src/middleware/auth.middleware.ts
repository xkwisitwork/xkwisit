import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env.js";
import { User } from "../models/User.js";
import type {
  AccessTokenPayload,
  AuthRequestUser,
} from "../types/auth.types.js";
import { forbidden, unauthorized } from "../utils/errors.js";

export type { AccessTokenPayload, AuthRequestUser };

declare global {
  namespace Express {
    interface Request {
      requestId?: string;
      user?: AuthRequestUser;
      orgId?: string;
    }
  }
}

export function signAccessToken(payload: AccessTokenPayload) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES as jwt.SignOptions["expiresIn"],
  });
}

export function signRefreshToken(payload: { sub: string }) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES as jwt.SignOptions["expiresIn"],
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;
}

export function verifyRefreshToken(token: string): { sub: string } {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as { sub: string };
}

function readAccessCandidates(req: Request): string[] {
  const header = req.headers.authorization;
  const bearer = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  const cookieToken = req.cookies?.access_token as string | undefined;
  // Try each candidate — an expired NextAuth-cached Bearer must not
  // block a still-valid httpOnly cookie (common after 15m).
  return [bearer, cookieToken].filter(
    (t): t is string => typeof t === "string" && t.length > 0,
  );
}

function attachUser(req: Request, payload: AccessTokenPayload) {
  req.user = {
    id: payload.sub,
    email: payload.email,
    orgId: payload.orgId,
    role: payload.role,
    isPlatformAdmin: Boolean(payload.isPlatformAdmin),
  };
  req.orgId = (req.headers["x-org-id"] as string) || payload.orgId;
}

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const candidates = readAccessCandidates(req);
  if (candidates.length === 0) {
    next(unauthorized());
    return;
  }

  for (const token of candidates) {
    try {
      attachUser(req, verifyAccessToken(token));
      next();
      return;
    } catch {
      // try next candidate
    }
  }

  next(unauthorized());
}

export function optionalAuthMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  for (const token of readAccessCandidates(req)) {
    try {
      attachUser(req, verifyAccessToken(token));
      break;
    } catch {
      // ignore
    }
  }
  next();
}

/** Requires auth + platform super admin (DB flag, not just JWT claim). */
export async function platformAdminMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) throw unauthorized();
    const user = await User.findById(req.user.id).select("isPlatformAdmin email");
    if (!user?.isPlatformAdmin) throw forbidden("Platform admin access required");
    req.user.isPlatformAdmin = true;
    next();
  } catch (err) {
    next(err);
  }
}
