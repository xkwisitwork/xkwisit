import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";
import { unauthorized } from "../../utils/errors.js";
import { clearAuthCookies, setAuthCookies } from "./auth.utils.js";
import * as authService from "./auth.service.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.registerUser(req.body);
  setAuthCookies(res, {
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
  });
  return sendSuccess(
    res,
    {
      user: result.user,
      organization: result.organization,
      billing: result.billing,
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    },
    201,
    "Registered",
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);
  setAuthCookies(res, {
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
  });
  return sendSuccess(res, {
    user: result.user,
    billing: result.billing,
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
  });
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  clearAuthCookies(res);
  return sendSuccess(res, { ok: true }, 200, "Logged out");
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const token =
    (req.cookies?.refresh_token as string | undefined) ||
    (req.body?.refreshToken as string | undefined);
  if (!token) throw unauthorized("Refresh token required");

  const result = await authService.refreshSession(token);
  setAuthCookies(res, {
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
  });
  return sendSuccess(res, {
    user: result.user,
    billing: result.billing,
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
  });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw unauthorized();
  const data = await authService.getMe(req.user.id, req.orgId ?? req.user.orgId);
  return sendSuccess(res, data);
});

export const updateAvatar = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw unauthorized();
  const data = await authService.updateAvatar(req.user.id, req.body.avatarUrl);
  return sendSuccess(res, data, 200, "Avatar updated");
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.forgotPassword(req.body.email);
  return sendSuccess(res, result);
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.resetPassword(req.body);
  return sendSuccess(res, result);
});

export const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.verifyEmail(req.body.token);
  return sendSuccess(res, result);
});

export const mfaNotImplemented = asyncHandler(async (_req: Request, res: Response) => {
  return res.status(501).json({
    success: false,
    error: {
      code: "NOT_IMPLEMENTED",
      message: "MFA is not available in V1",
      status: 501,
    },
  });
});
