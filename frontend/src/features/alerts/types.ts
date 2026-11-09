import type { ID, ISODateString } from "@/types/common";

/**
 * Alerts feature types.
 */

export type AlertsStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Alerts = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: AlertsStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type AlertsListItem = Pick<
  Alerts,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type AlertsFilterState = {
  search: string;
  statuses: AlertsStatus[];
  clientId: string | null;
};

export const emptyAlertsFilters: AlertsFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateAlertsPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: AlertsStatus;
};

export type UpdateAlertsPayload = Partial<CreateAlertsPayload>;

export type AlertsStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
