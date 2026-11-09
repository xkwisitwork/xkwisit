import type { ID, ISODateString } from "./common";

/**
 * Permission domain types.
 */

export type PermissionStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | "CANCELLED";

export type Permission = {
  id: ID;
  organizationId: ID;
  name: string;
  status: PermissionStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type PermissionListItem = Pick<
  Permission,
  "id" | "name" | "status" | "createdAt" | "updatedAt"
>;

export type PermissionFilterState = {
  search: string;
  statuses: PermissionStatus[];
};

export const emptyPermissionFilters: PermissionFilterState = {
  search: "",
  statuses: [],
};

export type CreatePermissionPayload = {
  name: string;
  description?: string | null;
  status?: PermissionStatus;
  metadata?: Record<string, unknown>;
};

export type UpdatePermissionPayload = Partial<CreatePermissionPayload>;
