import type { CookieOptions, Response } from "express";

import { env } from "../../config/env.js";

const baseCookie: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: env.COOKIE_SECURE ?? env.NODE_ENV === "production",
  path: "/",
};

export function setAuthCookies(
  res: Response,
  tokens: { accessToken: string; refreshToken: string },
) {
  res.cookie("access_token", tokens.accessToken, {
    ...baseCookie,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refresh_token", tokens.refreshToken, {
    ...baseCookie,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export function clearAuthCookies(res: Response) {
  res.clearCookie("access_token", { ...baseCookie });
  res.clearCookie("refresh_token", { ...baseCookie });
}
