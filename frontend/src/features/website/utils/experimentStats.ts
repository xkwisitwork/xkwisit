import type { ExperimentVariant } from "../types";

export function variantConversionRate(visitors: number, conversions: number): number {
  if (!visitors) return 0;
  return (conversions / visitors) * 100;
}

export function liftVsControl(
  variant: ExperimentVariant,
  control: ExperimentVariant | undefined,
): number | null {
  if (!control || control.conversionRate <= 0) return null;
  return (
    ((variant.conversionRate - control.conversionRate) / control.conversionRate) * 100
  );
}

export function findControl(
  variants: ExperimentVariant[],
): ExperimentVariant | undefined {
  return variants.find((v) => v.isControl) ?? variants[0];
}
