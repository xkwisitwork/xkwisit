import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type IntegrationProvider =
  | "GOOGLE_ADS"
  | "GOOGLE_ANALYTICS"
  | "META"
  | "LINKEDIN"
  | "PAYSTACK"
  | "SLACK"
  | "WHATSAPP"
  | "RESEND"
  | "ZAPIER"
  | "OTHER";

export type IntegrationConnectionStatus = "CONNECTED" | "DISCONNECTED" | "ERROR" | "PENDING";

export type IntegrationConnection = {
  id: ID;
  organizationId: ID;
  provider: IntegrationProvider;
  status: IntegrationConnectionStatus;
  accountName: string | null;
  accountEmail: string | null;
  lastSyncedAt: ISODateString | null;
  errorMessage: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};
