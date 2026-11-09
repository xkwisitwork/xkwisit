import type { ID, ISODateString } from "@/types/common";

/**
 * Services feature types.
 */

export type ServicesStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Services = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: ServicesStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ServicesListItem = Pick<
  Services,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type ServicesFilterState = {
  search: string;
  statuses: ServicesStatus[];
  clientId: string | null;
};

export const emptyServicesFilters: ServicesFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateServicesPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: ServicesStatus;
};

export type UpdateServicesPayload = Partial<CreateServicesPayload>;

export type ServicesStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
