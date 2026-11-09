import { Router } from "express";

import { authMiddleware } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import * as controller from "./auth.controller.js";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updateAvatarSchema,
  verifyEmailSchema,
} from "./auth.schema.js";

const router = Router();

router.post("/register", validate({ body: registerSchema }), controller.register);
router.post("/login", validate({ body: loginSchema }), controller.login);
router.post("/logout", controller.logout);
router.post("/refresh", controller.refresh);
router.get("/me", authMiddleware, controller.me);
router.patch(
  "/me/avatar",
  authMiddleware,
  validate({ body: updateAvatarSchema }),
  controller.updateAvatar,
);
router.post(
  "/forgot-password",
  validate({ body: forgotPasswordSchema }),
  controller.forgotPassword,
);
router.post(
  "/reset-password",
  validate({ body: resetPasswordSchema }),
  controller.resetPassword,
);
router.post(
  "/verify-email",
  validate({ body: verifyEmailSchema }),
  controller.verifyEmail,
);
router.post("/mfa/setup", controller.mfaNotImplemented);
router.post("/mfa/verify", controller.mfaNotImplemented);
router.post("/mfa/disable", controller.mfaNotImplemented);

export default router;
