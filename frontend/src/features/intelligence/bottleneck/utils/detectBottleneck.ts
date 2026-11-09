import type { BottleneckSeverity } from "../../types";
import type { StatusTone } from "@/components/ui/Badge";

export function bottleneckSeverityTone(severity: BottleneckSeverity): StatusTone {
  if (severity === "CRITICAL" || severity === "HIGH") return "destructive";
  if (severity === "MEDIUM") return "warning";
  return "info";
}

export function rankBottlenecksByImpact<T extends { impactScore: number }>(
  items: T[],
): T[] {
  return [...items].sort((a, b) => b.impactScore - a.impactScore);
}
