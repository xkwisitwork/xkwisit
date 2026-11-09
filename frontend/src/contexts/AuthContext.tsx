"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useSession, signOut as nextAuthSignOut } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

import type { Session, User } from "@/types/auth";
import type { Permission } from "@/lib/constants/permissions";
import { isStaffRole, isClientRole, type Role } from "@/lib/constants/roles";
import { endpoints } from "@/lib/api/endpoints";
import { apiClient } from "@/lib/api/client";
import { mapNextAuthToAppSession } from "@/lib/auth/mapSession";

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  permissions: Permission[];
  isAuthenticated: boolean;
  isLoading: boolean;
  isStaff: boolean;
  isClient: boolean;

  hasRole: (role: Role | Role[]) => boolean;
  hasPermission: (permission: Permission | Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;

  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthContextProvider({
  children,
  initialSession = null,
}: {
  children: ReactNode;
  initialSession?: Session | null;
}) {
  const { data: nextSession, status, update } = useSession();
  const queryClient = useQueryClient();

  // Live NextAuth session is the source of truth. SSR initialSession only
  // bridges the first paint while the client session is still loading.
  const session = useMemo<Session | null>(() => {
    if (status === "authenticated") {
      return mapNextAuthToAppSession(nextSession);
    }
    if (status === "loading") {
      return initialSession;
    }
    return null;
  }, [status, nextSession, initialSession]);

  const user = session?.user ?? null;
  const permissions = useMemo<Permission[]>(() => session?.permissions ?? [], [session]);

  const isStaff = user ? isStaffRole(user.role) : false;
  const isClient = user ? isClientRole(user.role) : false;

  const hasRole = useCallback(
    (role: Role | Role[]): boolean => {
      if (!user) return false;
      const targets = Array.isArray(role) ? role : [role];
      return targets.includes(user.role);
    },
    [user],
  );

  const hasPermission = useCallback(
    (permission: Permission | Permission[]): boolean => {
      const targets = Array.isArray(permission) ? permission : [permission];
      return targets.some((p) => permissions.includes(p));
    },
    [permissions],
  );

  const hasAllPermissions = useCallback(
    (required: Permission[]): boolean => required.every((p) => permissions.includes(p)),
    [permissions],
  );

  const refresh = useCallback(async () => {
    await update();
  }, [update]);

  const signOut = useCallback(async () => {
    queryClient.clear();
    // Fire-and-forget backend cookie clear - never block UI logout on API.
    void apiClient(endpoints.auth.logout, { method: "POST" }).catch(() => {});
    await nextAuthSignOut({ redirect: false });
    // Hard navigation so middleware sees a cleared session cookie.
    // loggedOut=1 tells the login form to block stale password-manager autofill.
    window.location.assign("/login?loggedOut=1");
  }, [queryClient]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      permissions,
      isAuthenticated: Boolean(user),
      isLoading: status === "loading",
      isStaff,
      isClient,
      hasRole,
      hasPermission,
      hasAllPermissions,
      refresh,
      signOut,
    }),
    [
      user,
      session,
      permissions,
      status,
      isStaff,
      isClient,
      hasRole,
      hasPermission,
      hasAllPermissions,
      refresh,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
}
