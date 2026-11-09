import type { NextFunction, Request, Response } from "express";

import { forbidden } from "../utils/errors.js";

export function tenantMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const orgId = (req.headers["x-org-id"] as string) || req.user?.orgId;
  if (!orgId) {
    next(forbidden("Organization context required"));
    return;
  }
  req.orgId = orgId;
  next();
}
