import type { Session as NextAuthSession } from "next-auth";

import { ROLE_PERMISSIONS, type Permission } from "@/lib/constants/permissions";
import { ROLES, type Role } from "@/lib/constants/roles";
import type { Session, User } from "@/types/auth";

function usable(value: unknown): string {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^undefined(\s+undefined)*$/i.test(trimmed)) return "";
  if (/^null(\s+null)*$/i.test(trimmed)) return "";
  return trimmed;
}

/**
 * Maps a live NextAuth client/server session into the app Session shape.
 * Always derives identity from the authenticated principal — never merges
 * leftover fields from a previous user.
 */
export function mapNextAuthToAppSession(
  nextSession: NextAuthSession | null | undefined,
): Session | null {
  if (!nextSession?.user?.id) return null;

  const raw = nextSession.user;
  const email = usable(raw.email);
  const isPlatformAdmin = Boolean(raw.isPlatformAdmin);
  const role: Role = isPlatformAdmin
    ? ROLES.SUPER_ADMIN
    : ((raw.role as Role | undefined) ?? ROLES.CLIENT_VIEWER);

  const fromParts = [raw.firstName, raw.lastName].map(usable).filter(Boolean).join(" ");
  const fullName =
    usable(raw.fullName) || usable(raw.name) || fromParts || email;

  const firstName =
    usable(raw.firstName) || fullName.split(/\s+/).filter(Boolean)[0] || "";
  const lastName =
    usable(raw.lastName) || fullName.split(/\s+/).filter(Boolean).slice(1).join(" ") || "";

  const user: User = {
    id: String(raw.id),
    email,
    firstName,
    lastName,
    fullName,
    avatarUrl: (raw.image as string | null | undefined) ?? null,
    phone: null,
    jobTitle: null,
    role,
    status: "ACTIVE",
    organizationId: String(raw.organizationId ?? ""),
    isPlatformAdmin,
    lastLoginAt: null,
    mfaEnabled: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return {
    user,
    permissions: (ROLE_PERMISSIONS[role] ?? []) as Permission[],
    expiresAt:
      nextSession.expires ??
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };
}
