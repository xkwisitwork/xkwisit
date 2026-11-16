import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "../config/env.js";
import { User } from "../models/User.js";
import type {
  AccessTokenPayload,
  AuthRequestUser,
} from "../types/auth.types.js";
import { forbidden, sessionSuperseded, unauthorized } from "../utils/errors.js";

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

export function signRefreshToken(payload: { sub: string; sv: number }) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES as jwt.SignOptions["expiresIn"],
  });
}

export function verifyAccessToken(token: string): AccessTokenPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;
}

export function verifyRefreshToken(token: string): { sub: string; sv?: number } {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as {
    sub: string;
    sv?: number;
  };
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

/** Reject tokens from a previous device after a newer login. */
export async function assertSessionVersion(
  userId: string,
  tokenSv: number | undefined,
) {
  const user = await User.findById(userId).select("sessionVersion");
  if (!user) throw unauthorized();
  const current = user.sessionVersion ?? 0;
  if ((tokenSv ?? 0) !== current) {
    throw sessionSuperseded();
  }
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

  void (async () => {
    let lastError: unknown = unauthorized();

    for (const token of candidates) {
      try {
        const payload = verifyAccessToken(token);
        await assertSessionVersion(payload.sub, payload.sv);
        attachUser(req, payload);
        next();
        return;
      } catch (err) {
        lastError = err;
      }
    }

    next(lastError);
  })();
}

export function optionalAuthMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  void (async () => {
    for (const token of readAccessCandidates(req)) {
      try {
        const payload = verifyAccessToken(token);
        await assertSessionVersion(payload.sub, payload.sv);
        attachUser(req, payload);
        break;
      } catch {
        // ignore — optional
      }
    }
    next();
  })();
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
