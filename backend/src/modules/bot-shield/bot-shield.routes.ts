import { Router } from "express";

import { rateLimitMiddleware } from "../../middleware/rateLimit.middleware.js";
import * as controller from "./bot-shield.controller.js";

const router = Router();

router.get(
  "/challenge",
  rateLimitMiddleware({
    windowMs: 60_000,
    max: 40,
    key: (req) =>
      `bot-challenge:${req.ip || req.headers["x-forwarded-for"]?.toString() || "unknown"}`,
  }),
  controller.getChallenge,
);

export default router;
