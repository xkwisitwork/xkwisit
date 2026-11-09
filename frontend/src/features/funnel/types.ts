import type { ID, ISODateString } from "@/types/common";

/**
 * Funnel feature types.
 */

export type FunnelStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Funnel = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: FunnelStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type FunnelListItem = Pick<
  Funnel,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type FunnelFilterState = {
  search: string;
  statuses: FunnelStatus[];
  clientId: string | null;
};

export const emptyFunnelFilters: FunnelFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateFunnelPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: FunnelStatus;
};

export type UpdateFunnelPayload = Partial<CreateFunnelPayload>;

export type FunnelStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
