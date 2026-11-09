import { z } from "zod";

export const assessmentAnswerSchema = z.object({
  questionId: z.string().min(1),
  value: z.union([z.string(), z.number(), z.boolean()]),
});

export const submitAssessmentSchema = z.object({
  token: z.string().min(1),
  answers: z.array(assessmentAnswerSchema).min(1),
});

export type SubmitAssessmentInput = z.infer<typeof submitAssessmentSchema>;
