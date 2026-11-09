import type { ID, ISODateString } from "@/types/common";

/**
 * Deals feature types.
 */

export type DealsStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Deals = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: DealsStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type DealsListItem = Pick<
  Deals,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type DealsFilterState = {
  search: string;
  statuses: DealsStatus[];
  clientId: string | null;
};

export const emptyDealsFilters: DealsFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateDealsPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: DealsStatus;
};

export type UpdateDealsPayload = Partial<CreateDealsPayload>;

export type DealsStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
