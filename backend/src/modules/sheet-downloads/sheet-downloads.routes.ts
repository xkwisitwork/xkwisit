import { Router } from "express";

import {
  authMiddleware,
  platformAdminMiddleware,
} from "../../middleware/auth.middleware.js";
import { rateLimitMiddleware } from "../../middleware/rateLimit.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { botShieldMiddleware } from "../bot-shield/index.js";
import * as controller from "./sheet-downloads.controller.js";
import {
  createSheetDownloadSchema,
  sheetDownloadIdParamsSchema,
} from "./sheet-downloads.schema.js";

const router = Router();

router.post(
  "/",
  rateLimitMiddleware({
    windowMs: 15 * 60 * 1000,
    max: 15,
    key: (req) =>
      `sheet-dl:${req.ip || req.headers["x-forwarded-for"]?.toString() || "unknown"}`,
  }),
  botShieldMiddleware,
  validate({ body: createSheetDownloadSchema }),
  controller.create,
);

router.get("/", authMiddleware, platformAdminMiddleware, controller.list);

router.get(
  "/:id/file",
  validate({ params: sheetDownloadIdParamsSchema }),
  controller.downloadFile,
);

export default router;
