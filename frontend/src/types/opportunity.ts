import type { ID, ISODateString } from "./common";

/**
 * Opportunity domain types.
 */

export type OpportunityStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | "CANCELLED";

export type Opportunity = {
  id: ID;
  organizationId: ID;
  name: string;
  status: OpportunityStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type OpportunityListItem = Pick<
  Opportunity,
  "id" | "name" | "status" | "createdAt" | "updatedAt"
>;

export type OpportunityFilterState = {
  search: string;
  statuses: OpportunityStatus[];
};

export const emptyOpportunityFilters: OpportunityFilterState = {
  search: "",
  statuses: [],
};

export type CreateOpportunityPayload = {
  name: string;
  description?: string | null;
  status?: OpportunityStatus;
  metadata?: Record<string, unknown>;
};

export type UpdateOpportunityPayload = Partial<CreateOpportunityPayload>;
