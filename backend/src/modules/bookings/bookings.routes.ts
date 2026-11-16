import { Router } from "express";

import { rateLimitMiddleware } from "../../middleware/rateLimit.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { botShieldMiddleware } from "../bot-shield/index.js";
import * as controller from "./bookings.controller.js";
import {
  bookingIdParamsSchema,
  createBookingSchema,
} from "./bookings.schema.js";

const router = Router();

router.post(
  "/",
  rateLimitMiddleware({
    windowMs: 15 * 60 * 1000,
    max: 12,
    key: (req) =>
      `booking:${req.ip || req.headers["x-forwarded-for"]?.toString() || "unknown"}`,
  }),
  botShieldMiddleware,
  validate({ body: createBookingSchema }),
  controller.create,
);
router.get(
  "/:id",
  validate({ params: bookingIdParamsSchema }),
  controller.getById,
);

export default router;
