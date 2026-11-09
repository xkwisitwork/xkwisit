import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { unauthorized } from "../../utils/errors.js";
import { sendSuccess } from "../../utils/response.js";
import * as assessmentService from "./assessment.service.js";

export const start = asyncHandler(async (req: Request, res: Response) => {
  const result = await assessmentService.startAssessment({
    ...req.body,
    orgId: req.user?.orgId ?? req.orgId,
    userId: req.user?.id,
  });
  return sendSuccess(res, result, 201);
});

export const getByToken = asyncHandler(async (req: Request, res: Response) => {
  const result = await assessmentService.getAssessmentByToken(
    req.params.token as string,
  );
  return sendSuccess(res, result);
});

export const submit = asyncHandler(async (req: Request, res: Response) => {
  const result = await assessmentService.submitAssessment({
    token: req.body.token,
    answers: req.body.answers,
    orgId: req.user?.orgId ?? req.orgId,
    userId: req.user?.id,
  });
  return sendSuccess(res, result);
});

export const score = asyncHandler(async (req: Request, res: Response) => {
  const result = await assessmentService.scoreAssessment(req.body);
  return sendSuccess(res, result);
});

export const report = asyncHandler(async (req: Request, res: Response) => {
  const result = await assessmentService.getAssessmentReport(
    req.params.token as string,
  );
  return sendSuccess(res, result);
});

export const listSubmissions = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) throw unauthorized();
  const result = await assessmentService.listSubmissions({
    orgId: req.orgId ?? req.user.orgId,
    userId: req.user.id,
  });
  return sendSuccess(res, result);
});
