import type { ID, ISODateString } from "@/types/common";

/**
 * Metrics feature types.
 */

export type MetricsStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Metrics = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: MetricsStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type MetricsListItem = Pick<
  Metrics,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type MetricsFilterState = {
  search: string;
  statuses: MetricsStatus[];
  clientId: string | null;
};

export const emptyMetricsFilters: MetricsFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateMetricsPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: MetricsStatus;
};

export type UpdateMetricsPayload = Partial<CreateMetricsPayload>;

export type MetricsStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
