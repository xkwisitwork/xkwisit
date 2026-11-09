import type { AnomalySeverity } from "../../types";
import type { StatusTone } from "@/components/ui/Badge";

export function anomalySeverityTone(severity: AnomalySeverity): StatusTone {
  if (severity === "CRITICAL" || severity === "HIGH") return "destructive";
  if (severity === "MEDIUM") return "warning";
  return "info";
}

export function formatDeltaPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

export function isSignificantDelta(deltaPercent: number, threshold = 15): boolean {
  return Math.abs(deltaPercent) >= threshold;
}
