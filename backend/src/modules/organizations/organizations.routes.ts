import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { tenantMiddleware } from "../../middleware/tenant.middleware.js";
import * as controller from "./organizations.controller.js";

const router = Router();

router.use(authMiddleware, tenantMiddleware);

router.get("/current", controller.getCurrent);
router.get("/current/members", controller.listMembers);

export default router;
