import { Router } from "express";

import { validate } from "../../middleware/validate.middleware.js";
import * as controller from "./xray.controller.js";
import { runXraySchema } from "./xray.schema.js";

const router = Router();

router.post("/", validate({ body: runXraySchema }), controller.run);

export default router;
