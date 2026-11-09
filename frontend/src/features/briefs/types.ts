import type { ID, ISODateString } from "@/types/common";

/**
 * Briefs feature types.
 */

export type BriefsStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Briefs = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: BriefsStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type BriefsListItem = Pick<
  Briefs,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type BriefsFilterState = {
  search: string;
  statuses: BriefsStatus[];
  clientId: string | null;
};

export const emptyBriefsFilters: BriefsFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateBriefsPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: BriefsStatus;
};

export type UpdateBriefsPayload = Partial<CreateBriefsPayload>;

export type BriefsStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
