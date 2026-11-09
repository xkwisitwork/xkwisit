export type GrowthDimensionId =
  | "digital-presence"
  | "brand"
  | "lead-generation"
  | "sales-conversion"
  | "customer-retention"
  | "operations"
  | "analytics";

export type GrowthQuestion = {
  id: string;
  dimension: GrowthDimensionId;
  prompt: string;
  type: "scale" | "boolean" | "choice" | "number" | "text";
  options?: ReadonlyArray<{ label: string; score: number; value?: string }>;
  placeholder?: string;
};

export type GrowthDimensionConfig = {
  id: GrowthDimensionId;
  label: string;
  description: string;
  weight: number;
};

export const growthDimensionConfigs: Record<
  GrowthDimensionId,
  GrowthDimensionConfig
> = {
  "digital-presence": {
    id: "digital-presence",
    label: "Digital Presence",
    description: "Website, social channels, and search visibility.",
    weight: 1.0,
  },
  brand: {
    id: "brand",
    label: "Brand",
    description: "Identity, positioning, and messaging clarity.",
    weight: 1.2,
  },
  "lead-generation": {
    id: "lead-generation",
    label: "Demand",
    description: "Volume and quality of inbound and outbound leads.",
    weight: 1.5,
  },
  "sales-conversion": {
    id: "sales-conversion",
    label: "Sales",
    description: "How effectively leads become customers.",
    weight: 1.5,
  },
  "customer-retention": {
    id: "customer-retention",
    label: "Retention",
    description: "Repeat purchase rate and lifetime value.",
    weight: 1.3,
  },
  operations: {
    id: "operations",
    label: "Operations",
    description: "Systems, automation, and internal process.",
    weight: 1.0,
  },
  analytics: {
    id: "analytics",
    label: "Analytics",
    description: "Measurement, attribution, and data visibility.",
    weight: 1.2,
  },
};

export const growthScoreBands = [
  { min: 85, label: "Exceptional" },
  { min: 70, label: "Strong" },
  { min: 55, label: "Developing" },
  { min: 40, label: "Underperforming" },
  { min: 0, label: "Critical" },
] as const;

export function bandForScore(score: number) {
  return (
    growthScoreBands.find((band) => score >= band.min) ??
    growthScoreBands[growthScoreBands.length - 1]
  );
}

export const assessmentQuestions: GrowthQuestion[] = [
  {
    id: "biz_name",
    dimension: "brand",
    prompt: "What’s the business name?",
    type: "text",
    placeholder: "e.g. Northline Commerce",
  },
  {
    id: "biz_model",
    dimension: "brand",
    prompt: "How do you mostly make money?",
    type: "choice",
    options: [
      { label: "Sell products online", score: 70, value: "ecommerce" },
      { label: "Sell services / consulting", score: 65, value: "services" },
      { label: "Both products and services", score: 75, value: "hybrid" },
      { label: "Marketplace / platform", score: 60, value: "platform" },
    ],
  },
  {
    id: "biz_revenue",
    dimension: "analytics",
    prompt: "Rough monthly revenue?",
    type: "choice",
    options: [
      { label: "Under ₦5M / $5k", score: 40, value: "under" },
      { label: "₦5M–₦25M / $5–25k", score: 55, value: "mid" },
      { label: "₦25M–₦100M / $25–100k", score: 70, value: "growth" },
      { label: "Over ₦100M / $100k", score: 85, value: "scale" },
    ],
  },
  {
    id: "mkt_channels",
    dimension: "lead-generation",
    prompt: "Where do most new customers come from?",
    type: "choice",
    options: [
      { label: "Paid ads", score: 60, value: "ads" },
      { label: "Referrals / word of mouth", score: 75, value: "referrals" },
      { label: "Organic search / content", score: 70, value: "organic" },
      { label: "We’re not sure", score: 35, value: "unknown" },
    ],
  },
  {
    id: "mkt_social",
    dimension: "digital-presence",
    prompt: "How strong is your online presence today?",
    type: "scale",
  },
  {
    id: "mkt_offer",
    dimension: "lead-generation",
    prompt: "Is your offer clear to a first-time visitor?",
    type: "scale",
  },
  {
    id: "mkt_seo",
    dimension: "digital-presence",
    prompt: "Do you actively work on SEO or content?",
    type: "boolean",
  },
  {
    id: "sales_followup",
    dimension: "sales-conversion",
    prompt: "How fast do you follow up on a new lead?",
    type: "choice",
    options: [
      { label: "Same day", score: 90, value: "same_day" },
      { label: "Within 2–3 days", score: 65, value: "few_days" },
      { label: "Within a week", score: 45, value: "week" },
      { label: "Often slips", score: 25, value: "slips" },
    ],
  },
  {
    id: "sales_conversion",
    dimension: "sales-conversion",
    prompt: "How well do leads turn into customers?",
    type: "scale",
  },
  {
    id: "sales_crm",
    dimension: "operations",
    prompt: "Do you use a CRM (or shared pipeline)?",
    type: "boolean",
  },
  {
    id: "brand_identity",
    dimension: "brand",
    prompt: "Do you have clear brand guidelines?",
    type: "boolean",
  },
  {
    id: "brand_positioning",
    dimension: "brand",
    prompt: "How different do you feel from competitors?",
    type: "scale",
  },
  {
    id: "brand_message",
    dimension: "brand",
    prompt: "Could your team explain your offer in one sentence?",
    type: "boolean",
  },
  {
    id: "ops_systems",
    dimension: "operations",
    prompt: "Are core processes written down?",
    type: "boolean",
  },
  {
    id: "ops_reporting",
    dimension: "analytics",
    prompt: "Do you review one scoreboard every week?",
    type: "boolean",
  },
  {
    id: "ops_retention",
    dimension: "customer-retention",
    prompt: "How intentional is your retention / follow-up?",
    type: "scale",
  },
];
