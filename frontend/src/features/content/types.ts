import type { ID, ISODateString } from "@/types/common";
import type { ContentStatus } from "@/lib/constants/statuses";
import type { FunnelStageId } from "@/lib/constants/funnel-stages";

/* ─── Enums ──────────────────────────────────────────── */

export type ContentType =
  | "BLOG_POST"
  | "SOCIAL_POST"
  | "VIDEO"
  | "EMAIL"
  | "LANDING_PAGE"
  | "CASE_STUDY"
  | "WHITEPAPER"
  | "INFOGRAPHIC"
  | "PODCAST"
  | "OTHER";

export type ContentPlatform =
  | "WEBSITE"
  | "BLOG"
  | "INSTAGRAM"
  | "LINKEDIN"
  | "X"
  | "FACEBOOK"
  | "YOUTUBE"
  | "TIKTOK"
  | "EMAIL"
  | "PODCAST";

export type ContentObjective =
  "AWARENESS" | "CONSIDERATION" | "CONVERSION" | "RETENTION" | "AUTHORITY";

/* ─── Core ───────────────────────────────────────────── */

export type ContentItem = {
  id: ID;
  organizationId: ID;
  clientId: ID;
  clientName: string;
  campaignId: ID | null;
  campaignName: string | null;

  title: string;
  slug: string | null;
  type: ContentType;
  status: ContentStatus;
  platforms: ContentPlatform[];
  objective: ContentObjective;
  funnelStage: FunnelStageId;
  audience: string | null;
  cta: string | null;

  brief: string | null;
  body: string | null;
  notes: string | null;

  ownerId: ID | null;
  ownerName: string | null;
  writerId: ID | null;
  writerName: string | null;
  designerId: ID | null;
  designerName: string | null;

  dueDate: ISODateString | null;
  publishAt: ISODateString | null;
  publishedAt: ISODateString | null;

  parentContentId: ID | null;
  repurposedFromTitle: string | null;

  tags: string[];
  assetsCount: number;
  approvalStatus: "PENDING" | "APPROVED" | "CHANGES_REQUESTED" | "REJECTED" | null;

  createdAt: ISODateString;
  updatedAt: ISODateString;
};

/* ─── Performance ────────────────────────────────────── */

export type ContentPerformance = {
  contentId: ID;
  reach: number;
  impressions: number;
  engagement: number;
  clicks: number;
  leads: number;
  assistedConversions: number;
  customers: number;
  revenue: number;
  shares: number;
  saves: number;
  comments: number;
  engagementRate: number;
  ctr: number;
  recordedAt: ISODateString;
};

/* ─── Pipeline stages ────────────────────────────────── */

export type PipelineColumn = {
  status: ContentStatus;
  label: string;
  count: number;
  items: ContentListItem[];
};

/* ─── Calendar ───────────────────────────────────────── */

export type CalendarEntry = {
  id: ID;
  title: string;
  type: ContentType;
  status: ContentStatus;
  platforms: ContentPlatform[];
  publishAt: ISODateString;
  ownerName: string | null;
  clientName: string;
};

/* ─── List item ──────────────────────────────────────── */

export type ContentListItem = Pick<
  ContentItem,
  | "id"
  | "title"
  | "type"
  | "status"
  | "platforms"
  | "objective"
  | "clientId"
  | "clientName"
  | "campaignName"
  | "ownerName"
  | "dueDate"
  | "publishAt"
  | "publishedAt"
  | "approvalStatus"
  | "assetsCount"
>;

/* ─── Filters ────────────────────────────────────────── */

export type ContentFilters = {
  search: string;
  statuses: ContentStatus[];
  types: ContentType[];
  platforms: ContentPlatform[];
  objectives: ContentObjective[];
  clientId: string | null;
  campaignId: string | null;
  ownerId: string | null;
  fromDate: string | null;
  toDate: string | null;
};

export const emptyContentFilters: ContentFilters = {
  search: "",
  statuses: [],
  types: [],
  platforms: [],
  objectives: [],
  clientId: null,
  campaignId: null,
  ownerId: null,
  fromDate: null,
  toDate: null,
};

/* ─── Payloads ───────────────────────────────────────── */

export type CreateContentPayload = {
  clientId: string;
  campaignId?: string;
  title: string;
  type: ContentType;
  status?: ContentStatus;
  platforms: ContentPlatform[];
  objective: ContentObjective;
  funnelStage: FunnelStageId;
  audience?: string;
  cta?: string;
  brief?: string;
  body?: string;
  notes?: string;
  ownerId?: string;
  writerId?: string;
  designerId?: string;
  dueDate?: string;
  publishAt?: string;
  parentContentId?: string;
  tags?: string[];
};

export type UpdateContentPayload = Partial<CreateContentPayload> & {
  approvalStatus?: ContentItem["approvalStatus"];
};

/* ─── Stats ──────────────────────────────────────────── */

export type ContentStats = {
  total: number;
  inPipeline: number;
  awaitingApproval: number;
  scheduled: number;
  published: number;
  avgTimeToPublishDays: number;
  publishedThisMonth: number;
  topPerformingPlatform: ContentPlatform | null;
};
