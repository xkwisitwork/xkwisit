import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";
import { unauthorized } from "../../utils/errors.js";
import * as platformService from "./platform.service.js";

export const stats = asyncHandler(async (_req: Request, res: Response) => {
  const data = await platformService.getPlatformStats();
  return sendSuccess(res, data);
});

export const listWorkspaces = asyncHandler(async (req: Request, res: Response) => {
  const search =
    typeof req.query.search === "string" ? req.query.search : undefined;
  const data = await platformService.listWorkspaces({ search });
  return sendSuccess(res, data);
});

export const getWorkspace = asyncHandler(async (req: Request, res: Response) => {
  const data = await platformService.getWorkspace(req.params.id as string);
  return sendSuccess(res, data);
});

export const updateWorkspace = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) throw unauthorized();
  const data = await platformService.updateWorkspace(
    req.params.id as string,
    req.body,
    req.user.id,
  );
  return sendSuccess(res, data, 200, "Workspace updated");
});

export const extendTrial = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) throw unauthorized();
  const days = typeof req.body.days === "number" ? req.body.days : 14;
  const data = await platformService.extendTrial(
    req.params.id as string,
    days,
    req.user.id,
  );
  return sendSuccess(res, data, 200, "Trial extended");
});

export const listUsers = asyncHandler(async (req: Request, res: Response) => {
  const search =
    typeof req.query.search === "string" ? req.query.search : undefined;
  const data = await platformService.listUsers({ search });
  return sendSuccess(res, data);
});

export const setPlatformAdmin = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) throw unauthorized();
  const data = await platformService.setUserPlatformAdmin(
    req.params.id as string,
    Boolean(req.body.isPlatformAdmin),
    req.user.id,
  );
  return sendSuccess(res, data, 200, "User updated");
});

export const health = asyncHandler(async (_req: Request, res: Response) => {
  const data = await platformService.getSystemHealth();
  return sendSuccess(res, data);
});

export const audit = asyncHandler(async (req: Request, res: Response) => {
  const raw = req.query.limit;
  const limit =
    typeof raw === "string" && Number.isFinite(Number(raw))
      ? Number(raw)
      : 40;
  const data = await platformService.getAuditTrail(limit);
  return sendSuccess(res, data);
});
