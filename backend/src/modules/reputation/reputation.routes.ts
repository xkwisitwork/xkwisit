import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import * as controller from "./reputation.controller.js";
import { createSchema, idParamsSchema, updateSchema } from "./reputation.schema.js";

const router = Router();

router.use(authMiddleware);

router.get("/", controller.list);
router.get("/:id", validate({ params: idParamsSchema }), controller.getById);
router.post("/", validate({ body: createSchema }), controller.create);
router.patch("/:id", validate({ params: idParamsSchema, body: updateSchema }), controller.update);
router.delete("/:id", validate({ params: idParamsSchema }), controller.remove);

export default router;
