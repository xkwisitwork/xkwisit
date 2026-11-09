import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

import { env } from "../../config/env.js";
import { toBillingSnapshot } from "../../config/entitlements.js";
import {
  signAccessToken,
  signRefreshToken,
} from "../../middleware/auth.middleware.js";
import { Membership } from "../../models/Membership.js";
import {
  defaultTrialWindow,
  Organization,
} from "../../models/Organization.js";
import { User } from "../../models/User.js";
import {
  badRequest,
  conflict,
  notFound,
  tooManyRequests,
  unauthorized,
} from "../../utils/errors.js";
import { slugify } from "../../utils/slugify.js";
import {
  buildUserRoles,
  mapMembershipRole,
  toPublicUser,
} from "./auth.types.js";
import { normalizePhone } from "./auth.schema.js";

/** Keep User.roles / membershipRole in sync with membership + platform flag. */
async function syncUserRoles(
  user: InstanceType<typeof User>,
  membershipRole: string | undefined,
  isPlatformAdmin: boolean,
) {
  const roles = buildUserRoles(membershipRole, isPlatformAdmin);
  const nextMembership = membershipRole ?? user.membershipRole ?? "MEMBER";
  const sameRoles =
    Array.isArray(user.roles) &&
    user.roles.length === roles.length &&
    user.roles.every((r, i) => r === roles[i]);
  if (sameRoles && user.membershipRole === nextMembership) return;
  user.roles = roles;
  user.membershipRole = nextMembership as
    | "OWNER"
    | "ADMIN"
    | "MEMBER"
    | "VIEWER";
  await user.save();
}

function platformAdminAllowlist(): Set<string> {
  return new Set(
    env.PLATFORM_ADMIN_EMAILS.split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  );
}

function isAllowlistedPlatformAdmin(email: string): boolean {
  return platformAdminAllowlist().has(email.toLowerCase().trim());
}

/**
 * Resolve platform-admin flag from DB + server allowlist.
 * Client payloads can never grant this.
 */
async function resolvePlatformAdmin(
  user: InstanceType<typeof User>,
): Promise<boolean> {
  const allowlisted = isAllowlistedPlatformAdmin(user.email);
  if (allowlisted && !user.isPlatformAdmin) {
    user.isPlatformAdmin = true;
    await user.save();
  }
  // Do not auto-demote: an allowlist removal should go through platform UI.
  return Boolean(user.isPlatformAdmin);
}

const MAX_FAILED_ATTEMPTS = 3;
const LOCKOUT_STEP_MS = 5 * 60 * 1000; // 5 minutes, then 10, 15, …

function isLocked(user: { lockUntil?: Date | null }) {
  return Boolean(user.lockUntil && user.lockUntil.getTime() > Date.now());
}

function lockMessage(lockUntil: Date) {
  const ms = Math.max(0, lockUntil.getTime() - Date.now());
  const mins = Math.ceil(ms / 60_000);
  return `Account locked due to too many failed attempts. Try again in about ${mins} minute${mins === 1 ? "" : "s"}.`;
}

async function recordFailedLogin(user: InstanceType<typeof User>) {
  const attempts = (user.failedLoginAttempts ?? 0) + 1;
  user.failedLoginAttempts = attempts;

  if (attempts >= MAX_FAILED_ATTEMPTS) {
    const nextLevel = (user.lockoutLevel ?? 0) + 1;
    user.lockoutLevel = nextLevel;
    user.lockUntil = new Date(Date.now() + nextLevel * LOCKOUT_STEP_MS);
    user.failedLoginAttempts = 0;
    await user.save();
    throw tooManyRequests(lockMessage(user.lockUntil));
  }

  await user.save();
  const remaining = MAX_FAILED_ATTEMPTS - attempts;
  throw unauthorized(
    `Invalid email or password. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining before lockout.`,
  );
}

async function clearLockoutState(user: InstanceType<typeof User>) {
  if (
    user.failedLoginAttempts ||
    user.lockoutLevel ||
    user.lockUntil
  ) {
    user.failedLoginAttempts = 0;
    user.lockoutLevel = 0;
    user.lockUntil = null;
    await user.save();
  }
}

async function uniqueOrgSlug(base: string): Promise<string> {
  let slug = slugify(base);
  let n = 0;
  while (await Organization.exists({ slug: n ? `${slug}-${n}` : slug })) {
    n += 1;
  }
  return n ? `${slug}-${n}` : slug;
}

async function billingForOrgId(orgId: string) {
  const org = await Organization.findById(orgId);
  if (!org) return undefined;
  return toBillingSnapshot({
    plan: org.plan as "STARTER" | "GROWTH" | "SCALE" | "ENTERPRISE",
    status: org.status as "TRIAL" | "ACTIVE" | "PAST_DUE" | "SUSPENDED" | "CANCELLED",
    trialStartsAt: org.trialStartsAt,
    trialEndsAt: org.trialEndsAt,
    seatsIncluded: org.seatsIncluded,
  });
}

export async function registerUser(input: {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  companyName: string;
  phone: string;
}) {
  const email = input.email.toLowerCase().trim();
  const phone = normalizePhone(input.phone);
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  if (!firstName || !lastName) {
    throw badRequest("Enter both your first and last name");
  }
  if (firstName.toLowerCase() === lastName.toLowerCase()) {
    throw badRequest("Enter both your first and last name");
  }

  const existing = await User.findOne({ email });
  if (existing) throw conflict("Email already registered");

  const existingPhone = await User.findOne({ phone });
  if (existingPhone) throw conflict("Phone number already registered");

  const passwordHash = await bcrypt.hash(input.password, 12);
  const name = `${firstName} ${lastName}`.trim();
  const verifyToken = nanoid(32);
  // Platform admin is server-allowlist only — never from request body.
  const isPlatformAdmin = isAllowlistedPlatformAdmin(email);

  let user: InstanceType<typeof User> | null = null;
  let organization: InstanceType<typeof Organization> | null = null;

  try {
    user = await User.create({
      email,
      passwordHash,
      name,
      phone,
      verifyToken,
      isPlatformAdmin,
      roles: buildUserRoles("OWNER", isPlatformAdmin),
      membershipRole: "OWNER",
      failedLoginAttempts: 0,
      lockoutLevel: 0,
      lockUntil: null,
    });

    const { trialStartsAt, trialEndsAt } = defaultTrialWindow();
    const slug = await uniqueOrgSlug(input.companyName);
    organization = await Organization.create({
      name: input.companyName.trim(),
      slug,
      ownerId: user._id,
      plan: "GROWTH",
      status: "TRIAL",
      trialStartsAt,
      trialEndsAt,
      seatsIncluded: 5,
    });

    const membership = await Membership.create({
      orgId: organization._id,
      userId: user._id,
      role: "OWNER",
    });

    console.log(
      `[auth] registered user=${email} id=${String(user._id)} roles=${user.roles?.join(",")} platformAdmin=${isPlatformAdmin}`,
    );
    console.log(`[auth] verify-email token for ${email}: ${verifyToken}`);
    console.log(
      `[auth] trial until ${trialEndsAt.toISOString()} for org ${organization.slug}`,
    );

    const appRole = mapMembershipRole(membership.role, isPlatformAdmin);
    const tokens = issueTokens({
      userId: String(user._id),
      email: user.email,
      orgId: String(organization._id),
      role: appRole,
      isPlatformAdmin,
    });

    return {
      user: toPublicUser(user, String(organization._id), membership.role),
      organization: {
        id: String(organization._id),
        name: organization.name,
        slug: organization.slug,
      },
      billing: toBillingSnapshot({
        plan: "GROWTH",
        status: "TRIAL",
        trialStartsAt,
        trialEndsAt,
        seatsIncluded: 5,
      }),
      ...tokens,
    };
  } catch (err) {
    // Roll back partial writes so failed signups do not leave ghost users.
    if (organization?._id) {
      await Membership.deleteMany({ orgId: organization._id }).catch(() => {});
      await Organization.deleteOne({ _id: organization._id }).catch(() => {});
    }
    if (user?._id) {
      await User.deleteOne({ _id: user._id }).catch(() => {});
    }
    // Unique index race on phone/email
    const code = (err as { code?: number })?.code;
    if (code === 11000) {
      const key = String((err as { keyPattern?: Record<string, number> }).keyPattern ?? "");
      if (key.includes("phone")) throw conflict("Phone number already registered");
      if (key.includes("email")) throw conflict("Email already registered");
      throw conflict("Account already exists");
    }
    throw err;
  }
}

export async function loginUser(input: { email: string; password: string }) {
  const email = input.email.toLowerCase().trim();
  const user = await User.findOne({ email });
  if (!user) throw unauthorized("Invalid email or password");

  if (isLocked(user)) {
    throw tooManyRequests(lockMessage(user.lockUntil as Date));
  }

  // Lock window elapsed — allow a fresh set of attempts
  if (user.lockUntil && user.lockUntil.getTime() <= Date.now()) {
    user.lockUntil = null;
    user.failedLoginAttempts = 0;
    await user.save();
  }

  const ok = await bcrypt.compare(input.password, user.passwordHash);
  if (!ok) {
    await recordFailedLogin(user);
  }

  await clearLockoutState(user);

  const isPlatformAdmin = await resolvePlatformAdmin(user);

  const membership = await Membership.findOne({ userId: user._id }).sort({
    createdAt: 1,
  });
  if (!membership && !isPlatformAdmin) {
    throw unauthorized("No organization membership");
  }

  const orgId = membership
    ? String(membership.orgId)
    : ""; // platform admin without org — rare

  // Platform admins without membership: attach first org or empty
  let resolvedOrgId = orgId;
  if (!resolvedOrgId && isPlatformAdmin) {
    const anyOrg = await Organization.findOne().sort({ createdAt: 1 });
    resolvedOrgId = anyOrg ? String(anyOrg._id) : "";
  }

  if (!resolvedOrgId) throw unauthorized("No organization membership");

  await syncUserRoles(user, membership?.role, isPlatformAdmin);

  const appRole = mapMembershipRole(membership?.role, isPlatformAdmin);
  const tokens = issueTokens({
    userId: String(user._id),
    email: user.email,
    orgId: resolvedOrgId,
    role: appRole,
    isPlatformAdmin,
  });

  return {
    user: toPublicUser(
      user,
      resolvedOrgId,
      membership?.role ?? "OWNER",
    ),
    billing: await billingForOrgId(resolvedOrgId),
    ...tokens,
  };
}

export function issueTokens(input: {
  userId: string;
  email: string;
  orgId: string;
  role: string;
  isPlatformAdmin?: boolean;
}) {
  const accessToken = signAccessToken({
    sub: input.userId,
    email: input.email,
    orgId: input.orgId,
    role: input.role,
    isPlatformAdmin: input.isPlatformAdmin,
  });
  const refreshToken = signRefreshToken({ sub: input.userId });
  return { accessToken, refreshToken };
}

export async function updateAvatar(userId: string, avatarUrl: string) {
  const user = await User.findById(userId);
  if (!user) throw notFound("User not found");

  user.avatarUrl = avatarUrl.trim();
  await user.save();

  const isPlatformAdmin = await resolvePlatformAdmin(user);
  const membership = await Membership.findOne({ userId: user._id }).sort({
    createdAt: 1,
  });
  let orgId = membership ? String(membership.orgId) : "";
  if (!orgId && isPlatformAdmin) {
    const anyOrg = await Organization.findOne().sort({ createdAt: 1 });
    orgId = anyOrg ? String(anyOrg._id) : "";
  }
  if (!orgId) throw unauthorized("No organization membership");

  return {
    user: toPublicUser(user, orgId, membership?.role ?? "OWNER"),
  };
}

export async function getMe(userId: string, orgId?: string) {
  const user = await User.findById(userId);
  if (!user) throw notFound("User not found");

  const isPlatformAdmin = await resolvePlatformAdmin(user);

  const membership = orgId
    ? await Membership.findOne({ userId, orgId })
    : await Membership.findOne({ userId }).sort({ createdAt: 1 });

  if (!membership && !isPlatformAdmin) {
    throw notFound("Membership not found");
  }

  let resolvedOrgId = membership ? String(membership.orgId) : orgId;
  if (!resolvedOrgId && isPlatformAdmin) {
    const anyOrg = await Organization.findOne().sort({ createdAt: 1 });
    resolvedOrgId = anyOrg ? String(anyOrg._id) : undefined;
  }
  if (!resolvedOrgId) throw notFound("Membership not found");

  await syncUserRoles(user, membership?.role, isPlatformAdmin);

  const organization = await Organization.findById(resolvedOrgId);

  return {
    user: toPublicUser(user, resolvedOrgId, membership?.role ?? "OWNER"),
    organization: organization
      ? {
          id: String(organization._id),
          name: organization.name,
          slug: organization.slug,
        }
      : null,
    billing: await billingForOrgId(resolvedOrgId),
  };
}

export async function refreshSession(refreshToken: string) {
  const { verifyRefreshToken } = await import("../../middleware/auth.middleware.js");
  let payload: { sub: string };
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw unauthorized("Invalid refresh token");
  }

  const user = await User.findById(payload.sub);
  if (!user) throw unauthorized("User not found");

  const isPlatformAdmin = await resolvePlatformAdmin(user);

  const membership = await Membership.findOne({ userId: user._id }).sort({
    createdAt: 1,
  });
  if (!membership && !isPlatformAdmin) {
    throw unauthorized("No organization membership");
  }

  let orgId = membership ? String(membership.orgId) : "";
  if (!orgId && isPlatformAdmin) {
    const anyOrg = await Organization.findOne().sort({ createdAt: 1 });
    orgId = anyOrg ? String(anyOrg._id) : "";
  }
  if (!orgId) throw unauthorized("No organization membership");

  await syncUserRoles(user, membership?.role, isPlatformAdmin);

  const tokens = issueTokens({
    userId: String(user._id),
    email: user.email,
    orgId,
    role: mapMembershipRole(membership?.role, isPlatformAdmin),
    isPlatformAdmin,
  });

  return {
    user: toPublicUser(user, orgId, membership?.role ?? "OWNER"),
    billing: await billingForOrgId(orgId),
    ...tokens,
  };
}

export async function forgotPassword(emailRaw: string) {
  const email = emailRaw.toLowerCase().trim();
  const user = await User.findOne({ email });
  if (!user) {
    return { message: "If that email exists, a reset link was sent" };
  }

  const resetToken = nanoid(32);
  user.resetToken = resetToken;
  user.resetTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();

  console.log(`[auth] reset-password token for ${email}: ${resetToken}`);
  return { message: "If that email exists, a reset link was sent", token: resetToken };
}

export async function resetPassword(input: {
  token: string;
  password: string;
}) {
  const user = await User.findOne({
    resetToken: input.token,
    resetTokenExpiresAt: { $gt: new Date() },
  });
  if (!user) throw badRequest("Invalid or expired reset token");

  user.passwordHash = await bcrypt.hash(input.password, 12);
  user.resetToken = null;
  user.resetTokenExpiresAt = null;
  await user.save();

  return { message: "Password updated" };
}

export async function verifyEmail(token: string) {
  const user = await User.findOne({ verifyToken: token });
  if (!user) throw badRequest("Invalid verification token");

  user.emailVerifiedAt = new Date();
  user.verifyToken = null;
  await user.save();

  return { message: "Email verified" };
}
