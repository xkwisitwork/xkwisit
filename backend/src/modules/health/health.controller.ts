import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";

export const health = asyncHandler(async (_req: Request, res: Response) => {
  return sendSuccess(res, {
    status: "ok",
    service: "xkwisit-api",
    timestamp: new Date().toISOString(),
  });
});
