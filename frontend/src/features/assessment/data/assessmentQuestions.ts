import {
  growthAssessmentSections,
  growthDimensionConfigs,
} from "@/config/growthDimensions";
import type { GrowthQuestion } from "@/config/growthDimensions";

export const assessmentQuestions: GrowthQuestion[] = growthAssessmentSections.flatMap(
  (section) => section.questions.map((q) => ({ ...q })),
);

export { growthAssessmentSections, growthDimensionConfigs };
