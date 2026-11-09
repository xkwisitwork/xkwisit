import type { ID, ISODateString } from "@/types/common";

/**
 * Integrations feature types.
 */

export type IntegrationsStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Integrations = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: IntegrationsStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type IntegrationsListItem = Pick<
  Integrations,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type IntegrationsFilterState = {
  search: string;
  statuses: IntegrationsStatus[];
  clientId: string | null;
};

export const emptyIntegrationsFilters: IntegrationsFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateIntegrationsPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: IntegrationsStatus;
};

export type UpdateIntegrationsPayload = Partial<CreateIntegrationsPayload>;

export type IntegrationsStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
