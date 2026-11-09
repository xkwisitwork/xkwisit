import type { ID, ISODateString } from "@/types/common";

/**
 * Expansion feature types.
 */

export type ExpansionStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Expansion = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: ExpansionStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ExpansionListItem = Pick<
  Expansion,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type ExpansionFilterState = {
  search: string;
  statuses: ExpansionStatus[];
  clientId: string | null;
};

export const emptyExpansionFilters: ExpansionFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateExpansionPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: ExpansionStatus;
};

export type UpdateExpansionPayload = Partial<CreateExpansionPayload>;

export type ExpansionStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
