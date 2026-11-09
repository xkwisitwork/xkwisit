import type { ID, ISODateString } from "@/types/common";

/**
 * Permissions feature types.
 */

export type PermissionsStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Permissions = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: PermissionsStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type PermissionsListItem = Pick<
  Permissions,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type PermissionsFilterState = {
  search: string;
  statuses: PermissionsStatus[];
  clientId: string | null;
};

export const emptyPermissionsFilters: PermissionsFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreatePermissionsPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: PermissionsStatus;
};

export type UpdatePermissionsPayload = Partial<CreatePermissionsPayload>;

export type PermissionsStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
