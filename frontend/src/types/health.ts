import type { ID, ISODateString } from "./common";

/**
 * Health domain types.
 */

export type HealthStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | "CANCELLED";

export type Health = {
  id: ID;
  organizationId: ID;
  name: string;
  status: HealthStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type HealthListItem = Pick<
  Health,
  "id" | "name" | "status" | "createdAt" | "updatedAt"
>;

export type HealthFilterState = {
  search: string;
  statuses: HealthStatus[];
};

export const emptyHealthFilters: HealthFilterState = {
  search: "",
  statuses: [],
};

export type CreateHealthPayload = {
  name: string;
  description?: string | null;
  status?: HealthStatus;
  metadata?: Record<string, unknown>;
};

export type UpdateHealthPayload = Partial<CreateHealthPayload>;
