import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type ContentStatus = "IDEA" | "DRAFT" | "IN_REVIEW" | "APPROVED" | "PUBLISHED" | "ARCHIVED";
export type ContentChannel = "BLOG" | "SOCIAL" | "EMAIL" | "LANDING" | "AD" | "OTHER";

export type ContentItem = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  title: string;
  status: ContentStatus;
  channel: ContentChannel;
  body: string | null;
  publishAt: ISODateString | null;
  publishedAt: ISODateString | null;
  ownerId: ID | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type CreateContentPayload = {
  title: string;
  clientId?: ID | null;
  channel?: ContentChannel;
  body?: string | null;
  publishAt?: ISODateString | null;
  ownerId?: ID | null;
};
export type UpdateContentPayload = Partial<CreateContentPayload> & { status?: ContentStatus; metadata?: Record<string, unknown> };
