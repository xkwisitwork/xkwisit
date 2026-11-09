import type { ID, ISODateString, Money } from "@/types/common";
import type { CampaignStatus } from "@/lib/constants/statuses";

export type CampaignChannel =
  | "GOOGLE_ADS"
  | "META_ADS"
  | "LINKEDIN"
  | "INSTAGRAM"
  | "YOUTUBE"
  | "X"
  | "EMAIL"
  | "SEO"
  | "CONTENT"
  | "OTHER";

export type CampaignObjective =
  "LEAD_GENERATION" | "BRAND_AWARENESS" | "CONVERSIONS" | "TRAFFIC" | "RETENTION";

/* ─── Core ───────────────────────────────────────────── */

export type Campaign = {
  id: ID;
  organizationId: ID;
  clientId: ID;
  clientName: string;
  name: string;
  objective: CampaignObjective;
  status: CampaignStatus;
  channels: CampaignChannel[];
  budgetAmount: number;
  currency: "NGN" | "USD" | "GBP" | "EUR";
  spendAmount: number;
  startDate: ISODateString | null;
  endDate: ISODateString | null;
  ownerId: ID | null;
  ownerName: string | null;
  description: string | null;
  landingPageUrl: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  tags: string[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

/* ─── Metrics ────────────────────────────────────────── */

export type CampaignMetrics = {
  impressions: number;
  reach: number;
  clicks: number;
  ctr: number;
  cpc: number;
  cpm: number;
  leads: number;
  qualifiedLeads: number;
  cpl: number;
  opportunities: number;
  customers: number;
  revenue: number;
  roas: number;
  spend: number;
};

/* ─── Channel breakdown row ──────────────────────────── */

export type ChannelBreakdownRow = {
  channel: CampaignChannel;
  spend: number;
  impressions: number;
  clicks: number;
  leads: number;
  customers: number;
  revenue: number;
  roas: number;
};

/* ─── Attribution row ────────────────────────────────── */

export type AttributionRow = {
  leadId: ID;
  leadName: string;
  source: string;
  firstTouch: string;
  lastTouch: string;
  customerId: ID | null;
  revenue: number;
  closedAt: ISODateString | null;
};

/* ─── List item ──────────────────────────────────────── */

export type CampaignListItem = Pick<
  Campaign,
  | "id"
  | "name"
  | "clientId"
  | "clientName"
  | "objective"
  | "status"
  | "channels"
  | "budgetAmount"
  | "spendAmount"
  | "currency"
  | "startDate"
  | "endDate"
  | "ownerName"
> & {
  leads: number;
  revenue: number;
  roas: number;
};

/* ─── Filters ────────────────────────────────────────── */

export type CampaignFilters = {
  search: string;
  statuses: CampaignStatus[];
  channels: CampaignChannel[];
  objectives: CampaignObjective[];
  clientId: string | null;
};

export const emptyCampaignFilters: CampaignFilters = {
  search: "",
  statuses: [],
  channels: [],
  objectives: [],
  clientId: null,
};

/* ─── Payloads ───────────────────────────────────────── */

export type CreateCampaignPayload = {
  clientId: string;
  name: string;
  objective: CampaignObjective;
  channels: CampaignChannel[];
  status?: CampaignStatus;
  budgetAmount: number;
  currency?: "NGN" | "USD" | "GBP" | "EUR";
  startDate?: string;
  endDate?: string;
  ownerId?: string;
  description?: string;
  landingPageUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  tags?: string[];
};

export type UpdateCampaignPayload = Partial<CreateCampaignPayload>;

/* ─── Stats ──────────────────────────────────────────── */

export type CampaignStats = {
  total: number;
  active: number;
  paused: number;
  totalSpend: Money;
  totalRevenue: Money;
  averageRoas: number;
};
