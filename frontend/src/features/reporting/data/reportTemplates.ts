import type { ReportPeriod, ReportTemplate } from "../types";

export const REPORT_TEMPLATES: ReportTemplate[] = [
  {
    id: "monthly-performance",
    name: "Monthly performance",
    description: "Traffic, leads, and conversion snapshot.",
    period: "MONTHLY",
    sectionTitles: ["Highlights", "Channels", "Next steps"],
  },
  {
    id: "quarterly-growth",
    name: "Quarterly growth",
    description: "Quarterly scorecard and roadmap progress.",
    period: "QUARTERLY",
    sectionTitles: ["Scorecard", "Wins", "Risks", "Plan"],
  },
  {
    id: "weekly-pulse",
    name: "Weekly pulse",
    description: "Short weekly status for stakeholders.",
    period: "WEEKLY",
    sectionTitles: ["This week", "Blockers", "Ask"],
  },
];

export function templateById(id: string): ReportTemplate | undefined {
  return REPORT_TEMPLATES.find((t) => t.id === id);
}

export function periodLabel(period: ReportPeriod): string {
  return period.charAt(0) + period.slice(1).toLowerCase();
}
