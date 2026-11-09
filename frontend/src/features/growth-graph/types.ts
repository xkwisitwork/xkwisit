import type { ID, ISODateString } from "@/types/common";

/**
 * GrowthGraph feature types.
 */

export type GrowthGraphStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type GrowthGraph = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: GrowthGraphStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type GrowthGraphListItem = Pick<
  GrowthGraph,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type GrowthGraphFilterState = {
  search: string;
  statuses: GrowthGraphStatus[];
  clientId: string | null;
};

export const emptyGrowthGraphFilters: GrowthGraphFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateGrowthGraphPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: GrowthGraphStatus;
};

export type UpdateGrowthGraphPayload = Partial<CreateGrowthGraphPayload>;

export type GrowthGraphStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
