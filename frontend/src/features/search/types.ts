import type { ID, ISODateString } from "@/types/common";

/**
 * Search feature types.
 */

export type SearchStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Search = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: SearchStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type SearchListItem = Pick<
  Search,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type SearchFilterState = {
  search: string;
  statuses: SearchStatus[];
  clientId: string | null;
};

export const emptySearchFilters: SearchFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateSearchPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: SearchStatus;
};

export type UpdateSearchPayload = Partial<CreateSearchPayload>;

export type SearchStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
