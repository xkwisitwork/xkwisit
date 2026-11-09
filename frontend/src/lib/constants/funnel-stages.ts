/**
 * Funnel stages and client lifecycle stages.
 * Funnel stages describe the marketing-to-revenue journey.
 * Lifecycle stages describe the relationship from prospect to renewal.
 */

/* ─── Marketing funnel ────────────────────────────── */

export const FUNNEL_STAGES = [
  { id: "traffic", label: "Traffic", description: "Sessions, visitors, and reach." },
  { id: "visitors", label: "Visitors", description: "Unique visitors to the site." },
  { id: "leads", label: "Leads", description: "Form fills, calls, and enquiries." },
  {
    id: "qualified",
    label: "Qualified Leads",
    description: "Leads that match the ideal customer profile.",
  },
  {
    id: "opportunities",
    label: "Opportunities",
    description: "Leads with an active sales conversation.",
  },
  { id: "proposals", label: "Proposals", description: "Formal proposals sent." },
  { id: "customers", label: "Customers", description: "Closed-won deals." },
  { id: "revenue", label: "Revenue", description: "Actual revenue collected." },
] as const;

export type FunnelStageId = (typeof FUNNEL_STAGES)[number]["id"];

export const FUNNEL_STAGE_ORDER: FunnelStageId[] = FUNNEL_STAGES.map((stage) => stage.id);

/* ─── Client lifecycle ────────────────────────────── */

export const LIFECYCLE_STAGES = [
  { id: "prospect", label: "Prospect", description: "First contact, not yet assessed." },
  { id: "assessment", label: "Assessment", description: "Growth Assessment completed." },
  {
    id: "discovery",
    label: "Discovery",
    description: "Discovery call or workshop held.",
  },
  {
    id: "proposal",
    label: "Proposal",
    description: "Proposal shared with the prospect.",
  },
  { id: "contract", label: "Contract", description: "Contract signed." },
  { id: "onboarding", label: "Onboarding", description: "Access, audit, and setup." },
  { id: "strategy", label: "Strategy", description: "Roadmap defined and approved." },
  {
    id: "execution",
    label: "Execution",
    description: "Active campaigns, projects, and delivery.",
  },
  {
    id: "measurement",
    label: "Measurement",
    description: "Performance tracking and reports.",
  },
  {
    id: "optimization",
    label: "Optimization",
    description: "Continuous improvement cycles.",
  },
  { id: "renewal", label: "Renewal", description: "Contract renewal evaluation." },
  { id: "expansion", label: "Expansion", description: "Additional services purchased." },
] as const;

export type LifecycleStageId = (typeof LIFECYCLE_STAGES)[number]["id"];

export const LIFECYCLE_STAGE_ORDER: LifecycleStageId[] = LIFECYCLE_STAGES.map(
  (stage) => stage.id,
);

/* ─── Growth score dimensions ──────────────────────── */

export const GROWTH_DIMENSIONS = [
  { id: "digital-presence", label: "Digital Presence" },
  { id: "brand", label: "Brand" },
  { id: "lead-generation", label: "Lead Generation" },
  { id: "sales-conversion", label: "Sales Conversion" },
  { id: "customer-retention", label: "Customer Retention" },
  { id: "operations", label: "Operations" },
  { id: "analytics", label: "Analytics" },
] as const;

export type GrowthDimensionId = (typeof GROWTH_DIMENSIONS)[number]["id"];

/* ─── Client health dimensions ─────────────────────── */

export const HEALTH_DIMENSIONS = [
  { id: "acquisition", label: "Acquisition" },
  { id: "conversion", label: "Conversion" },
  { id: "retention", label: "Retention" },
  { id: "brand", label: "Brand" },
  { id: "digital", label: "Digital" },
  { id: "operations", label: "Operations" },
  { id: "analytics", label: "Analytics" },
] as const;

export type HealthDimensionId = (typeof HEALTH_DIMENSIONS)[number]["id"];

/* ─── Lead sources ─────────────────────────────────── */

export const LEAD_SOURCES = [
  "Google Ads",
  "Meta Ads",
  "Instagram",
  "LinkedIn",
  "X (Twitter)",
  "Website",
  "Referral",
  "Organic Search",
  "YouTube",
  "Email",
  "WhatsApp",
  "Direct",
  "Event",
  "Cold Outreach",
  "Partnership",
  "Other",
] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number];
