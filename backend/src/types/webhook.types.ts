import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type WebhookDeliveryStatus = "PENDING" | "DELIVERED" | "FAILED" | "RETRYING";

export type WebhookEndpoint = {
  id: ID;
  organizationId: ID;
  url: string;
  secret: string | null;
  events: string[];
  active: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type WebhookDelivery = {
  id: ID;
  endpointId: ID;
  event: string;
  status: WebhookDeliveryStatus;
  attempts: number;
  lastError: string | null;
  payload: Record<string, unknown>;
  deliveredAt: ISODateString | null;
  createdAt: ISODateString;
};
