import type { ID, ISODateString } from "./common";

/**
 * Integration domain types.
 */

export type IntegrationStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | "CANCELLED";

export type Integration = {
  id: ID;
  organizationId: ID;
  name: string;
  status: IntegrationStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type IntegrationListItem = Pick<
  Integration,
  "id" | "name" | "status" | "createdAt" | "updatedAt"
>;

export type IntegrationFilterState = {
  search: string;
  statuses: IntegrationStatus[];
};

export const emptyIntegrationFilters: IntegrationFilterState = {
  search: "",
  statuses: [],
};

export type CreateIntegrationPayload = {
  name: string;
  description?: string | null;
  status?: IntegrationStatus;
  metadata?: Record<string, unknown>;
};

export type UpdateIntegrationPayload = Partial<CreateIntegrationPayload>;
