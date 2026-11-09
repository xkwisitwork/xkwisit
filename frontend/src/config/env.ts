import { z } from "zod";

/**
 * Typed environment variables.
 * Validated once at module load. Fails fast if required values are missing.
 *
 * NOTE: Only variables prefixed with NEXT_PUBLIC_ are exposed to the browser.
 * Everything else is server-only and must never be imported into client components.
 */

/* ─── Schema ──────────────────────────────────────── */

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().default("Xkwisit"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_ENV: z
    .enum(["development", "staging", "production"])
    .default("development"),
  NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:4000/api"),

  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional().default(""),
  NEXT_PUBLIC_POSTHOG_HOST: z
    .string()
    .url()
    .optional()
    .default("https://app.posthog.com"),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional().default(""),

  NEXT_PUBLIC_ENABLE_XRAY: z.coerce.boolean().default(true),
  NEXT_PUBLIC_ENABLE_AI: z.coerce.boolean().default(true),
  NEXT_PUBLIC_ENABLE_ASSESSMENT: z.coerce.boolean().default(true),
  NEXT_PUBLIC_ENABLE_PORTAL: z.coerce.boolean().default(true),

  NEXT_PUBLIC_UPLOAD_MAX_SIZE_MB: z.coerce.number().int().positive().default(25),
});

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  API_URL: z.string().url().default("http://localhost:4000/api"),
  API_SECRET_KEY: z.string().min(1).optional(),

  NEXTAUTH_URL: z.string().url().default("http://localhost:3000"),
  NEXTAUTH_SECRET: z.string().min(1).optional(),
});

/* ─── Parse ───────────────────────────────────────── */

function parseClientEnv() {
  const parsed = clientEnvSchema.safeParse({
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_ENABLE_XRAY: process.env.NEXT_PUBLIC_ENABLE_XRAY,
    NEXT_PUBLIC_ENABLE_AI: process.env.NEXT_PUBLIC_ENABLE_AI,
    NEXT_PUBLIC_ENABLE_ASSESSMENT: process.env.NEXT_PUBLIC_ENABLE_ASSESSMENT,
    NEXT_PUBLIC_ENABLE_PORTAL: process.env.NEXT_PUBLIC_ENABLE_PORTAL,
    NEXT_PUBLIC_UPLOAD_MAX_SIZE_MB: process.env.NEXT_PUBLIC_UPLOAD_MAX_SIZE_MB,
  });

  if (!parsed.success) {
    console.error(
      "Invalid client environment variables:",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error("Invalid client environment variables.");
  }

  return parsed.data;
}

export const env = parseClientEnv();

/* ─── Server-only env ─────────────────────────────── */

export function getServerEnv() {
  // Prevent accidental client-side import
  if (typeof window !== "undefined") {
    throw new Error(
      "getServerEnv() must only be called on the server. Use `env` for client code.",
    );
  }

  const parsed = serverEnvSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    API_URL: process.env.API_URL,
    API_SECRET_KEY: process.env.API_SECRET_KEY,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  });

  if (!parsed.success) {
    console.error(
      "Invalid server environment variables:",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error("Invalid server environment variables.");
  }

  return parsed.data;
}

/* ─── Convenience flags ───────────────────────────── */

export const isProduction = env.NEXT_PUBLIC_APP_ENV === "production";
export const isDevelopment = env.NEXT_PUBLIC_APP_ENV === "development";
export const isStaging = env.NEXT_PUBLIC_APP_ENV === "staging";

export const features = {
  xray: env.NEXT_PUBLIC_ENABLE_XRAY,
  ai: env.NEXT_PUBLIC_ENABLE_AI,
  assessment: env.NEXT_PUBLIC_ENABLE_ASSESSMENT,
  portal: env.NEXT_PUBLIC_ENABLE_PORTAL,
} as const;
