import type { StatusTone } from "@/components/ui/Badge";
import { HEALTH_LEVEL_LABELS, type HealthLevel } from "@/lib/constants/statuses";

/**
 * Maps a health score (0–100) to a qualitative level.
 */
export function healthLevelFromScore(score: number): HealthLevel {
  if (score >= 85) return "EXCELLENT";
  if (score >= 70) return "STABLE";
  if (score >= 55) return "ATTENTION";
  if (score >= 40) return "AT_RISK";

  return "CRITICAL";
}

/**
 * Maps a health level to a badge tone.
 */
export function healthLevelTone(level: HealthLevel): StatusTone {
  const map: Record<HealthLevel, StatusTone> = {
    EXCELLENT: "success",
    STABLE: "info",
    ATTENTION: "warning",
    AT_RISK: "destructive",
    CRITICAL: "destructive",
  };

  return map[level] ?? "info";
}

/**
 * Human-readable label for a health level.
 */
export function healthLevelLabel(level: HealthLevel): string {
  return HEALTH_LEVEL_LABELS[level] ?? level;
}

/**
 * Averages the seven health dimensions into a single score.
 */
export function computeHealthScore(dimensions: {
  acquisition: number;
  conversion: number;
  retention: number;
  brand: number;
  digital: number;
  operations: number;
  analytics: number;
}): number {
  const values = Object.values(dimensions);
  const total = values.reduce((sum, v) => sum + v, 0);

  return Math.round(total / values.length);
}
