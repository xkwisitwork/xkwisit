import type { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";
import { issueChallenge } from "./bot-shield.service.js";

function clientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    return forwarded.split(",")[0]!.trim();
  }
  return req.ip || "unknown";
}

export const getChallenge = asyncHandler(async (req: Request, res: Response) => {
  const data = issueChallenge(clientIp(req));
  // Discourage caching of one-time challenges.
  res.setHeader("Cache-Control", "no-store");
  return sendSuccess(res, data);
});
