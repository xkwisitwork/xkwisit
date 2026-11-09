import type { CreateLeadPayload, LeadScoreBreakdownData } from "../types";

/* ─── Score helpers ──────────────────────────────────── */

const WEIGHTS = {
  budgetFit: 0.25,
  serviceFit: 0.25,
  engagement: 0.2,
  urgency: 0.15,
  authority: 0.15,
} as const;

/**
 * Buckets a lead score into a qualitative band.
 */
export function scoreBand(score: number): {
  label: string;
  tone: "destructive" | "warning" | "info" | "success";
} {
  if (score >= 80) return { label: "Hot", tone: "success" };
  if (score >= 60) return { label: "Warm", tone: "info" };
  if (score >= 40) return { label: "Cool", tone: "warning" };
  return { label: "Cold", tone: "destructive" };
}

/**
 * Computes a composite score from dimension values (0–100 each).
 */
export function computeScore(breakdown: LeadScoreBreakdownData["dimensions"]): number {
  const total =
    breakdown.budgetFit * WEIGHTS.budgetFit +
    breakdown.serviceFit * WEIGHTS.serviceFit +
    breakdown.engagement * WEIGHTS.engagement +
    breakdown.urgency * WEIGHTS.urgency +
    breakdown.authority * WEIGHTS.authority;

  return Math.round(total);
}

/**
 * Heuristic score for a lead before any manual override exists.
 * Gives every new lead a sensible starting score based on form inputs.
 */
export function initialScore(
  payload: Partial<CreateLeadPayload>,
): LeadScoreBreakdownData {
  const budgetFit = scoreFromBudget(payload.budgetRange);
  const serviceFit = payload.serviceInterest ? 75 : 50;
  const engagement = payload.website ? 70 : 40;
  const urgency = 50;
  const authority = payload.jobTitle ? titleAuthority(payload.jobTitle) : 50;

  const dimensions = { budgetFit, serviceFit, engagement, urgency, authority };

  return {
    total: computeScore(dimensions),
    dimensions,
    calculatedAt: new Date().toISOString(),
  };
}

function scoreFromBudget(range?: string): number {
  if (!range) return 50;

  const lower = range.toLowerCase();

  if (lower.includes("5m+") || lower.includes("5,000,000+")) return 95;
  if (lower.includes("2m") || lower.includes("2,000,000")) return 85;
  if (lower.includes("1m") || lower.includes("1,000,000")) return 70;
  if (lower.includes("500k") || lower.includes("500,000")) return 55;
  if (lower.includes("under") || lower.includes("below")) return 30;

  return 50;
}

function titleAuthority(title: string): number {
  const lower = title.toLowerCase();

  if (/ceo|founder|owner|managing director|md/.test(lower)) return 95;
  if (/director|head|vp|chief/.test(lower)) return 80;
  if (/manager|lead/.test(lower)) return 65;
  if (/analyst|associate|assistant/.test(lower)) return 40;

  return 50;
}

/* ─── Display helpers ────────────────────────────────── */

export function scoreTone(score: number): "destructive" | "warning" | "info" | "success" {
  return scoreBand(score).tone;
}

export function formatScore(score: number): string {
  return `${Math.round(score)}`;
}
