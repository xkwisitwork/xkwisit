import type { SeoDimensionScore, SeoIssueSeverity } from "../types";

export function seoScoreTone(
  score: number,
): "success" | "warning" | "destructive" | "info" {
  if (score >= 80) return "success";
  if (score >= 60) return "info";
  if (score >= 40) return "warning";
  return "destructive";
}

export function severityTone(
  severity: SeoIssueSeverity,
): "destructive" | "warning" | "info" | "muted" {
  if (severity === "CRITICAL" || severity === "HIGH") return "destructive";
  if (severity === "MEDIUM") return "warning";
  if (severity === "LOW") return "info";
  return "muted";
}

export function weightedHealthScore(dimensions: SeoDimensionScore[]): number {
  if (dimensions.length === 0) return 0;
  const totalWeight = dimensions.reduce((sum, d) => sum + d.weight, 0);
  if (totalWeight <= 0) return 0;
  const weighted = dimensions.reduce((sum, d) => sum + d.score * d.weight, 0);
  return Math.round(weighted / totalWeight);
}

export function positionDelta(
  current: number | null,
  previous: number | null,
): number | null {
  if (current == null || previous == null) return null;
  return previous - current; // positive = improved
}
