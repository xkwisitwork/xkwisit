import type { NextFunction, Request, Response } from "express";
import { ROLE_PERMISSIONS, type Permission } from "../constants/permissions.js";
import type { Role } from "../constants/roles.js";
import { forbidden, unauthorized } from "../utils/errors.js";

export function requirePermissions(...required: Permission[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(unauthorized());
    if (req.user.isPlatformAdmin) return next();

    const role = (req.user.role || "CLIENT_VIEWER") as Role;
    const granted = new Set(ROLE_PERMISSIONS[role] ?? []);
    const missing = required.filter((p) => !granted.has(p));
    if (missing.length > 0) {
      return next(forbidden("Missing required permissions"));
    }
    return next();
  };
}
