import type { HealthDimension } from "../../types";
import type { StatusTone } from "@/components/ui/Badge";

export function healthScoreTone(score: number): StatusTone {
  if (score >= 80) return "success";
  if (score >= 60) return "info";
  if (score >= 40) return "warning";
  return "destructive";
}

export function healthLabel(score: number): string {
  if (score >= 80) return "Healthy";
  if (score >= 60) return "Stable";
  if (score >= 40) return "At risk";
  return "Critical";
}

export function weightedHealthScore(dimensions: HealthDimension[]): number {
  if (dimensions.length === 0) return 0;
  const totalWeight = dimensions.reduce((sum, d) => sum + d.weight, 0);
  if (totalWeight <= 0) return 0;
  const weighted = dimensions.reduce((sum, d) => sum + d.score * d.weight, 0);
  return Math.round(weighted / totalWeight);
}
