import { Router } from "express";

import { validate } from "../../middleware/validate.middleware.js";
import * as controller from "./bookings.controller.js";
import {
  bookingIdParamsSchema,
  createBookingSchema,
} from "./bookings.schema.js";

const router = Router();

router.post("/", validate({ body: createBookingSchema }), controller.create);
router.get(
  "/:id",
  validate({ params: bookingIdParamsSchema }),
  controller.getById,
);

export default router;
