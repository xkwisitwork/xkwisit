import { z } from "zod";

/** Strip common phone formatting, then require E.164-ish international form. */
export function normalizePhone(raw: string): string {
  return raw.replace(/[\s().-]/g, "").trim();
}

export const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .transform(normalizePhone)
  .refine((v) => /^\+?[1-9]\d{7,14}$/.test(v), {
    message: "Enter a valid phone number (e.g. +2348012345678)",
  });

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    firstName: z.string().trim().min(1, "First name is required").max(80),
    lastName: z.string().trim().min(1, "Last name is required").max(80),
    companyName: z.string().min(1).max(120),
    phone: phoneSchema,
    inviteToken: z.string().optional(),
  })
  // Reject privilege-escalation fields like isPlatformAdmin / role.
  .strict()
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine(
    (d) => d.firstName.trim().toLowerCase() !== d.lastName.trim().toLowerCase(),
    {
      // Single-token "full name" clients often duplicate first→last; require a real last name.
      message: "Enter both your first and last name",
      path: ["lastName"],
    },
  );

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  remember: z.boolean().optional(),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verifyEmailSchema = z.object({
  token: z.string().min(1),
});

export const updateAvatarSchema = z
  .object({
    avatarUrl: z
      .string()
      .url("Avatar URL must be a valid URL")
      .max(2048)
      .refine(
        (url) =>
          /^https:\/\/(utfs\.io|[^/]+\.ufs\.sh|uploadthing\.com)\b/i.test(url),
        "Avatar must be hosted on UploadThing",
      ),
  })
  .strict();
