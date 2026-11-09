import type { ID, ISODateString } from "@/types/common";

/**
 * Feedback feature types.
 */

export type FeedbackStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Feedback = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: FeedbackStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type FeedbackListItem = Pick<
  Feedback,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type FeedbackFilterState = {
  search: string;
  statuses: FeedbackStatus[];
  clientId: string | null;
};

export const emptyFeedbackFilters: FeedbackFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateFeedbackPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: FeedbackStatus;
};

export type UpdateFeedbackPayload = Partial<CreateFeedbackPayload>;

export type FeedbackStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
