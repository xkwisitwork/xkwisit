import type { ID, ISODateString } from "./common.types.js";
import type { UserRole } from "../models/User.js";

export type PermissionKey = string;

export type RolePermissionMap = Record<UserRole, PermissionKey[]>;

export type PermissionGrant = {
  id: ID;
  organizationId: ID;
  userId: ID | null;
  role: UserRole | null;
  permission: PermissionKey;
  grantedById: ID | null;
  createdAt: ISODateString;
};
