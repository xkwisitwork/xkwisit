import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";
import * as service from "./automation.service.js";

export const list = asyncHandler(async (req: Request, res: Response) => {
  const data = await service.list(req.query as Record<string, unknown>);
  return sendSuccess(res, data);
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const data = await service.getById(String(req.params.id));
  return sendSuccess(res, data);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const data = await service.create(req.body as Record<string, unknown>);
  return sendSuccess(res, data, 201);
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const data = await service.update(String(req.params.id), req.body as Record<string, unknown>);
  return sendSuccess(res, data);
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await service.remove(String(req.params.id));
  return sendSuccess(res, { deleted: true });
});
