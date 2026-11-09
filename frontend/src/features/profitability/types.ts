import type { ID, ISODateString } from "@/types/common";

/**
 * Profitability feature types.
 */

export type ProfitabilityStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Profitability = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: ProfitabilityStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ProfitabilityListItem = Pick<
  Profitability,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type ProfitabilityFilterState = {
  search: string;
  statuses: ProfitabilityStatus[];
  clientId: string | null;
};

export const emptyProfitabilityFilters: ProfitabilityFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateProfitabilityPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: ProfitabilityStatus;
};

export type UpdateProfitabilityPayload = Partial<CreateProfitabilityPayload>;

export type ProfitabilityStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
