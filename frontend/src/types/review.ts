import type { ID, ISODateString } from "./common";

/**
 * Review domain types.
 */

export type ReviewStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | "CANCELLED";

export type Review = {
  id: ID;
  organizationId: ID;
  name: string;
  status: ReviewStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ReviewListItem = Pick<
  Review,
  "id" | "name" | "status" | "createdAt" | "updatedAt"
>;

export type ReviewFilterState = {
  search: string;
  statuses: ReviewStatus[];
};

export const emptyReviewFilters: ReviewFilterState = {
  search: "",
  statuses: [],
};

export type CreateReviewPayload = {
  name: string;
  description?: string | null;
  status?: ReviewStatus;
  metadata?: Record<string, unknown>;
};

export type UpdateReviewPayload = Partial<CreateReviewPayload>;
