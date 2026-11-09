import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { endpoints } from "@/lib/api/endpoints";
import { ROLE_PERMISSIONS } from "@/lib/constants/permissions";
import { ROLES, type Role } from "@/lib/constants/roles";
import type { User } from "@/types/auth";

/**
 * NextAuth configuration.
 * Credentials provider proxies login to the backend API, then JWT/session
 * callbacks attach role (and derived permissions) for server-side access.
 * Access tokens expire (~15m); we refresh them via the backend refresh token
 * so Super Admin / agency API calls do not suddenly 401 while the NextAuth
 * session is still valid.
 */

type AuthTokenUser = User & {
  accessToken?: string;
  refreshToken?: string;
};

function usable(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (/^undefined(\s+undefined)*$/i.test(trimmed)) return undefined;
  if (/^null(\s+null)*$/i.test(trimmed)) return undefined;
  return trimmed;
}

/** Read `exp` from a JWT without verifying (expiry gate only). */
function readJwtExp(token: string | undefined): number | null {
  if (!token) return null;
  try {
    const part = token.split(".")[1];
    if (!part) return null;
    const normalized = part.replace(/-/g, "+").replace(/_/g, "/");
    const json = JSON.parse(
      Buffer.from(normalized, "base64").toString("utf8"),
    ) as { exp?: number };
    return typeof json.exp === "number" ? json.exp : null;
  } catch {
    return null;
  }
}

function accessTokenNeedsRefresh(accessToken: string | undefined, expiresAt?: number) {
  if (!accessToken) return true;
  const exp = expiresAt ?? readJwtExp(accessToken);
  if (!exp) return false;
  // Refresh 60s before expiry.
  return Date.now() >= exp * 1000 - 60_000;
}

async function refreshBackendTokens(refreshToken: string): Promise<{
  accessToken: string;
  refreshToken?: string;
  user?: AuthTokenUser;
} | null> {
  const baseUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return null;

  try {
    const response = await fetch(`${baseUrl}${endpoints.auth.refresh}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!response.ok) return null;

    const payload = (await response.json()) as {
      data?: {
        user?: AuthTokenUser;
        accessToken?: string;
        refreshToken?: string;
      };
      accessToken?: string;
      refreshToken?: string;
      user?: AuthTokenUser;
    };

    const accessToken = payload.data?.accessToken ?? payload.accessToken;
    if (!accessToken) return null;

    return {
      accessToken,
      refreshToken: payload.data?.refreshToken ?? payload.refreshToken,
      user: payload.data?.user ?? payload.user,
    };
  } catch {
    return null;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
    error: "/login",
    verifyRequest: "/verify-email",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const baseUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

        if (!baseUrl) {
          console.error("API_URL is not configured");
          return null;
        }

        const response = await fetch(`${baseUrl}${endpoints.auth.login}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!response.ok) return null;

        const payload = (await response.json()) as {
          data?: {
            user: AuthTokenUser;
            accessToken: string;
            refreshToken?: string;
          };
          user?: AuthTokenUser;
          accessToken?: string;
          refreshToken?: string;
        };

        const user = payload.data?.user ?? payload.user;
        const accessToken = payload.data?.accessToken ?? payload.accessToken;
        const refreshToken = payload.data?.refreshToken ?? payload.refreshToken;

        if (!user) return null;

        const isPlatformAdmin = Boolean(user.isPlatformAdmin);
        // Never trust a client-supplied role elevation — map from backend only.
        const role: Role = isPlatformAdmin
          ? ROLES.SUPER_ADMIN
          : ((user.role as Role | undefined) ?? ROLES.CLIENT_VIEWER);

        if (!accessToken) {
          console.error("Login succeeded but accessToken was missing");
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          image: user.avatarUrl,
          role,
          organizationId: user.organizationId,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          isPlatformAdmin,
          accessToken,
          refreshToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const authUser = user as {
          id: string;
          email?: string | null;
          role?: Role;
          organizationId?: string;
          accessToken?: string;
          refreshToken?: string;
          isPlatformAdmin?: boolean;
          firstName?: string;
          lastName?: string;
          fullName?: string;
          name?: string | null;
          image?: string | null;
        };

        const isPlatformAdmin = Boolean(authUser.isPlatformAdmin);
        const role: Role = isPlatformAdmin
          ? ROLES.SUPER_ADMIN
          : (authUser.role ?? ROLES.CLIENT_VIEWER);
        const fullName =
          usable(authUser.fullName) ?? usable(authUser.name) ?? undefined;

        // Full replace on login — never merge leftover claims from a prior user.
        token.sub = authUser.id;
        token.id = authUser.id;
        token.email = usable(authUser.email);
        token.name = fullName;
        token.picture = usable(authUser.image) ?? undefined;
        token.role = role;
        token.organizationId = authUser.organizationId;
        token.accessToken = authUser.accessToken;
        token.refreshToken = authUser.refreshToken;
        token.accessTokenExpires = readJwtExp(authUser.accessToken) ?? undefined;
        token.isPlatformAdmin = isPlatformAdmin;
        token.firstName = usable(authUser.firstName);
        token.lastName = usable(authUser.lastName);
        token.fullName = fullName;
        token.permissions = ROLE_PERMISSIONS[role] ?? [];
        return token;
      }

      // Client called `update({ image })` after an UploadThing avatar save.
      if (trigger === "update" && session && typeof session === "object") {
        const patch = session as { image?: string | null };
        if (typeof patch.image === "string" && patch.image.trim()) {
          token.picture = patch.image.trim();
        } else if (patch.image === null) {
          token.picture = undefined;
        }
      }

      // Keep backend API auth alive for the duration of the NextAuth session.
      if (
        token.refreshToken &&
        accessTokenNeedsRefresh(
          token.accessToken as string | undefined,
          token.accessTokenExpires as number | undefined,
        )
      ) {
        const refreshed = await refreshBackendTokens(String(token.refreshToken));
        if (refreshed?.accessToken) {
          token.accessToken = refreshed.accessToken;
          token.accessTokenExpires = readJwtExp(refreshed.accessToken) ?? undefined;
          if (refreshed.refreshToken) {
            token.refreshToken = refreshed.refreshToken;
          }
          if (refreshed.user) {
            token.isPlatformAdmin = Boolean(refreshed.user.isPlatformAdmin);
            if (refreshed.user.isPlatformAdmin) {
              token.role = ROLES.SUPER_ADMIN;
              token.permissions = ROLE_PERMISSIONS[ROLES.SUPER_ADMIN] ?? [];
            }
            if (refreshed.user.avatarUrl) {
              token.picture = refreshed.user.avatarUrl;
            }
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      const isPlatformAdmin = Boolean(token.isPlatformAdmin);
      const role: Role = isPlatformAdmin
        ? ROLES.SUPER_ADMIN
        : ((token.role as Role | undefined) ?? ROLES.CLIENT_VIEWER);

      const fromParts = [token.firstName, token.lastName]
        .map(usable)
        .filter(Boolean)
        .join(" ");
      const fullName =
        usable(token.fullName) ||
        usable(token.name) ||
        fromParts ||
        usable(token.email) ||
        "";

      // Replace the user object entirely — spreading session.user can keep
      // the previous account's email/name after a soft account switch.
      session.user = {
        id: (token.id as string) ?? token.sub ?? "",
        email: usable(token.email) || "",
        name: fullName,
        image: typeof token.picture === "string" ? token.picture : null,
        role,
        organizationId: (token.organizationId as string | undefined) ?? undefined,
        isPlatformAdmin,
        firstName: usable(token.firstName) || fullName.split(/\s+/)[0] || "",
        lastName:
          usable(token.lastName) || fullName.split(/\s+/).slice(1).join(" ") || "",
        fullName,
      };

      session.accessToken = token.accessToken as string | undefined;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
