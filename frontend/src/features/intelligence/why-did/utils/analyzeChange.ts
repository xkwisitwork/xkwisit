import type { ContributingFactor } from "../../types";

export function sortFactorsByImpact(factors: ContributingFactor[]): ContributingFactor[] {
  return [...factors].sort(
    (a, b) => Math.abs(b.impactPercent) - Math.abs(a.impactPercent),
  );
}

export function topFactor(factors: ContributingFactor[]): ContributingFactor | null {
  const sorted = sortFactorsByImpact(factors);
  return sorted[0] ?? null;
}
