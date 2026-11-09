import type { ID, ISODateString } from "@/types/common";

/* ─── Enums ──────────────────────────────────────────── */

export type ReviewSource = "GOOGLE" | "FACEBOOK" | "YELP" | "TRUSTPILOT" | "OTHER";

export type ReviewSentiment = "POSITIVE" | "NEUTRAL" | "NEGATIVE";

export type ReviewResponseStatus = "PENDING" | "DRAFTED" | "PUBLISHED" | "SKIPPED";

/* ─── Overview ───────────────────────────────────────── */

export type ReputationOverview = {
  clientId: ID;
  clientName: string;
  averageRating: number;
  reviewCount: number;
  responseRate: number;
  pendingResponses: number;
  sentimentSplit: SentimentSplit;
  ratingTrend: RatingPoint[];
};

export type SentimentSplit = {
  positive: number;
  neutral: number;
  negative: number;
};

export type RatingPoint = {
  date: ISODateString;
  averageRating: number;
  reviewCount: number;
};

/* ─── Reviews ────────────────────────────────────────── */

export type Review = {
  id: ID;
  clientId: ID;
  source: ReviewSource;
  authorName: string;
  rating: number;
  body: string | null;
  sentiment: ReviewSentiment;
  respondedAt: ISODateString | null;
  responseStatus: ReviewResponseStatus;
  responseBody: string | null;
  reviewedAt: ISODateString;
  externalUrl: string | null;
};

export type ReviewListItem = Pick<
  Review,
  | "id"
  | "source"
  | "authorName"
  | "rating"
  | "body"
  | "sentiment"
  | "responseStatus"
  | "reviewedAt"
>;

/* ─── Sentiment ──────────────────────────────────────── */

export type ReputationTheme = {
  id: ID;
  label: string;
  mentionCount: number;
  sentiment: ReviewSentiment;
  exampleSnippet: string | null;
};

export type SentimentSnapshot = {
  clientId: ID;
  periodLabel: string;
  split: SentimentSplit;
  positiveThemes: ReputationTheme[];
  complaintThemes: ReputationTheme[];
  ratingTrend: RatingPoint[];
};

/* ─── Payloads ───────────────────────────────────────── */

export type RespondToReviewPayload = {
  body: string;
  publish?: boolean;
};

export type ReviewFilters = {
  clientId: string;
  search: string;
  sources: ReviewSource[];
  sentiments: ReviewSentiment[];
  responseStatuses: ReviewResponseStatus[];
};

export const emptyReviewFilters = (clientId: string): ReviewFilters => ({
  clientId,
  search: "",
  sources: [],
  sentiments: [],
  responseStatuses: [],
});
