import { Router } from "express";

import {
  authMiddleware,
  optionalAuthMiddleware,
} from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import * as controller from "./assessment.controller.js";
import {
  scoreAssessmentSchema,
  startAssessmentSchema,
  submitAssessmentSchema,
  tokenParamsSchema,
} from "./assessment.schema.js";

const router = Router();

router.post(
  "/",
  optionalAuthMiddleware,
  validate({ body: startAssessmentSchema }),
  controller.start,
);
router.put(
  "/",
  optionalAuthMiddleware,
  validate({ body: submitAssessmentSchema }),
  controller.submit,
);
router.post(
  "/score",
  validate({ body: scoreAssessmentSchema }),
  controller.score,
);
router.get("/submissions", authMiddleware, controller.listSubmissions);
router.get(
  "/:token/report",
  validate({ params: tokenParamsSchema }),
  controller.report,
);
router.get(
  "/:token",
  validate({ params: tokenParamsSchema }),
  controller.getByToken,
);

export default router;
