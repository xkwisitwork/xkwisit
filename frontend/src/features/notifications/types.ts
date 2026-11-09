import type { ID, ISODateString } from "@/types/common";

/**
 * Notifications feature types.
 */

export type NotificationsStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Notifications = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: NotificationsStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type NotificationsListItem = Pick<
  Notifications,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type NotificationsFilterState = {
  search: string;
  statuses: NotificationsStatus[];
  clientId: string | null;
};

export const emptyNotificationsFilters: NotificationsFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateNotificationsPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: NotificationsStatus;
};

export type UpdateNotificationsPayload = Partial<CreateNotificationsPayload>;

export type NotificationsStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
