import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { forbidden } from "../../utils/errors.js";
import { sendSuccess } from "../../utils/response.js";
import * as orgsService from "./organizations.service.js";

export const getCurrent = asyncHandler(async (req: Request, res: Response) => {
  const orgId = req.orgId ?? req.user?.orgId;
  if (!orgId) throw forbidden("Organization context required");
  const org = await orgsService.getCurrentOrganization(orgId);
  return sendSuccess(res, org);
});

export const listMembers = asyncHandler(async (req: Request, res: Response) => {
  const orgId = req.orgId ?? req.user?.orgId;
  if (!orgId) throw forbidden("Organization context required");
  const members = await orgsService.listCurrentMembers(orgId);
  return sendSuccess(res, members);
});
