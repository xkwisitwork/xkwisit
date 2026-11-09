import type { ID, ISODateString } from "./common";

/**
 * Assessment domain types.
 */

export type AssessmentStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | "CANCELLED";

export type Assessment = {
  id: ID;
  organizationId: ID;
  name: string;
  status: AssessmentStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type AssessmentListItem = Pick<
  Assessment,
  "id" | "name" | "status" | "createdAt" | "updatedAt"
>;

export type AssessmentFilterState = {
  search: string;
  statuses: AssessmentStatus[];
};

export const emptyAssessmentFilters: AssessmentFilterState = {
  search: "",
  statuses: [],
};

export type CreateAssessmentPayload = {
  name: string;
  description?: string | null;
  status?: AssessmentStatus;
  metadata?: Record<string, unknown>;
};

export type UpdateAssessmentPayload = Partial<CreateAssessmentPayload>;
