import type { Permission } from "@/lib/constants/permissions";
import { ROLE_PERMISSIONS } from "@/lib/constants/permissions";
import type { Role } from "@/lib/constants/roles";
import type { Session } from "@/types/auth";

/**
 * Permission helpers usable from both client and server.
 * Never trust client-side permission checks for security -
 * these exist to gate UI, not to authorise access.
 */

/**
 * Returns true if a session holds the given permission.
 */
export function sessionHasPermission(
  session: Session | null,
  permission: Permission | Permission[],
): boolean {
  if (!session) return false;

  const targets = Array.isArray(permission) ? permission : [permission];

  return targets.some((p) => session.permissions.includes(p));
}

/**
 * Returns true if a session holds ALL given permissions.
 */
export function sessionHasAllPermissions(
  session: Session | null,
  permissions: Permission[],
): boolean {
  if (!session) return false;

  return permissions.every((p) => session.permissions.includes(p));
}

/**
 * Returns true if a role would have the given permission.
 * Useful in UI code that knows the role but not the session.
 */
export function roleHasPermission(
  role: Role | null | undefined,
  permission: Permission | Permission[],
): boolean {
  if (!role) return false;

  const granted = ROLE_PERMISSIONS[role] ?? [];
  const targets = Array.isArray(permission) ? permission : [permission];

  return targets.some((p) => granted.includes(p));
}

/**
 * Returns true if the role is a staff role.
 */
export function isStaffRole(role: Role | null | undefined): boolean {
  if (!role) return false;

  return !role.startsWith("CLIENT_");
}

/**
 * Returns true if the role is a client-portal role.
 */
export function isClientRole(role: Role | null | undefined): boolean {
  if (!role) return false;

  return role.startsWith("CLIENT_");
}

/**
 * Filters a list of items based on a per-item required permission.
 * Useful for conditional nav rendering.
 */
export function filterByPermission<T>(
  items: T[],
  session: Session | null,
  getPermission: (item: T) => Permission | undefined,
): T[] {
  return items.filter((item) => {
    const permission = getPermission(item);

    if (!permission) return true;

    return sessionHasPermission(session, permission);
  });
}
