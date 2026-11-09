import { Router } from "express";

import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendSuccess } from "../../utils/response.js";

const router = Router();

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    return sendSuccess(res, {
      status: "ok",
      service: "xkwisit-api",
      timestamp: new Date().toISOString(),
    });
  }),
);

export default router;
