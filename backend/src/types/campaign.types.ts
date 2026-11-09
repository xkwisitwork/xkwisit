import type { ID, ISODateString } from "./common.types.js";

/**
 * Campaign domain types.
 */

export type CampaignStatus =
  | "DRAFT"
  | "SCHEDULED"
  | "ACTIVE"
  | "PAUSED"
  | "COMPLETED"
  | "ARCHIVED";

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
  | "LEAD_GENERATION"
  | "BRAND_AWARENESS"
  | "CONVERSIONS"
  | "TRAFFIC"
  | "RETENTION";

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
  tags: string[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

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
  | "startDate"
  | "endDate"
  | "ownerName"
>;

export type CreateCampaignPayload = {
  clientId: ID;
  name: string;
  objective: CampaignObjective;
  channels?: CampaignChannel[];
  budgetAmount?: number;
  currency?: Campaign["currency"];
  startDate?: ISODateString | null;
  endDate?: ISODateString | null;
  description?: string | null;
};

export type UpdateCampaignPayload = Partial<CreateCampaignPayload> & {
  status?: CampaignStatus;
  spendAmount?: number;
  tags?: string[];
};
