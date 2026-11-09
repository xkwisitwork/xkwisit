import type { AssessmentStatus } from "../models/Assessment.js";
import type { ID, ISODateString } from "./common.types.js";

export type AssessmentAnswer = {
  questionId: string;
  value: string | number | boolean;
};

export type AssessmentDimensionScore = {
  dimension: string;
  score: number;
  weight: number;
  label: string;
};

export type AssessmentSubmission = {
  id: ID;
  token: string;
  businessName: string | null;
  email: string | null;
  status: AssessmentStatus | string;
  answers: AssessmentAnswer[];
  overallScore: number | null;
  dimensionScores: AssessmentDimensionScore[];
  summary: string | null;
  createdAt: ISODateString;
  submittedAt: ISODateString | null;
};

export type AssessmentReport = {
  token: string;
  businessName: string | null;
  overallScore: number;
  bandLabel: string;
  dimensionScores: AssessmentDimensionScore[];
  summary: string;
  roadmapItems: string[];
};

export type { AssessmentStatus };
