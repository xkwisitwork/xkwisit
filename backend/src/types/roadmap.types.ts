import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type RoadmapItemStatus = "PLANNED" | "IN_PROGRESS" | "DONE" | "DEFERRED" | "CANCELLED";

export type RoadmapItem = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  title: string;
  status: RoadmapItemStatus;
  quarter: string | null;
  ownerId: ID | null;
  description: string | null;
  order: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};
