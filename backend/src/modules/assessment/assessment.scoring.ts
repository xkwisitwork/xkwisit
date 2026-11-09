import type { AssessmentAnswer } from "../../types/assessment.types.js";
import {
  assessmentQuestions,
  bandForScore,
  growthDimensionConfigs,
  type GrowthDimensionId,
} from "./assessment.questions.js";

export type { AssessmentAnswer };

export type DimensionScore = {
  dimension: GrowthDimensionId;
  score: number;
  weight: number;
  label: string;
};

function answerToScore(
  questionId: string,
  value: string | number | boolean,
): number {
  const question = assessmentQuestions.find((q) => q.id === questionId);
  if (question?.options && typeof value === "string") {
    const match = question.options.find(
      (o) => o.value === value || o.label === value,
    );
    if (match) return match.score;
  }
  if (typeof value === "boolean") return value ? 80 : 40;
  if (typeof value === "number") {
    if (value <= 5) return Math.round((value / 5) * 100);
    return Math.min(100, Math.max(0, value));
  }
  if (typeof value === "string" && value.trim()) return 60;
  return 50;
}

export function calculateDimensionScores(
  answers: AssessmentAnswer[],
): DimensionScore[] {
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
      weight: config?.weight ?? 1,
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

export function extractBusinessName(
  answers: AssessmentAnswer[],
): string | null {
  const name = answers.find((a) => a.questionId === "biz_name");
  if (name && typeof name.value === "string" && name.value.trim()) {
    return name.value.trim();
  }
  return null;
}

function topRoadmapItems(dimensions: DimensionScore[]): string[] {
  return [...dimensions]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((d) => {
      if (d.score < 50)
        return `Fix ${d.label} this week — it’s holding the rest back (${d.score}).`;
      if (d.score < 70)
        return `Tighten ${d.label} next — room to climb from ${d.score}.`;
      return `Protect ${d.label} — already strong at ${d.score}.`;
    });
}

export function buildReport(input: {
  token: string;
  businessName: string | null;
  answers: AssessmentAnswer[];
}) {
  const dimensionScores = calculateDimensionScores(input.answers);
  const overallScore = calculateOverallScore(dimensionScores);
  const weakest = [...dimensionScores].sort((a, b) => a.score - b.score)[0];
  const bandLabel = scoreBandLabel(overallScore);

  return {
    token: input.token,
    businessName: input.businessName,
    overallScore,
    bandLabel,
    dimensionScores,
    summary: weakest
      ? `Your growth health is ${overallScore} (${bandLabel}). Fix ${weakest.label} first — it’s the weakest lever at ${weakest.score}.`
      : `Your growth health is ${overallScore} (${bandLabel}).`,
    roadmapItems: topRoadmapItems(dimensionScores),
    generatedAt: new Date().toISOString(),
  };
}
