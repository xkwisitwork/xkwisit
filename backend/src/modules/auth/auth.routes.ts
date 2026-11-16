import { Router } from "express";

import {
  authMiddleware,
  optionalAuthMiddleware,
} from "../../middleware/auth.middleware.js";
import { rateLimitMiddleware } from "../../middleware/rateLimit.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { botShieldMiddleware } from "../bot-shield/index.js";
import * as controller from "./auth.controller.js";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updateAvatarSchema,
  updateProfileSchema,
  verifyEmailSchema,
} from "./auth.schema.js";

const router = Router();

const authAbuseLimit = rateLimitMiddleware({
  windowMs: 15 * 60 * 1000,
  max: 25,
  key: (req) =>
    `auth:${req.path}:${req.ip || req.headers["x-forwarded-for"]?.toString() || "unknown"}`,
});

const registerLimit = rateLimitMiddleware({
  windowMs: 60 * 60 * 1000,
  max: 8,
  key: (req) =>
    `auth-register:${req.ip || req.headers["x-forwarded-for"]?.toString() || "unknown"}`,
});

router.post(
  "/register",
  registerLimit,
  botShieldMiddleware,
  validate({ body: registerSchema }),
  controller.register,
);
router.post(
  "/login",
  authAbuseLimit,
  botShieldMiddleware,
  validate({ body: loginSchema }),
  controller.login,
);
router.post("/logout", optionalAuthMiddleware, controller.logout);
router.post("/refresh", controller.refresh);
router.get("/me", authMiddleware, controller.me);
router.patch(
  "/me/profile",
  authMiddleware,
  validate({ body: updateProfileSchema }),
  controller.updateProfile,
);
router.patch(
  "/me/avatar",
  authMiddleware,
  validate({ body: updateAvatarSchema }),
  controller.updateAvatar,
);
router.post(
  "/forgot-password",
  authAbuseLimit,
  botShieldMiddleware,
  validate({ body: forgotPasswordSchema }),
  controller.forgotPassword,
);
router.post(
  "/reset-password",
  authAbuseLimit,
  botShieldMiddleware,
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
