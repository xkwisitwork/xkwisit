import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type NotificationChannel = "IN_APP" | "EMAIL" | "PUSH";
export type NotificationKind =
  | "SYSTEM"
  | "MENTION"
  | "ASSIGNMENT"
  | "APPROVAL"
  | "INVOICE"
  | "LEAD"
  | "REPORT"
  | "ALERT";

export type AppNotification = {
  id: ID;
  organizationId: ID;
  userId: ID;
  kind: NotificationKind;
  channel: NotificationChannel;
  title: string;
  body: string;
  href: string | null;
  readAt: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
};

export type NotificationListItem = Pick<AppNotification, "id" | "kind" | "title" | "body" | "href" | "readAt" | "createdAt">;
export type CreateNotificationPayload = {
  userId: ID;
  kind: NotificationKind;
  title: string;
  body: string;
  channel?: NotificationChannel;
  href?: string | null;
  metadata?: Record<string, unknown>;
};
