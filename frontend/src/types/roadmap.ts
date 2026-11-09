import type { ID, ISODateString } from "./common";

/**
 * Roadmap domain types.
 */

export type RoadmapStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | "CANCELLED";

export type Roadmap = {
  id: ID;
  organizationId: ID;
  name: string;
  status: RoadmapStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type RoadmapListItem = Pick<
  Roadmap,
  "id" | "name" | "status" | "createdAt" | "updatedAt"
>;

export type RoadmapFilterState = {
  search: string;
  statuses: RoadmapStatus[];
};

export const emptyRoadmapFilters: RoadmapFilterState = {
  search: "",
  statuses: [],
};

export type CreateRoadmapPayload = {
  name: string;
  description?: string | null;
  status?: RoadmapStatus;
  metadata?: Record<string, unknown>;
};

export type UpdateRoadmapPayload = Partial<CreateRoadmapPayload>;
