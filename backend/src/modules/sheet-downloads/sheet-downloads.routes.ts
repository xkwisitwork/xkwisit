import { Router } from "express";

import {
  authMiddleware,
  platformAdminMiddleware,
} from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import * as controller from "./sheet-downloads.controller.js";
import {
  createSheetDownloadSchema,
  sheetDownloadIdParamsSchema,
} from "./sheet-downloads.schema.js";

const router = Router();

router.post(
  "/",
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
