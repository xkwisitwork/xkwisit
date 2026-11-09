import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";
import * as xrayService from "./xray.service.js";

export const run = asyncHandler(async (req: Request, res: Response) => {
  const result = await xrayService.runScan(req.body.url as string);
  return sendSuccess(res, result, 200, "Scan complete");
});
