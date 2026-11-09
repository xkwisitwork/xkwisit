import { redirect } from "next/navigation";

import type { Permission } from "@/lib/constants/permissions";
import type { Session } from "@/types/auth";
import { ROUTES } from "@/config/site";

import { getSession, isStaffSession } from "./session";
import { sessionHasPermission } from "./permissions";

/**
 * Route guards for server components and server actions.
 * Each guard fetches the session, then either returns it or redirects.
 */

/**
 * Requires an authenticated session, else redirects to /login.
 */
export async function guardAuthenticated(next?: string): Promise<Session> {
  const session = await getSession();

  if (!session) {
    const target = next
      ? `${ROUTES.login}?next=${encodeURIComponent(next)}`
      : ROUTES.login;

    redirect(target);
  }

  return session;
}

/**
 * Requires a staff session. Redirects clients back to their portal.
 */
export async function guardStaff(next?: string): Promise<Session> {
  const session = await guardAuthenticated(next);

  if (!isStaffSession(session)) {
    redirect(ROUTES.portalHome);
  }

  return session;
}

/**
 * Requires a client-portal session. Redirects staff back to the dashboard.
 */
export async function guardClient(next?: string): Promise<Session> {
  const session = await guardAuthenticated(next);

  if (isStaffSession(session)) {
    redirect(ROUTES.dashboard);
  }

  return session;
}

/**
 * Requires a specific permission. Redirects to /dashboard when missing.
 */
export async function guardPermission(
  permission: Permission | Permission[],
  next?: string,
): Promise<Session> {
  const session = await guardAuthenticated(next);

  if (!sessionHasPermission(session, permission)) {
    redirect(ROUTES.dashboard);
  }

  return session;
}

/**
 * Requires a staff session AND a specific permission.
 */
export async function guardStaffPermission(
  permission: Permission | Permission[],
  next?: string,
): Promise<Session> {
  const session = await guardStaff(next);

  if (!sessionHasPermission(session, permission)) {
    redirect(ROUTES.dashboard);
  }

  return session;
}
