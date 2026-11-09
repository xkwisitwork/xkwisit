import { nanoid } from "nanoid";

import { Assessment, type AssessmentDocument } from "../../models/Assessment.js";
import type {
  AssessmentAnswer,
  AssessmentSubmission,
} from "../../types/assessment.types.js";
import { notFound } from "../../utils/errors.js";
import { buildReport, extractBusinessName } from "./assessment.scoring.js";

function toSubmission(doc: AssessmentDocument): AssessmentSubmission {
  return {
    id: String(doc._id),
    token: doc.token,
    businessName: doc.businessName ?? null,
    email: doc.email ?? null,
    status: doc.status,
    answers: (doc.answers ?? []) as AssessmentAnswer[],
    overallScore: doc.overallScore ?? null,
    dimensionScores: (doc.dimensionScores ?? []).map((d) => ({
      dimension: String(d.dimension),
      score: Number(d.score),
      weight: Number(d.weight),
      label: String(d.label),
    })),
    summary: doc.summary ?? null,
    createdAt:
      (doc as { createdAt?: Date }).createdAt?.toISOString?.() ??
      new Date().toISOString(),
    submittedAt: doc.submittedAt?.toISOString?.() ?? null,
  };
}

export async function startAssessment(input: {
  businessName?: string;
  email?: string;
  orgId?: string;
  userId?: string;
}) {
  const token = nanoid(24);
  const doc = await Assessment.create({
    token,
    businessName: input.businessName ?? null,
    email: input.email?.toLowerCase() ?? null,
    status: "IN_PROGRESS",
    answers: [],
    orgId: input.orgId ?? null,
    userId: input.userId ?? null,
  });
  return toSubmission(doc);
}

export async function getAssessmentByToken(token: string) {
  const doc = await Assessment.findOne({ token });
  if (!doc) throw notFound("Assessment not found");
  return toSubmission(doc);
}

export async function submitAssessment(input: {
  token: string;
  answers: AssessmentAnswer[];
  orgId?: string;
  userId?: string;
}) {
  const doc = await Assessment.findOne({ token: input.token });
  if (!doc) throw notFound("Assessment not found");

  const businessName =
    extractBusinessName(input.answers) ?? doc.businessName ?? null;
  const report = buildReport({
    token: doc.token,
    businessName,
    answers: input.answers,
  });

  doc.set({
    answers: input.answers,
    businessName,
    status: "SCORED",
    dimensionScores: report.dimensionScores,
    overallScore: report.overallScore,
    bandLabel: report.bandLabel,
    summary: report.summary,
    roadmapItems: report.roadmapItems,
    submittedAt: new Date(),
    ...(input.orgId ? { orgId: input.orgId } : {}),
    ...(input.userId ? { userId: input.userId } : {}),
  });
  await doc.save();

  return toSubmission(doc);
}

export async function scoreAssessment(input: {
  token: string;
  answers: AssessmentAnswer[];
}) {
  const doc = await Assessment.findOne({ token: input.token });
  if (!doc) throw notFound("Assessment not found");

  const businessName =
    extractBusinessName(input.answers) ?? doc.businessName ?? null;
  const report = buildReport({
    token: doc.token,
    businessName,
    answers: input.answers,
  });

  doc.set({
    answers: input.answers,
    businessName,
    status: "SCORED",
    dimensionScores: report.dimensionScores,
    overallScore: report.overallScore,
    bandLabel: report.bandLabel,
    summary: report.summary,
    roadmapItems: report.roadmapItems,
    submittedAt: doc.submittedAt ?? new Date(),
  });
  await doc.save();

  return report;
}

export async function getAssessmentReport(token: string) {
  const doc = await Assessment.findOne({ token });
  if (!doc) throw notFound("Assessment not found");

  if (
    doc.status === "SCORED" &&
    doc.overallScore != null &&
    doc.dimensionScores?.length
  ) {
    return {
      token: doc.token,
      businessName: doc.businessName ?? null,
      overallScore: doc.overallScore,
      bandLabel: doc.bandLabel ?? "Critical",
      dimensionScores: doc.dimensionScores,
      summary: doc.summary ?? "",
      roadmapItems: doc.roadmapItems ?? [],
      generatedAt:
        doc.submittedAt?.toISOString?.() ??
        (doc as { updatedAt?: Date }).updatedAt?.toISOString?.() ??
        new Date().toISOString(),
    };
  }

  if (!doc.answers?.length) throw notFound("Assessment report not ready");

  const businessName =
    extractBusinessName(doc.answers as AssessmentAnswer[]) ??
    doc.businessName ??
    null;
  return buildReport({
    token: doc.token,
    businessName,
    answers: doc.answers as AssessmentAnswer[],
  });
}

export async function listSubmissions(filter: {
  orgId?: string;
  userId?: string;
}) {
  const query: Record<string, unknown> = {};
  if (filter.orgId) query.orgId = filter.orgId;
  else if (filter.userId) query.userId = filter.userId;
  else return [];

  const docs = await Assessment.find(query).sort({ createdAt: -1 }).limit(100);
  return docs.map((doc) => ({
    id: String(doc._id),
    token: doc.token,
    businessName: doc.businessName ?? null,
    email: doc.email ?? null,
    status: doc.status,
    overallScore: doc.overallScore ?? null,
    createdAt:
      (doc as { createdAt?: Date }).createdAt?.toISOString?.() ??
      new Date().toISOString(),
    submittedAt: doc.submittedAt?.toISOString?.() ?? null,
  }));
}
