import type { ID, ISODateString } from "@/types/common";
import type { GrowthDimensionId } from "@/lib/constants/funnel-stages";

/* ─── Enums ──────────────────────────────────────────── */

export type AssessmentStatus = "IN_PROGRESS" | "SUBMITTED" | "SCORED" | "ARCHIVED";

/* ─── Core ───────────────────────────────────────────── */

export type AssessmentAnswer = {
  questionId: string;
  value: string | number | boolean;
};

export type DimensionScore = {
  dimension: GrowthDimensionId;
  score: number;
  weight: number;
  label: string;
};

export type AssessmentSubmission = {
  id: ID;
  token: string;
  businessName: string | null;
  email: string | null;
  status: AssessmentStatus;
  answers: AssessmentAnswer[];
  overallScore: number | null;
  dimensionScores: DimensionScore[];
  summary: string | null;
  createdAt: ISODateString;
  submittedAt: ISODateString | null;
};

export type AssessmentListItem = Pick<
  AssessmentSubmission,
  | "id"
  | "token"
  | "businessName"
  | "email"
  | "status"
  | "overallScore"
  | "createdAt"
  | "submittedAt"
>;

export type AssessmentReport = {
  token: string;
  businessName: string | null;
  overallScore: number;
  bandLabel: string;
  dimensionScores: DimensionScore[];
  summary: string;
  roadmapItems: string[];
  generatedAt: ISODateString;
};

/* ─── Payloads ───────────────────────────────────────── */

export type StartAssessmentPayload = {
  businessName?: string;
  email?: string;
};

export type SubmitAssessmentPayload = {
  token: string;
  answers: AssessmentAnswer[];
};

export type ScoreAssessmentPayload = {
  token: string;
  answers: AssessmentAnswer[];
};
