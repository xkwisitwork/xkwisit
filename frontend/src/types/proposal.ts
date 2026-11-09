import type { ID, ISODateString } from "./common";

/**
 * Proposal domain types.
 */

export type ProposalStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | "CANCELLED";

export type Proposal = {
  id: ID;
  organizationId: ID;
  name: string;
  status: ProposalStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ProposalListItem = Pick<
  Proposal,
  "id" | "name" | "status" | "createdAt" | "updatedAt"
>;

export type ProposalFilterState = {
  search: string;
  statuses: ProposalStatus[];
};

export const emptyProposalFilters: ProposalFilterState = {
  search: "",
  statuses: [],
};

export type CreateProposalPayload = {
  name: string;
  description?: string | null;
  status?: ProposalStatus;
  metadata?: Record<string, unknown>;
};

export type UpdateProposalPayload = Partial<CreateProposalPayload>;
