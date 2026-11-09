/**
 * Growth Score configuration.
 * Seven dimensions + assessment sections used by Business X-Ray / Growth Assessment.
 */

import type { GrowthDimensionId } from "@/lib/constants/funnel-stages";

export type GrowthQuestion = {
  id: string;
  dimension: GrowthDimensionId;
  prompt: string;
  type: "scale" | "boolean" | "choice" | "number" | "text";
  options?: ReadonlyArray<{ label: string; score: number; value?: string }>;
  weight?: number;
  placeholder?: string;
};

export type GrowthDimensionConfig = {
  id: GrowthDimensionId;
  label: string;
  description: string;
  weight: number;
  benchmarks: {
    poor: number;
    fair: number;
    good: number;
    excellent: number;
  };
};

export const growthDimensionConfigs: Record<GrowthDimensionId, GrowthDimensionConfig> = {
  "digital-presence": {
    id: "digital-presence",
    label: "Digital Presence",
    description: "Website, social channels, and search visibility.",
    weight: 1.0,
    benchmarks: { poor: 40, fair: 60, good: 75, excellent: 90 },
  },
  brand: {
    id: "brand",
    label: "Brand",
    description: "Identity, positioning, and messaging clarity.",
    weight: 1.2,
    benchmarks: { poor: 40, fair: 60, good: 75, excellent: 90 },
  },
  "lead-generation": {
    id: "lead-generation",
    label: "Demand",
    description: "Volume and quality of inbound and outbound leads.",
    weight: 1.5,
    benchmarks: { poor: 35, fair: 55, good: 72, excellent: 88 },
  },
  "sales-conversion": {
    id: "sales-conversion",
    label: "Sales",
    description: "How effectively leads become customers.",
    weight: 1.5,
    benchmarks: { poor: 30, fair: 50, good: 70, excellent: 88 },
  },
  "customer-retention": {
    id: "customer-retention",
    label: "Retention",
    description: "Repeat purchase rate and lifetime value.",
    weight: 1.3,
    benchmarks: { poor: 40, fair: 60, good: 78, excellent: 92 },
  },
  operations: {
    id: "operations",
    label: "Operations",
    description: "Systems, automation, and internal process.",
    weight: 1.0,
    benchmarks: { poor: 35, fair: 55, good: 72, excellent: 88 },
  },
  analytics: {
    id: "analytics",
    label: "Analytics",
    description: "Measurement, attribution, and data visibility.",
    weight: 1.2,
    benchmarks: { poor: 30, fair: 50, good: 68, excellent: 85 },
  },
};

export const growthScoreBands = [
  { min: 85, label: "Exceptional", level: "EXCELLENT" as const },
  { min: 70, label: "Strong", level: "STABLE" as const },
  { min: 55, label: "Developing", level: "ATTENTION" as const },
  { min: 40, label: "Underperforming", level: "AT_RISK" as const },
  { min: 0, label: "Critical", level: "CRITICAL" as const },
];

export function bandForScore(score: number) {
  return (
    growthScoreBands.find((band) => score >= band.min) ??
    growthScoreBands[growthScoreBands.length - 1]
  );
}

export const growthAssessmentSections = [
  {
    id: "business",
    title: "Your business",
    description: "A few basics so we can score the right picture.",
    questions: [
      {
        id: "biz_name",
        dimension: "brand" as const,
        prompt: "What’s the business name?",
        type: "text" as const,
        placeholder: "e.g. Northline Commerce",
      },
      {
        id: "biz_model",
        dimension: "brand" as const,
        prompt: "How do you mostly make money?",
        type: "choice" as const,
        options: [
          { label: "Sell products online", score: 70, value: "ecommerce" },
          { label: "Sell services / consulting", score: 65, value: "services" },
          { label: "Both products and services", score: 75, value: "hybrid" },
          { label: "Marketplace / platform", score: 60, value: "platform" },
        ],
      },
      {
        id: "biz_revenue",
        dimension: "analytics" as const,
        prompt: "Rough monthly revenue?",
        type: "choice" as const,
        options: [
          { label: "Under ₦5M / $5k", score: 40, value: "under" },
          { label: "₦5M–₦25M / $5–25k", score: 55, value: "mid" },
          { label: "₦25M–₦100M / $25–100k", score: 70, value: "growth" },
          { label: "Over ₦100M / $100k", score: 85, value: "scale" },
        ],
      },
    ],
  },
  {
    id: "demand",
    title: "Demand",
    description: "How people find you - and whether that traffic is useful.",
    questions: [
      {
        id: "mkt_channels",
        dimension: "lead-generation" as const,
        prompt: "Where do most new customers come from?",
        type: "choice" as const,
        options: [
          { label: "Paid ads", score: 60, value: "ads" },
          { label: "Referrals / word of mouth", score: 75, value: "referrals" },
          { label: "Organic search / content", score: 70, value: "organic" },
          { label: "We’re not sure", score: 35, value: "unknown" },
        ],
      },
      {
        id: "mkt_social",
        dimension: "digital-presence" as const,
        prompt: "How strong is your online presence today?",
        type: "scale" as const,
      },
      {
        id: "mkt_offer",
        dimension: "lead-generation" as const,
        prompt: "Is your offer clear to a first-time visitor?",
        type: "scale" as const,
      },
      {
        id: "mkt_seo",
        dimension: "digital-presence" as const,
        prompt: "Do you actively work on SEO or content?",
        type: "boolean" as const,
      },
    ],
  },
  {
    id: "sales",
    title: "Sales",
    description: "What happens after someone raises their hand.",
    questions: [
      {
        id: "sales_followup",
        dimension: "sales-conversion" as const,
        prompt: "How fast do you follow up on a new lead?",
        type: "choice" as const,
        options: [
          { label: "Same day", score: 90, value: "same_day" },
          { label: "Within 2–3 days", score: 65, value: "few_days" },
          { label: "Within a week", score: 45, value: "week" },
          { label: "Often slips", score: 25, value: "slips" },
        ],
      },
      {
        id: "sales_conversion",
        dimension: "sales-conversion" as const,
        prompt: "How well do leads turn into customers?",
        type: "scale" as const,
      },
      {
        id: "sales_crm",
        dimension: "operations" as const,
        prompt: "Do you use a CRM (or shared pipeline)?",
        type: "boolean" as const,
      },
    ],
  },
  {
    id: "brand",
    title: "Brand",
    description: "Whether people know what you stand for.",
    questions: [
      {
        id: "brand_identity",
        dimension: "brand" as const,
        prompt: "Do you have clear brand guidelines?",
        type: "boolean" as const,
      },
      {
        id: "brand_positioning",
        dimension: "brand" as const,
        prompt: "How different do you feel from competitors?",
        type: "scale" as const,
      },
      {
        id: "brand_message",
        dimension: "brand" as const,
        prompt: "Could your team explain your offer in one sentence?",
        type: "boolean" as const,
      },
    ],
  },
  {
    id: "ops",
    title: "Ops & retention",
    description: "The systems that keep growth from leaking.",
    questions: [
      {
        id: "ops_systems",
        dimension: "operations" as const,
        prompt: "Are core processes written down?",
        type: "boolean" as const,
      },
      {
        id: "ops_reporting",
        dimension: "analytics" as const,
        prompt: "Do you look at the same numbers every week?",
        type: "boolean" as const,
      },
      {
        id: "ops_retention",
        dimension: "customer-retention" as const,
        prompt: "How intentional is your retention / follow-up?",
        type: "scale" as const,
      },
    ],
  },
] as const;

export type GrowthAssessmentSection = (typeof growthAssessmentSections)[number];
