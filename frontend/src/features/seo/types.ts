import type { ID, ISODateString } from "@/types/common";

/* ─── Enums ──────────────────────────────────────────── */

export type SeoIssueSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export type SeoDimension = "TECHNICAL" | "CONTENT" | "AUTHORITY" | "LOCAL" | "UX";

export type RankingTrend = "up" | "down" | "flat" | "new";

/* ─── Overview ───────────────────────────────────────── */

export type SeoOverview = {
  clientId: ID;
  clientName: string;
  domain: string;
  healthScore: number;
  healthLabel: string;
  dimensions: SeoDimensionScore[];
  lastAuditedAt: ISODateString | null;
};

export type SeoDimensionScore = {
  dimension: SeoDimension;
  score: number;
  weight: number;
  issueCount: number;
};

/* ─── Technical ──────────────────────────────────────── */

export type TechnicalIssue = {
  id: ID;
  clientId: ID;
  title: string;
  description: string;
  severity: SeoIssueSeverity;
  category: string;
  affectedUrls: number;
  detectedAt: ISODateString;
  resolvedAt: ISODateString | null;
};

export type CoreWebVitalMetric = {
  name: "LCP" | "INP" | "CLS" | "FCP" | "TTFB";
  value: number;
  unit: "s" | "ms" | "score";
  rating: "good" | "needs_improvement" | "poor";
};

/* ─── Rankings / keywords ────────────────────────────── */

export type KeywordRanking = {
  id: ID;
  clientId: ID;
  keyword: string;
  position: number | null;
  previousPosition: number | null;
  trend: RankingTrend;
  searchVolume: number | null;
  url: string | null;
  updatedAt: ISODateString;
};

/* ─── Backlinks ──────────────────────────────────────── */

export type Backlink = {
  id: ID;
  clientId: ID;
  sourceUrl: string;
  sourceDomain: string;
  targetUrl: string;
  anchorText: string | null;
  domainRating: number | null;
  isFollow: boolean;
  firstSeenAt: ISODateString | null;
  lastSeenAt: ISODateString | null;
};

/* ─── Local ──────────────────────────────────────────── */

export type BusinessProfile = {
  clientId: ID;
  businessName: string;
  primaryCategory: string | null;
  phone: string | null;
  address: string | null;
  website: string | null;
  rating: number | null;
  reviewCount: number | null;
  profileUrl: string | null;
};

export type NapListing = {
  id: ID;
  directory: string;
  name: string | null;
  address: string | null;
  phone: string | null;
  isConsistent: boolean;
  listingUrl: string | null;
};

export type LocalSeoSnapshot = {
  clientId: ID;
  profile: BusinessProfile;
  napListings: NapListing[];
  consistencyScore: number;
};

/* ─── Content SEO ────────────────────────────────────── */

export type SeoContentRow = {
  id: ID;
  title: string;
  url: string;
  wordCount: number | null;
  targetKeyword: string | null;
  position: number | null;
  trafficEstimate: number | null;
  lastUpdatedAt: ISODateString | null;
};

/* ─── Filters ────────────────────────────────────────── */

export type SeoFilters = {
  clientId: string;
  search: string;
  severities: SeoIssueSeverity[];
};

export const emptySeoFilters = (clientId: string): SeoFilters => ({
  clientId,
  search: "",
  severities: [],
});
