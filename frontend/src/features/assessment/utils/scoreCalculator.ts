import { bandForScore, growthDimensionConfigs } from "@/config/growthDimensions";
import type { GrowthDimensionId } from "@/lib/constants/funnel-stages";

import type { AssessmentAnswer, DimensionScore } from "../types";
import { assessmentQuestions } from "../data/assessmentQuestions";
import { dimensionWeight } from "./dimensionWeights";

function answerToScore(questionId: string, value: string | number | boolean): number {
  const question = assessmentQuestions.find((q) => q.id === questionId);
  if (question?.options && typeof value === "string") {
    const match = question.options.find((o) => o.value === value || o.label === value);
    if (match) return match.score;
  }
  if (typeof value === "boolean") return value ? 80 : 40;
  if (typeof value === "number") {
    if (value <= 5) return Math.round((value / 5) * 100);
    return Math.min(100, Math.max(0, value));
  }
  // Free text (e.g. business name) - neutral contribution
  if (typeof value === "string" && value.trim()) return 60;
  return 50;
}

export function calculateDimensionScores(answers: AssessmentAnswer[]): DimensionScore[] {
  const byDimension = new Map<GrowthDimensionId, number[]>();

  for (const answer of answers) {
    const question = assessmentQuestions.find((q) => q.id === answer.questionId);
    if (!question) continue;
    const dim = question.dimension;
    const scores = byDimension.get(dim) ?? [];
    scores.push(answerToScore(answer.questionId, answer.value));
    byDimension.set(dim, scores);
  }

  return [...byDimension.entries()].map(([dimension, scores]) => {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    const config = growthDimensionConfigs[dimension];
    return {
      dimension,
      score: Math.round(avg),
      weight: dimensionWeight(dimension),
      label: config?.label ?? dimension,
    };
  });
}

export function calculateOverallScore(dimensions: DimensionScore[]): number {
  if (dimensions.length === 0) return 0;
  const totalWeight = dimensions.reduce((sum, d) => sum + d.weight, 0);
  if (totalWeight <= 0) return 0;
  const weighted = dimensions.reduce((sum, d) => sum + d.score * d.weight, 0);
  return Math.round(weighted / totalWeight);
}

export function scoreBandLabel(score: number): string {
  return bandForScore(score)?.label ?? "Critical";
}
