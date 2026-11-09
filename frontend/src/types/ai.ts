import type { ID, ISODateString } from "./common";

/**
 * Ai domain types.
 */

export type AiStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | "CANCELLED";

export type Ai = {
  id: ID;
  organizationId: ID;
  name: string;
  status: AiStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type AiListItem = Pick<Ai, "id" | "name" | "status" | "createdAt" | "updatedAt">;

export type AiFilterState = {
  search: string;
  statuses: AiStatus[];
};

export const emptyAiFilters: AiFilterState = {
  search: "",
  statuses: [],
};

export type CreateAiPayload = {
  name: string;
  description?: string | null;
  status?: AiStatus;
  metadata?: Record<string, unknown>;
};

export type UpdateAiPayload = Partial<CreateAiPayload>;
