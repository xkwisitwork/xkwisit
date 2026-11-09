import { z } from "zod";

/**
 * Auth-related Zod schemas.
 * Shared between forms and API routes for consistent validation.
 */

function normalizePhone(raw: string): string {
  return raw.replace(/[\s().-]/g, "").trim();
}

/* ─── Primitives ─────────────────────────────────────── */

const emailSchema = z
  .string()
  .min(1, "Email is required.")
  .email("Enter a valid email address.")
  .toLowerCase()
  .trim();

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(72, "Password is too long.")
  .regex(/[a-z]/, "Include at least one lowercase letter.")
  .regex(/[A-Z]/, "Include at least one uppercase letter.")
  .regex(/[0-9]/, "Include at least one number.");

const phoneSchema = z
  .string()
  .min(1, "Phone number is required.")
  .transform(normalizePhone)
  .refine((v) => /^\+?[1-9]\d{7,14}$/.test(v), {
    message: "Enter a valid phone number (e.g. +2348012345678).",
  });

const codeSchema = z
  .string()
  .length(6, "Code must be exactly 6 digits.")
  .regex(/^\d{6}$/, "Code must be numeric.");

/* ─── Login ──────────────────────────────────────────── */

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required."),
  remember: z.boolean().optional().default(false),
});

export type LoginInput = z.infer<typeof loginSchema>;

/* ─── Register ───────────────────────────────────────── */

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required.").max(60).trim(),
    lastName: z.string().min(1, "Last name is required.").max(60).trim(),
    email: emailSchema,
    companyName: z.string().min(2, "Company name is required.").max(120).trim(),
    phone: phoneSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm your password."),
    acceptedTerms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms to continue." }),
    }),
    inviteToken: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type RegisterInput = z.infer<typeof registerSchema>;

/* ─── Password reset ─────────────────────────────────── */

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Reset token is missing."),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

/* ─── Email verification ─────────────────────────────── */

export const verifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token is missing."),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

/* ─── MFA ────────────────────────────────────────────── */

export const mfaVerifySchema = z.object({
  code: codeSchema,
});

export type MfaVerifyInput = z.infer<typeof mfaVerifySchema>;

export const mfaSetupConfirmSchema = z.object({
  code: codeSchema,
});

export type MfaSetupConfirmInput = z.infer<typeof mfaSetupConfirmSchema>;

/* ─── Profile update ─────────────────────────────────── */

export const updateProfileSchema = z.object({
  firstName: z.string().min(1).max(60).trim(),
  lastName: z.string().min(1).max(60).trim(),
  phone: z
    .string()
    .min(6, "Enter a valid phone number.")
    .max(20)
    .regex(/^[+\d\s()-]+$/, "Only digits, spaces, and +, -, ( ) allowed.")
    .optional()
    .or(z.literal("")),
  jobTitle: z.string().max(80).trim().optional().or(z.literal("")),
  bio: z.string().max(500).trim().optional().or(z.literal("")),
  timezone: z.string().optional(),
  locale: z.string().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
