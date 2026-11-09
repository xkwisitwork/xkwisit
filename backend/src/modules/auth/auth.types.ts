import type { UserDocument, UserRole } from "../../models/User.js";
import type { PublicUser } from "../../types/auth.types.js";

export type {
  AccessTokenPayload,
  AuthContext,
  AuthRequestUser,
  AuthSessionPayload,
  LoginCredentials,
  MembershipRoleName,
  PasswordResetPayload,
  PasswordResetRequest,
  PublicUser,
  RegisterPayload,
  UserRole,
  UserStatus,
} from "../../types/auth.types.js";

function splitName(name: string): { firstName: string; lastName: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] ?? name;
  // Never invent a last name by repeating the first.
  const lastName = parts.slice(1).join(" ");
  return { firstName, lastName };
}

/** Map org membership → app RBAC role. Platform admin always wins. */
export function mapMembershipRole(
  membershipRole: string | undefined,
  isPlatformAdmin: boolean,
): UserRole {
  if (isPlatformAdmin) return "SUPER_ADMIN";
  if (membershipRole === "OWNER" || membershipRole === "ADMIN") {
    return "AGENCY_MANAGER";
  }
  if (membershipRole === "MEMBER") return "STRATEGIST";
  if (membershipRole === "VIEWER") return "CLIENT_VIEWER";
  return "STRATEGIST";
}

/** Build the roles array stored on the User document. */
export function buildUserRoles(
  membershipRole: string | undefined,
  isPlatformAdmin: boolean,
): UserRole[] {
  const primary = mapMembershipRole(membershipRole, isPlatformAdmin);
  if (isPlatformAdmin && primary !== "SUPER_ADMIN") {
    return ["SUPER_ADMIN", primary];
  }
  return [primary];
}

export function toPublicUser(
  user: UserDocument,
  orgId: string,
  membershipRole?: string,
): PublicUser {
  const { firstName, lastName } = splitName(user.name);
  const isPlatformAdmin = Boolean(user.isPlatformAdmin);
  const resolvedMembership =
    membershipRole ??
    (user as { membershipRole?: string | null }).membershipRole ??
    null;
  const roles =
    Array.isArray((user as { roles?: string[] }).roles) &&
    (user as { roles?: string[] }).roles!.length > 0
      ? (user as { roles: string[] }).roles
      : buildUserRoles(resolvedMembership ?? undefined, isPlatformAdmin);

  return {
    id: String(user._id),
    email: user.email,
    firstName,
    lastName,
    fullName: user.name,
    avatarUrl:
      typeof (user as { avatarUrl?: string | null }).avatarUrl === "string" &&
      (user as { avatarUrl?: string | null }).avatarUrl!.trim()
        ? (user as { avatarUrl: string }).avatarUrl.trim()
        : null,
    phone: (user as { phone?: string | null }).phone ?? null,
    jobTitle: null,
    role: roles[0] ?? mapMembershipRole(resolvedMembership ?? undefined, isPlatformAdmin),
    roles,
    membershipRole: resolvedMembership,
    status: "ACTIVE",
    organizationId: orgId,
    isPlatformAdmin,
    lastLoginAt: null,
    mfaEnabled: false,
    createdAt: (user as { createdAt?: Date }).createdAt?.toISOString?.() ??
      new Date().toISOString(),
    updatedAt: (user as { updatedAt?: Date }).updatedAt?.toISOString?.() ??
      new Date().toISOString(),
  };
}
