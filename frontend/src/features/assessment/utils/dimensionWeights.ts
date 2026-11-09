import { growthDimensionConfigs } from "@/config/growthDimensions";
import type { GrowthDimensionId } from "@/lib/constants/funnel-stages";

export function dimensionWeight(id: GrowthDimensionId): number {
  return growthDimensionConfigs[id]?.weight ?? 1;
}

export function allDimensionIds(): GrowthDimensionId[] {
  return Object.keys(growthDimensionConfigs) as GrowthDimensionId[];
}
