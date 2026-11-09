import type { AssessmentAnswer, AssessmentReport, DimensionScore } from "../types";
import { assessmentQuestions } from "../data/assessmentQuestions";
import {
  calculateDimensionScores,
  calculateOverallScore,
  scoreBandLabel,
} from "./scoreCalculator";

const STORAGE_PREFIX = "xkwisit:assessment:";
const LATEST_KEY = "xkwisit:assessment:latest";

export function assessmentStorageKey(token: string) {
  return `${STORAGE_PREFIX}${token}`;
}

export function buildLocalReport(input: {
  token: string;
  businessName: string | null;
  answers: AssessmentAnswer[];
}): AssessmentReport {
  const dimensionScores = calculateDimensionScores(input.answers);
  const overallScore = calculateOverallScore(dimensionScores);
  const weakest = [...dimensionScores].sort((a, b) => a.score - b.score)[0];

  return {
    token: input.token,
    businessName: input.businessName,
    overallScore,
    bandLabel: scoreBandLabel(overallScore),
    dimensionScores,
    summary: weakest
      ? `Your growth health is ${overallScore} (${scoreBandLabel(overallScore)}). Fix ${weakest.label} first - it’s the weakest lever at ${weakest.score}.`
      : `Your growth health is ${overallScore} (${scoreBandLabel(overallScore)}).`,
    roadmapItems: topRoadmapItems(dimensionScores),
    generatedAt: new Date().toISOString(),
  };
}

function topRoadmapItems(dimensions: DimensionScore[]): string[] {
  return [...dimensions]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((d) => {
      if (d.score < 50)
        return `Fix ${d.label} this week - it’s holding the rest back (${d.score}).`;
      if (d.score < 70) return `Tighten ${d.label} next - room to climb from ${d.score}.`;
      return `Protect ${d.label} - already strong at ${d.score}.`;
    });
}

function writeStore(key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

function readStore(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    const fromSession = window.sessionStorage.getItem(key);
    if (fromSession) return fromSession;
  } catch {
    /* ignore */
  }
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function saveLocalReport(report: AssessmentReport): void {
  const payload = JSON.stringify(report);
  writeStore(assessmentStorageKey(report.token), payload);
  writeStore(LATEST_KEY, payload);
}

export function loadLocalReport(token: string): AssessmentReport | null {
  const raw = readStore(assessmentStorageKey(token));
  if (raw) {
    try {
      return JSON.parse(raw) as AssessmentReport;
    } catch {
      /* fall through */
    }
  }
  // Fallback: most recent report in this browser session
  const latest = readStore(LATEST_KEY);
  if (!latest) return null;
  try {
    const parsed = JSON.parse(latest) as AssessmentReport;
    return parsed;
  } catch {
    return null;
  }
}

export function extractBusinessName(answers: AssessmentAnswer[]): string | null {
  const name = answers.find((a) => a.questionId === "biz_name");
  if (name && typeof name.value === "string" && name.value.trim()) {
    return name.value.trim();
  }
  return null;
}

/** Prefer option.score when the answer matches a choice value/label. */
export function resolveChoiceScore(
  questionId: string,
  value: string | number | boolean,
): number | null {
  const question = assessmentQuestions.find((q) => q.id === questionId);
  if (!question?.options || typeof value !== "string") return null;
  const match = question.options.find((o) => o.value === value || o.label === value);
  return match?.score ?? null;
}
