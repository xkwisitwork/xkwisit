import { Router } from "express";

import {
  authMiddleware,
  platformAdminMiddleware,
} from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import * as controller from "./platform.controller.js";
import {
  extendTrialSchema,
  setPlatformAdminSchema,
  updateWorkspaceSchema,
  userIdParamsSchema,
  workspaceIdParamsSchema,
} from "./platform.schema.js";

const router = Router();

router.use(authMiddleware, platformAdminMiddleware);

router.get("/stats", controller.stats);
router.get("/health", controller.health);
router.get("/audit", controller.audit);

router.get("/workspaces", controller.listWorkspaces);
router.get(
  "/workspaces/:id",
  validate({ params: workspaceIdParamsSchema }),
  controller.getWorkspace,
);
router.patch(
  "/workspaces/:id",
  validate({ params: workspaceIdParamsSchema, body: updateWorkspaceSchema }),
  controller.updateWorkspace,
);
router.post(
  "/workspaces/:id/extend-trial",
  validate({ params: workspaceIdParamsSchema, body: extendTrialSchema }),
  controller.extendTrial,
);

router.get("/users", controller.listUsers);
router.patch(
  "/users/:id/platform-admin",
  validate({ params: userIdParamsSchema, body: setPlatformAdminSchema }),
  controller.setPlatformAdmin,
);

export default router;
