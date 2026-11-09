import type { ReportSection } from "../types";

export function orderSections(sections: ReportSection[]): ReportSection[] {
  return [...sections].sort((a, b) => a.order - b.order);
}

export function buildSectionsFromTitles(
  titles: string[],
): Array<{ title: string; body: string }> {
  return titles.map((title) => ({ title, body: "" }));
}
