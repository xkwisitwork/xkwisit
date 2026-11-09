"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type FormEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Eye,
  EyeOff,
  Loader2,
  LogIn,
  ScanSearch,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";

import { LogoFull } from "@/components/marketing/Logo";
import { ROUTES, siteConfig } from "@/config/site";
import { loginAccount, registerAccount } from "@/features/auth/api/auth.api";
import { ApiRequestError } from "@/lib/api/errors";
import { cn } from "@/lib/utils/cn";

import { AuthHeroPanel } from "./AuthHeroPanel";

type AuthMode = "login" | "register" | "forgot" | "reset" | "verify";
type RegisterStep = 0 | 1 | 2;

const AUTH_PATH_RE =
  /^\/(login|register|forgot-password|reset-password|verify-email|mfa|accept-invite)(\/|$)/;

const REGISTER_STEPS = [
  {
    title: "About you",
    description: "We’ll use this to set up your workspace profile.",
  },
  {
    title: "Your business",
    description: "So we can tailor Mission Control to your team.",
  },
  {
    title: "Secure your account",
    description: "Choose a password with at least 8 characters.",
  },
] as const;

const APP_RETURN_BLOCK_RE =
  /^\/(dashboard|clients|crm|sales|projects|tasks|approvals|campaigns|content|brand|analytics|intelligence|automation|reports|finance|team|knowledge|messaging|ai|services|portfolio|notifications|settings|platform|sheet-downloads|home|attention|performance|brief|roadmap|messages|files|proposals|contracts|leads|invoices|portal)(\/|$)/;

function isSafeBrowsePath(pathname: string) {
  if (!pathname.startsWith("/") || pathname.startsWith("//")) return false;
  if (AUTH_PATH_RE.test(pathname)) return false;
  if (APP_RETURN_BLOCK_RE.test(pathname)) return false;
  return true;
}

/**
 * Prefer last marketing page (sessionStorage / referrer); never bounce into
 * a protected app route that just sends the user back to login.
 */
function useAuthBackHref() {
  const [href, setHref] = useState<string>(ROUTES.home);
  const [label, setLabel] = useState("Back to home");

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("xkwisit:lastBrowsePath");
      if (stored && isSafeBrowsePath(stored)) {
        setHref(stored);
        setLabel(stored === ROUTES.home ? "Back to home" : "Go back");
        return;
      }
    } catch {
      // ignore
    }

    const ref = document.referrer;
    if (!ref) return;
    try {
      const url = new URL(ref);
      if (url.origin !== window.location.origin) return;
      if (!isSafeBrowsePath(url.pathname)) return;
      setHref(`${url.pathname}${url.search}`);
      setLabel(url.pathname === ROUTES.home ? "Back to home" : "Go back");
    } catch {
      // keep home fallback
    }
  }, []);

  return { href, label };
}

const copy: Record<
  AuthMode,
  {
    title: string;
    description?: string;
    submit: string;
    alt?: { prompt: string; label: string; href: string };
  }
> = {
  login: {
    title: "Welcome back",
    description: "Your weekly numbers, leads, and next meeting — in one place.",
    submit: "Sign in",
    alt: {
      prompt: "New here?",
      label: "Create an account",
      href: ROUTES.register,
    },
  },
  register: {
    title: "Start your growth system",
    description: "Set up your team’s workspace in a few minutes.",
    submit: "Create Account",
    alt: {
      prompt: "Already have an account?",
      label: "Log in",
      href: ROUTES.login,
    },
  },
  forgot: {
    title: "Reset your password",
    description: "We’ll email you a secure link to get back in.",
    submit: "Send reset link",
    alt: { prompt: "", label: "Back to sign in", href: ROUTES.login },
  },
  reset: {
    title: "Choose a new password",
    description: "Use at least 8 characters.",
    submit: "Update password",
    alt: { prompt: "", label: "Back to sign in", href: ROUTES.login },
  },
  verify: {
    title: "Verify your email",
    description: "Enter the code we sent to your inbox.",
    submit: "Verify email",
    alt: { prompt: "", label: "Back to sign in", href: ROUTES.login },
  },
};

/** Soft filled pill — keep fill on focus (no white + purple ring). */
const fieldClass =
  "h-[3.7rem] w-full rounded-[1.85rem] border-0 bg-[#EEF0F8] px-6 text-[0.98rem] leading-none text-[#16024A] placeholder:text-[#98A0B8] outline-none transition-[background-color] duration-200 focus:bg-[#E6E9F4]";

const primaryBtnClass =
  "inline-flex h-[3.7rem] min-w-0 flex-1 items-center justify-center gap-2 rounded-[1.85rem] bg-mint px-6 text-[0.95rem] font-semibold tracking-[-0.01em] text-white shadow-[0_18px_40px_-18px_rgba(59,5,196,0.65)] transition-[transform,opacity,box-shadow] duration-200 hover:scale-[1.01] hover:shadow-[0_20px_44px_-16px_rgba(59,5,196,0.7)] disabled:opacity-60";

const secondaryBtnClass =
  "inline-flex h-[3.7rem] shrink-0 items-center justify-center gap-2 rounded-[1.85rem] bg-[#EEF0F8] px-5 text-[0.92rem] font-semibold tracking-[-0.01em] text-[#16024A] transition-colors duration-200 hover:bg-[#E4E7F2] disabled:opacity-60";

const fieldSpring = { type: "spring" as const, stiffness: 460, damping: 16, mass: 0.55 };

function AuthInput({
  className,
  reduceMotion,
  delay = 0,
  ...props
}: Omit<ComponentPropsWithoutRef<"input">, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> & {
  reduceMotion?: boolean | null;
  delay?: number;
}) {
  return (
    <motion.input
      className={cn(fieldClass, className)}
      initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...fieldSpring, delay }}
      whileFocus={
        reduceMotion
          ? undefined
          : {
              scale: 1.025,
              y: -2,
              transition: fieldSpring,
            }
      }
      {...props}
    />
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[1-9]\d{7,14}$/;

function normalizePhone(raw: string) {
  return raw.replace(/[\s().-]/g, "").trim();
}

function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) {
    throw new Error("Enter your first and last name.");
  }
  const firstName = parts[0]!;
  const lastName = parts.slice(1).join(" ");
  return { firstName, lastName };
}

function RegisterStepProgress({ step }: { step: RegisterStep }) {
  return (
    <div
      className="mb-7 flex items-center justify-center gap-2.5"
      aria-label={`Step ${step + 1} of ${REGISTER_STEPS.length}`}
    >
      {REGISTER_STEPS.map((_, i) => {
        const active = i === step;
        const done = i < step;
        return (
          <span
            key={i}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              active ? "w-9 bg-mint" : done ? "w-5 bg-mint/40" : "w-5 bg-[#E5E1EC]",
            )}
            aria-hidden
          />
        );
      })}
    </div>
  );
}

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [registerStep, setRegisterStep] = useState<RegisterStep>(0);
  const [stepDir, setStepDir] = useState(1);
  // Remount login inputs after logout so the browser does not dump password into email.
  const [fieldNonce, setFieldNonce] = useState(0);
  // Chrome won't autofill readonly fields — unlock on first focus.
  const [fieldsLocked, setFieldsLocked] = useState(mode === "login");
  const [justLoggedOut, setJustLoggedOut] = useState(false);
  const meta = copy[mode];
  const isSplit = mode === "login" || mode === "register";
  const back = useAuthBackHref();
  const registerMeta =
    mode === "register" ? REGISTER_STEPS[registerStep] : null;
  const headingTitle = registerMeta?.title ?? meta.title;
  const headingDescription = registerMeta?.description ?? meta.description;

  /** Wipe prior-user cache and hard-navigate so the app shell remounts cleanly. */
  function enterAuthenticatedApp(destination: string) {
    queryClient.clear();
    window.location.assign(destination);
  }

  useEffect(() => {
    const loggedOut =
      mode === "login" &&
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("loggedOut") === "1";

    setJustLoggedOut(loggedOut);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setError(null);
    setFieldNonce((n) => n + 1);
    setFieldsLocked(mode === "login");

    if (loggedOut) {
      window.history.replaceState({}, "", "/login");
    }
  }, [mode]);

  // Scrub bogus autofill: password managers sometimes drop a password into Email.
  useEffect(() => {
    if (mode !== "login") return;

    const scrub = () => {
      setEmail((prev) => {
        const trimmed = prev.trim();
        if (!trimmed) return "";
        // Keep only values that look like an email.
        return EMAIL_RE.test(trimmed) ? trimmed : "";
      });
    };

    const t0 = window.setTimeout(scrub, 0);
    const t1 = window.setTimeout(scrub, 150);
    const t2 = window.setTimeout(scrub, 600);
    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [mode, fieldNonce, justLoggedOut]);

  async function establishSession(credentials: { email: string; password: string }) {
    const result = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error("Account created, but sign-in failed. Try signing in.");
    }
  }

  function validateRegisterStep(step: RegisterStep): string | null {
    if (step === 0) {
      const nameParts = name.trim().split(/\s+/).filter(Boolean);
      if (nameParts.length < 2) {
        return "Enter your first and last name.";
      }
      if (!EMAIL_RE.test(email.trim())) return "Enter a valid work email.";
      return null;
    }
    if (step === 1) {
      if (!company.trim()) return "Company name is required.";
      if (!PHONE_RE.test(normalizePhone(phone))) {
        return "Enter a valid phone number (e.g. +2348012345678).";
      }
      return null;
    }
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return null;
  }

  function goRegisterStep(next: RegisterStep) {
    setStepDir(next > registerStep ? 1 : -1);
    setError(null);
    setRegisterStep(next);
  }

  async function submitRegister() {
    const stepError = validateRegisterStep(2);
    if (stepError) throw new Error(stepError);

    const { firstName, lastName } = splitFullName(name);
    const created = await registerAccount({
      email: email.trim(),
      password,
      confirmPassword,
      firstName,
      lastName,
      companyName: company.trim(),
      phone: normalizePhone(phone),
    });
    await establishSession({ email: email.trim(), password });
    toast.success("Workspace created");
    enterAuthenticatedApp(
      created.user.isPlatformAdmin ? "/platform" : ROUTES.dashboard,
    );
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (mode === "register") {
      const stepError = validateRegisterStep(registerStep);
      if (stepError) {
        setError(stepError);
        toast.error(stepError);
        return;
      }
      if (registerStep < 2) {
        goRegisterStep((registerStep + 1) as RegisterStep);
        return;
      }
    }

    setLoading(true);

    try {
      if (mode === "register") {
        await submitRegister();
        return;
      }

      if (mode === "login") {
        const loggedIn = await loginAccount({ email: email.trim(), password });
        await establishSession({ email: email.trim(), password });
        toast.success("Welcome back");
        enterAuthenticatedApp(
          loggedIn.user.isPlatformAdmin ? "/platform" : ROUTES.dashboard,
        );
        return;
      }

      if (mode === "forgot") {
        await apiForgot(email.trim());
        toast.success("If that email exists, a reset link was sent");
        router.push(ROUTES.login);
        return;
      }

      toast.message("This flow isn’t wired yet");
      setLoading(false);
    } catch (err) {
      const message =
        err instanceof ApiRequestError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";
      setError(message);
      toast.error(message);
      setLoading(false);
    }
  }

  const registerFields = (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-[24rem] space-y-5">
      <RegisterStepProgress step={registerStep} />

      <div className="relative min-h-[8.5rem] overflow-visible">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={registerStep}
            initial={reduce ? false : { opacity: 0, x: stepDir * 22 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: stepDir * -18 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {registerStep === 0 ? (
              <>
                <label className="block">
                  <span className="sr-only">First and last name</span>
                  <AuthInput
                    reduceMotion={reduce}
                    delay={0}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    placeholder="First and last name"
                    autoFocus
                    required
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Work email</span>
                  <AuthInput
                    reduceMotion={reduce}
                    delay={0.06}
                    name="email"
                    type="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="Work email"
                    required
                  />
                </label>
              </>
            ) : null}

            {registerStep === 1 ? (
              <>
                <label className="block">
                  <span className="sr-only">Company</span>
                  <AuthInput
                    reduceMotion={reduce}
                    delay={0}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    autoComplete="organization"
                    placeholder="Company name"
                    autoFocus
                    required
                  />
                </label>
                <label className="block">
                  <span className="sr-only">Phone number</span>
                  <AuthInput
                    reduceMotion={reduce}
                    delay={0.06}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    placeholder="Phone (e.g. +2348012345678)"
                    required
                  />
                </label>
              </>
            ) : null}

            {registerStep === 2 ? (
              <>
                <label className="relative block">
                  <span className="sr-only">Password</span>
                  <AuthInput
                    reduceMotion={reduce}
                    delay={0}
                    className="pr-14"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Password (min. 8 characters)"
                    minLength={8}
                    autoFocus
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 z-10 -translate-y-1/2 rounded-xl p-2 text-[#8B849E] transition-colors hover:bg-white/60 hover:text-mint"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </label>
                <label className="relative block">
                  <span className="sr-only">Confirm password</span>
                  <AuthInput
                    reduceMotion={reduce}
                    delay={0.06}
                    className="pr-14"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="Confirm password"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 z-10 -translate-y-1/2 rounded-xl p-2 text-[#8B849E] transition-colors hover:bg-white/60 hover:text-mint"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </label>
              </>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {error ? (
        <p
          className="rounded-2xl bg-red-50 px-4 py-3 text-[0.84rem] leading-relaxed text-red-700"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <div className="flex gap-3 pt-1">
        {registerStep > 0 ? (
          <button
            type="button"
            onClick={() => goRegisterStep((registerStep - 1) as RegisterStep)}
            disabled={loading}
            className={secondaryBtnClass}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </button>
        ) : null}
        <button type="submit" disabled={loading} className={primaryBtnClass}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : registerStep < 2 ? (
            <>
              Continue
              <ArrowRight className="h-4 w-4" aria-hidden />
            </>
          ) : (
            meta.submit
          )}
        </button>
      </div>
    </form>
  );

  const formFields =
    mode === "register" ? (
      registerFields
    ) : (
      <form
        onSubmit={onSubmit}
        className="mx-auto w-full max-w-[24rem] space-y-4"
        autoComplete={justLoggedOut || mode !== "login" ? "off" : "on"}
      >
        {mode === "login" || mode === "forgot" || mode === "verify" ? (
          <label className="block space-y-1.5">
            <span className="block text-[0.78rem] font-semibold text-[#16024A]">
              Email
            </span>
            <AuthInput
              key={`email-${mode}-${fieldNonce}`}
              reduceMotion={reduce}
              delay={0}
              id="login-email"
              name="email"
              type="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFieldsLocked(false)}
              readOnly={mode === "login" && fieldsLocked}
              autoComplete={justLoggedOut ? "off" : "email"}
              placeholder="you@company.com"
              required
            />
          </label>
        ) : null}

        {mode === "login" || mode === "reset" ? (
          <div className="space-y-1.5">
            <label
              htmlFor="login-password"
              className="block text-[0.78rem] font-semibold text-[#16024A]"
            >
              {mode === "reset" ? "New password" : "Password"}
            </label>
            <div className="relative">
              <AuthInput
                key={`password-${mode}-${fieldNonce}`}
                reduceMotion={reduce}
                delay={0.06}
                className="pr-14"
                id="login-password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFieldsLocked(false)}
                readOnly={mode === "login" && fieldsLocked}
                autoComplete={
                  justLoggedOut
                    ? "off"
                    : mode === "login"
                      ? "current-password"
                      : "new-password"
                }
                placeholder={mode === "reset" ? "New password" : "Password"}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 z-10 -translate-y-1/2 rounded-xl p-2 text-[#8B849E] transition-colors hover:bg-white/60 hover:text-mint"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        ) : null}

        {mode === "verify" ? (
          <label className="block">
            <span className="sr-only">Verification code</span>
            <AuthInput
              reduceMotion={reduce}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Verification code"
              required
            />
          </label>
        ) : null}

        {mode === "login" ? (
          <div className="flex justify-end pt-0.5">
            <Link
              href={ROUTES.forgotPassword}
              className="text-[0.84rem] font-medium text-[#6B6484] transition-colors hover:text-mint"
            >
              Forgot password?
            </Link>
          </div>
        ) : null}

        {error ? (
          <p
            className="rounded-2xl bg-red-50 px-4 py-3 text-[0.84rem] leading-relaxed text-red-700"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className={cn(primaryBtnClass, "mt-1 w-full flex-none")}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : meta.submit}
        </button>
      </form>
    );

  if (!isSplit) {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "mx-auto w-full bg-white",
          "max-w-none rounded-none p-5 shadow-none ring-0",
          "tablet:max-w-md tablet:rounded-[2rem] tablet:p-7 tablet:shadow-[0_40px_100px_-48px_rgba(22,2,74,0.45)] tablet:ring-1 tablet:ring-white/80 mobile-sm:tablet:p-9",
        )}
      >
        <Link
          href={back.href}
          className="mb-6 inline-flex items-center gap-1.5 text-[0.84rem] font-medium text-[#6B6484] transition-colors hover:text-mint"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {back.label}
        </Link>
        <div className="mb-8 flex flex-col items-center text-center">
          <LogoFull size="sm" className="mb-6" />
          <h1 className="font-display text-[1.65rem] font-bold tracking-tight text-[#16024A]">
            {headingTitle}
          </h1>
          {headingDescription ? (
            <p className="mx-auto mt-3 max-w-[32ch] text-[0.92rem] leading-relaxed text-[#6B6484]">
              {headingDescription}
            </p>
          ) : null}
        </div>
        {formFields}
        {meta.alt ? (
          <p className="mt-6 text-center text-[0.9rem] text-[#6B6484]">
            {meta.alt.prompt ? `${meta.alt.prompt} ` : null}
            <Link href={meta.alt.href} className="font-semibold text-[#16024A] hover:text-mint">
              {meta.alt.label}
            </Link>
          </p>
        ) : null}
      </motion.div>
    );
  }

  const cloudLinks =
    mode === "register"
      ? [
          { href: ROUTES.growthAssessment, label: "Free X-Ray", Icon: ScanSearch },
          { href: ROUTES.book, label: "Book a call", Icon: Calendar },
          { href: ROUTES.login, label: "Sign in", Icon: LogIn },
        ]
      : [
          { href: ROUTES.growthAssessment, label: "Free X-Ray", Icon: ScanSearch },
          { href: ROUTES.book, label: "Book a call", Icon: Calendar },
          { href: ROUTES.register, label: "Create account", Icon: UserPlus },
        ];

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mx-auto grid w-full bg-white",
        // Mobile: full-bleed white page, no floating card cut-out
        "max-w-none overflow-visible rounded-none shadow-none ring-0",
        // Tablet+: Voyger floating split card
        "tablet:max-w-[68rem] tablet:overflow-hidden tablet:rounded-[2rem]",
        "tablet:shadow-[0_40px_120px_-48px_rgba(22,2,74,0.5),0_20px_48px_-28px_rgba(59,5,196,0.22)]",
        "tablet:ring-1 tablet:ring-white/90",
        "laptop:grid-cols-[minmax(0,0.92fr)_minmax(0,1.15fr)]",
      )}
    >
      {/* Form column */}
      <div className="relative flex flex-col justify-center px-5 py-6 mobile-sm:px-6 mobile-sm:py-8 tablet:px-10 tablet:py-12">
        <div className="mx-auto w-full max-w-[24rem]">
          <Link
            href={back.href}
            className="mb-6 inline-flex items-center gap-1.5 text-[0.84rem] font-medium text-[#6B6484] transition-colors hover:text-mint"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {back.label}
          </Link>
          <div className="mb-8 flex flex-col items-center text-center">
            <LogoFull size="sm" className="mb-6" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode === "register" ? registerStep : mode}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1 className="font-display text-[clamp(1.55rem,3.2vw,1.95rem)] font-bold leading-tight tracking-tight text-[#16024A]">
                  {headingTitle}
                </h1>
                {headingDescription ? (
                  <p className="mx-auto mt-3 max-w-[32ch] text-[0.92rem] leading-relaxed text-[#6B6484]">
                    {headingDescription}
                  </p>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Voyger-style shortcut cluster — first register step / login only */}
          {mode === "login" || (mode === "register" && registerStep === 0) ? (
            <>
              <div className="mb-6 flex justify-center">
                <div
                  className="relative flex items-center justify-center gap-3.5 bg-[#F5F3F8] px-6 py-4"
                  style={{
                    borderRadius:
                      "2.75rem 2.1rem 2.75rem 2.1rem / 2.4rem 2.75rem 2.1rem 2.75rem",
                  }}
                >
                  {cloudLinks.map(({ href, label, Icon }) => (
                    <Link
                      key={`${href}-${label}`}
                      href={href}
                      title={label}
                      aria-label={label}
                      className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#16024A] shadow-[0_10px_24px_-14px_rgba(22,2,74,0.45)] ring-1 ring-[#ECEAF2] transition-transform hover:scale-105 hover:text-mint"
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </Link>
                  ))}
                </div>
              </div>

              <p className="mb-5 text-center text-[0.78rem] font-medium uppercase tracking-[0.16em] text-[#9A93AE]">
                or
              </p>
            </>
          ) : null}

          {formFields}

          {meta.alt ? (
            <p className="mt-6 text-center text-[0.9rem] text-[#6B6484]">
              {meta.alt.prompt ? `${meta.alt.prompt} ` : null}
              <Link
                href={meta.alt.href}
                className="font-semibold text-[#16024A] transition-colors hover:text-mint"
              >
                {meta.alt.label}
              </Link>
            </p>
          ) : null}

          <p className="mt-8 hidden text-center text-[0.72rem] text-[#A39BB8] tablet:block">
            © {new Date().getFullYear()} {siteConfig.legalName}
          </p>
        </div>
      </div>

      {/* Visual column — tablet/desktop card only */}
      <div className="relative hidden min-h-0 flex-col p-3 mobile-sm:p-4 laptop:flex">
        <div className="min-h-0 flex-1">
          <AuthHeroPanel mode={mode} />
        </div>
      </div>
    </motion.div>
  );
}

async function apiForgot(email: string) {
  const { apiClient } = await import("@/lib/api/client");
  const { endpoints } = await import("@/lib/api/endpoints");
  await apiClient(endpoints.auth.forgotPassword, {
    method: "POST",
    body: { email },
  });
}
