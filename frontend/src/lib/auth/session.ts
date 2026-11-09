import { getServerSession } from "next-auth";

import type { Session, User } from "@/types/auth";
import type { Permission } from "@/lib/constants/permissions";
import { ROLE_PERMISSIONS } from "@/lib/constants/permissions";
import type { Role } from "@/lib/constants/roles";
import { authOptions } from "./config";

function isUsableName(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (/^undefined(\s+undefined)*$/i.test(trimmed)) return false;
  if (/^null(\s+null)*$/i.test(trimmed)) return false;
  return true;
}

function splitName(fullName: string | null | undefined): {
  firstName: string;
  lastName: string;
} {
  const parts = (fullName ?? "")
    .trim()
    .split(/\s+/)
    .filter((part) => isUsableName(part));
  if (parts.length === 0) return { firstName: "", lastName: "" };
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ");
  return { firstName, lastName };
}

function toAppUser(raw: Record<string, unknown>): User {
  const email = String(raw.email ?? "");
  const fullName =
    (isUsableName(raw.fullName) ? raw.fullName.trim() : "") ||
    (isUsableName(raw.name) ? raw.name.trim() : "") ||
    email;
  const fromSplit = splitName(fullName);
  const firstName =
    (isUsableName(raw.firstName) ? raw.firstName.trim() : "") || fromSplit.firstName;
  const lastName =
    (isUsableName(raw.lastName) ? raw.lastName.trim() : "") || fromSplit.lastName;

  return {
    id: String(raw.id ?? raw.sub ?? ""),
    email,
    firstName,
    lastName,
    fullName:
      (isUsableName(fullName) ? fullName : "") ||
      [firstName, lastName].filter((part) => isUsableName(part)).join(" ") ||
      email,
    avatarUrl: (raw.avatarUrl as string | null | undefined) ?? null,
    phone: (raw.phone as string | null | undefined) ?? null,
    jobTitle: (raw.jobTitle as string | null | undefined) ?? null,
    role: Boolean(raw.isPlatformAdmin)
      ? "SUPER_ADMIN"
      : ((raw.role as Role) ?? "CLIENT_VIEWER"),
    status: "ACTIVE",
    organizationId: String(raw.organizationId ?? ""),
    isPlatformAdmin: Boolean(raw.isPlatformAdmin),
    lastLoginAt: null,
    mfaEnabled: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export async function getSession(): Promise<Session | null> {
  const session = await getServerSession(authOptions);

  if (!session?.user) return null;

  const user = toAppUser(session.user as unknown as Record<string, unknown>);
  const permissions = ROLE_PERMISSIONS[user.role] ?? [];

  return {
    user,
    permissions: permissions as Permission[],
    expiresAt:
      session.expires ?? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession();
  return session?.user ?? null;
}

export async function getCurrentPermissions(): Promise<Permission[]> {
  const session = await getSession();
  return session?.permissions ?? [];
}

export async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session) throw new Error("UNAUTHORIZED");
  return session;
}

export async function requirePermission(
  permission: Permission | Permission[],
): Promise<Session> {
  const session = await requireSession();
  const targets = Array.isArray(permission) ? permission : [permission];
  const allowed = targets.some((p) => session.permissions.includes(p));
  if (!allowed) throw new Error("FORBIDDEN");
  return session;
}

export function isStaffSession(session: Session | null): boolean {
  if (!session) return false;
  const role = session.user.role;
  if (!role) return false;
  return !role.startsWith("CLIENT_");
}
