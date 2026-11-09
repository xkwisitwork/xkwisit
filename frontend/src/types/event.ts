import type { ID, ISODateString } from "./common";

/**
 * Event domain types.
 */

export type EventStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | "CANCELLED";

export type Event = {
  id: ID;
  organizationId: ID;
  name: string;
  status: EventStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type EventListItem = Pick<
  Event,
  "id" | "name" | "status" | "createdAt" | "updatedAt"
>;

export type EventFilterState = {
  search: string;
  statuses: EventStatus[];
};

export const emptyEventFilters: EventFilterState = {
  search: "",
  statuses: [],
};

export type CreateEventPayload = {
  name: string;
  description?: string | null;
  status?: EventStatus;
  metadata?: Record<string, unknown>;
};

export type UpdateEventPayload = Partial<CreateEventPayload>;
