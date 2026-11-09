import type { ID, ISODateString } from "./common";

/**
 * Intelligence domain types.
 */

export type IntelligenceStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | "CANCELLED";

export type Intelligence = {
  id: ID;
  organizationId: ID;
  name: string;
  status: IntelligenceStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type IntelligenceListItem = Pick<
  Intelligence,
  "id" | "name" | "status" | "createdAt" | "updatedAt"
>;

export type IntelligenceFilterState = {
  search: string;
  statuses: IntelligenceStatus[];
};

export const emptyIntelligenceFilters: IntelligenceFilterState = {
  search: "",
  statuses: [],
};

export type CreateIntelligencePayload = {
  name: string;
  description?: string | null;
  status?: IntelligenceStatus;
  metadata?: Record<string, unknown>;
};

export type UpdateIntelligencePayload = Partial<CreateIntelligencePayload>;
