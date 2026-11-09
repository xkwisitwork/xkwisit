import type { AttributionRow } from "../types";

export function attributionTouchLabel(value: string): string {
  if (!value) return "-";
  return value.replace(/_/g, " ");
}

export function hasConverted(row: AttributionRow): boolean {
  return Boolean(row.customerId && row.closedAt);
}

export function totalAttributedRevenue(rows: AttributionRow[]): number {
  return rows.reduce((sum, row) => sum + (row.revenue || 0), 0);
}

export function groupBySource(rows: AttributionRow[]): Record<string, number> {
  return rows.reduce<Record<string, number>>((acc, row) => {
    const key = row.source || "Unknown";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
}
