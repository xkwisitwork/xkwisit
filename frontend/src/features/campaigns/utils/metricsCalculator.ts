import type { StatusTone } from "@/components/ui/Badge";
import type { CampaignStatus } from "@/lib/constants/statuses";
import { CAMPAIGN_STATUS_LABELS } from "@/lib/constants/statuses";

import type { CampaignChannel, CampaignMetrics, CampaignObjective } from "../types";

export const CAMPAIGN_CHANNEL_LABELS: Record<CampaignChannel, string> = {
  GOOGLE_ADS: "Google Ads",
  META_ADS: "Meta Ads",
  LINKEDIN: "LinkedIn",
  INSTAGRAM: "Instagram",
  YOUTUBE: "YouTube",
  X: "X",
  EMAIL: "Email",
  SEO: "SEO",
  CONTENT: "Content",
  OTHER: "Other",
};

export const CAMPAIGN_OBJECTIVE_LABELS: Record<CampaignObjective, string> = {
  LEAD_GENERATION: "Lead generation",
  BRAND_AWARENESS: "Brand awareness",
  CONVERSIONS: "Conversions",
  TRAFFIC: "Traffic",
  RETENTION: "Retention",
};

export function campaignStatusTone(status: CampaignStatus): StatusTone {
  const map: Record<CampaignStatus, StatusTone> = {
    DRAFT: "muted",
    SCHEDULED: "info",
    ACTIVE: "success",
    PAUSED: "warning",
    COMPLETED: "info",
    ARCHIVED: "muted",
  };

  return map[status];
}

export function campaignStatusLabel(status: CampaignStatus): string {
  return CAMPAIGN_STATUS_LABELS[status];
}

export function campaignChannelLabel(channel: CampaignChannel): string {
  return CAMPAIGN_CHANNEL_LABELS[channel];
}

export function campaignObjectiveLabel(objective: CampaignObjective): string {
  return CAMPAIGN_OBJECTIVE_LABELS[objective];
}

export function computeRoas(revenue: number, spend: number): number {
  if (!spend || spend <= 0) return 0;
  return revenue / spend;
}

export function computeCtr(clicks: number, impressions: number): number {
  if (!impressions || impressions <= 0) return 0;
  return (clicks / impressions) * 100;
}

export function computeCpl(spend: number, leads: number): number {
  if (!leads || leads <= 0) return 0;
  return spend / leads;
}

export function summarizeMetrics(metrics: CampaignMetrics) {
  return {
    ...metrics,
    roas: metrics.roas || computeRoas(metrics.revenue, metrics.spend),
    ctr: metrics.ctr || computeCtr(metrics.clicks, metrics.impressions),
    cpl: metrics.cpl || computeCpl(metrics.spend, metrics.leads),
  };
}
