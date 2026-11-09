import type { ID, ISODateString } from "../../types/common.types.js";

export type FeedbackSentiment = "POSITIVE" | "NEUTRAL" | "NEGATIVE";

export type FeedbackEntry = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  authorName: string | null;
  authorEmail: string | null;
  rating: number | null;
  sentiment: FeedbackSentiment | null;
  message: string;
  createdAt: ISODateString;
};

export type CreateFeedbackPayload = {
  clientId?: ID | null;
  authorName?: string | null;
  authorEmail?: string | null;
  rating?: number | null;
  message: string;
};
