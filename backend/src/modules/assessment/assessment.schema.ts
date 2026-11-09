import { z } from "zod";

const answerSchema = z.object({
  questionId: z.string().min(1),
  value: z.union([z.string(), z.number(), z.boolean()]),
});

export const startAssessmentSchema = z.object({
  businessName: z.string().min(1).max(200).optional(),
  email: z.string().email().optional(),
});

export const submitAssessmentSchema = z.object({
  token: z.string().min(1),
  answers: z.array(answerSchema).min(1),
});

export const scoreAssessmentSchema = z.object({
  token: z.string().min(1),
  answers: z.array(answerSchema).min(1),
});

export const tokenParamsSchema = z.object({
  token: z.string().min(1),
});
