import type { ID, ISODateString } from "./common";

/**
 * Notification domain types.
 */

export type NotificationStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | "CANCELLED";

export type Notification = {
  id: ID;
  organizationId: ID;
  name: string;
  status: NotificationStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type NotificationListItem = Pick<
  Notification,
  "id" | "name" | "status" | "createdAt" | "updatedAt"
>;

export type NotificationFilterState = {
  search: string;
  statuses: NotificationStatus[];
};

export const emptyNotificationFilters: NotificationFilterState = {
  search: "",
  statuses: [],
};

export type CreateNotificationPayload = {
  name: string;
  description?: string | null;
  status?: NotificationStatus;
  metadata?: Record<string, unknown>;
};

export type UpdateNotificationPayload = Partial<CreateNotificationPayload>;
