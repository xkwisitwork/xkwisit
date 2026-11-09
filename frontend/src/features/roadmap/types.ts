import type { ID, ISODateString } from "@/types/common";

/**
 * Roadmap feature types.
 */

export type RoadmapStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Roadmap = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: RoadmapStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type RoadmapListItem = Pick<
  Roadmap,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type RoadmapFilterState = {
  search: string;
  statuses: RoadmapStatus[];
  clientId: string | null;
};

export const emptyRoadmapFilters: RoadmapFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateRoadmapPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: RoadmapStatus;
};

export type UpdateRoadmapPayload = Partial<CreateRoadmapPayload>;

export type RoadmapStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
