import type { ID, ISODateString } from "../../types/common.types.js";

export type MessageChannel = "EMAIL" | "SMS" | "WHATSAPP" | "SLACK" | "IN_APP";

export type OutboundMessage = {
  id: ID;
  organizationId: ID;
  channel: MessageChannel;
  to: string;
  subject: string | null;
  body: string;
  status: "QUEUED" | "SENT" | "FAILED";
  sentAt: ISODateString | null;
  createdAt: ISODateString;
};
