/**
 * KPI definitions.
 * Every metric the platform tracks has a single source of truth here -
 * label, unit, format, direction, and category.
 */

export type KpiUnit = "currency" | "number" | "percent" | "ratio" | "duration" | "score";

export type KpiCategory =
  "ACQUISITION" | "CONVERSION" | "RETENTION" | "REVENUE" | "OPERATIONS" | "BRAND";

export type KpiDirection = "higher-is-better" | "lower-is-better" | "target-band";

export type KpiDefinition = {
  id: string;
  label: string;
  shortLabel: string;
  category: KpiCategory;
  unit: KpiUnit;
  direction: KpiDirection;
  description: string;
  formula?: string;
};

export const kpiDefinitions: KpiDefinition[] = [
  /* ─── Acquisition ──────────────────────────────────── */
  {
    id: "traffic",
    label: "Website Traffic",
    shortLabel: "Traffic",
    category: "ACQUISITION",
    unit: "number",
    direction: "higher-is-better",
    description: "Total sessions across all sources in the period.",
  },
  {
    id: "unique-visitors",
    label: "Unique Visitors",
    shortLabel: "Visitors",
    category: "ACQUISITION",
    unit: "number",
    direction: "higher-is-better",
    description: "Distinct users who visited the site in the period.",
  },
  {
    id: "leads",
    label: "Leads",
    shortLabel: "Leads",
    category: "ACQUISITION",
    unit: "number",
    direction: "higher-is-better",
    description: "Total leads captured across all sources.",
  },
  {
    id: "qualified-leads",
    label: "Qualified Leads",
    shortLabel: "Qualified",
    category: "ACQUISITION",
    unit: "number",
    direction: "higher-is-better",
    description: "Leads matching the ideal customer profile.",
  },
  {
    id: "cpl",
    label: "Cost Per Lead",
    shortLabel: "CPL",
    category: "ACQUISITION",
    unit: "currency",
    direction: "lower-is-better",
    description: "Media spend divided by leads generated.",
    formula: "spend / leads",
  },
  {
    id: "cac",
    label: "Customer Acquisition Cost",
    shortLabel: "CAC",
    category: "ACQUISITION",
    unit: "currency",
    direction: "lower-is-better",
    description: "Total acquisition cost divided by new customers.",
    formula: "(media + labour) / new_customers",
  },

  /* ─── Conversion ───────────────────────────────────── */
  {
    id: "lead-conversion",
    label: "Lead to Customer Conversion",
    shortLabel: "Conversion",
    category: "CONVERSION",
    unit: "percent",
    direction: "higher-is-better",
    description: "Percentage of leads that become customers.",
    formula: "customers / leads * 100",
  },
  {
    id: "landing-conversion",
    label: "Landing Page Conversion",
    shortLabel: "LP CVR",
    category: "CONVERSION",
    unit: "percent",
    direction: "higher-is-better",
    description: "Percentage of landing page visitors who submit.",
    formula: "submits / sessions * 100",
  },
  {
    id: "mql-to-sql",
    label: "MQL to SQL Rate",
    shortLabel: "MQL→SQL",
    category: "CONVERSION",
    unit: "percent",
    direction: "higher-is-better",
    description: "Percentage of marketing-qualified leads that sales-qualify.",
  },
  {
    id: "win-rate",
    label: "Win Rate",
    shortLabel: "Win Rate",
    category: "CONVERSION",
    unit: "percent",
    direction: "higher-is-better",
    description: "Percentage of opportunities that close won.",
    formula: "won / (won + lost) * 100",
  },
  {
    id: "sales-cycle",
    label: "Sales Cycle Length",
    shortLabel: "Cycle",
    category: "CONVERSION",
    unit: "duration",
    direction: "lower-is-better",
    description: "Average days from opportunity creation to close.",
  },

  /* ─── Retention ────────────────────────────────────── */
  {
    id: "repeat-rate",
    label: "Repeat Customer Rate",
    shortLabel: "Repeat",
    category: "RETENTION",
    unit: "percent",
    direction: "higher-is-better",
    description: "Percentage of customers with more than one purchase.",
  },
  {
    id: "churn",
    label: "Churn Rate",
    shortLabel: "Churn",
    category: "RETENTION",
    unit: "percent",
    direction: "lower-is-better",
    description: "Percentage of customers lost during the period.",
  },
  {
    id: "ltv",
    label: "Customer Lifetime Value",
    shortLabel: "LTV",
    category: "RETENTION",
    unit: "currency",
    direction: "higher-is-better",
    description: "Average total revenue per customer across their lifetime.",
  },
  {
    id: "ltv-cac",
    label: "LTV:CAC Ratio",
    shortLabel: "LTV:CAC",
    category: "RETENTION",
    unit: "ratio",
    direction: "higher-is-better",
    description: "Health check on unit economics. Target: 3x or higher.",
    formula: "ltv / cac",
  },

  /* ─── Revenue ──────────────────────────────────────── */
  {
    id: "revenue",
    label: "Revenue",
    shortLabel: "Revenue",
    category: "REVENUE",
    unit: "currency",
    direction: "higher-is-better",
    description: "Total revenue recognised in the period.",
  },
  {
    id: "mrr",
    label: "Monthly Recurring Revenue",
    shortLabel: "MRR",
    category: "REVENUE",
    unit: "currency",
    direction: "higher-is-better",
    description: "Predictable monthly recurring revenue.",
  },
  {
    id: "average-order",
    label: "Average Order Value",
    shortLabel: "AOV",
    category: "REVENUE",
    unit: "currency",
    direction: "higher-is-better",
    description: "Average value per order or deal.",
    formula: "revenue / orders",
  },
  {
    id: "roas",
    label: "Return on Ad Spend",
    shortLabel: "ROAS",
    category: "REVENUE",
    unit: "ratio",
    direction: "higher-is-better",
    description: "Attributed revenue divided by media spend.",
    formula: "revenue / media_spend",
  },

  /* ─── Operations ──────────────────────────────────── */
  {
    id: "response-time",
    label: "Lead Response Time",
    shortLabel: "Response",
    category: "OPERATIONS",
    unit: "duration",
    direction: "lower-is-better",
    description: "Average time from lead arrival to first contact.",
  },
  {
    id: "approval-turnaround",
    label: "Approval Turnaround",
    shortLabel: "Approvals",
    category: "OPERATIONS",
    unit: "duration",
    direction: "lower-is-better",
    description: "Average time for client approvals on deliverables.",
  },
  {
    id: "task-completion",
    label: "Task Completion Rate",
    shortLabel: "Completion",
    category: "OPERATIONS",
    unit: "percent",
    direction: "higher-is-better",
    description: "Percentage of tasks completed on or before deadline.",
  },

  /* ─── Brand ────────────────────────────────────────── */
  {
    id: "brand-sentiment",
    label: "Brand Sentiment",
    shortLabel: "Sentiment",
    category: "BRAND",
    unit: "score",
    direction: "higher-is-better",
    description: "Aggregate sentiment score across reviews and mentions.",
  },
  {
    id: "review-rating",
    label: "Average Review Rating",
    shortLabel: "Rating",
    category: "BRAND",
    unit: "score",
    direction: "higher-is-better",
    description: "Average star rating across public review platforms.",
  },
  {
    id: "share-of-voice",
    label: "Share of Voice",
    shortLabel: "SoV",
    category: "BRAND",
    unit: "percent",
    direction: "higher-is-better",
    description: "Estimated share of category conversations mentioning your brand.",
  },
];

export const kpisByCategory = kpiDefinitions.reduce<Record<KpiCategory, KpiDefinition[]>>(
  (acc, kpi) => {
    acc[kpi.category] = acc[kpi.category] ?? [];
    acc[kpi.category]!.push(kpi);

    return acc;
  },
  {} as Record<KpiCategory, KpiDefinition[]>,
);

export function getKpi(id: string): KpiDefinition | undefined {
  return kpiDefinitions.find((k) => k.id === id);
}
