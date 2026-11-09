import type { DefaultSession } from "next-auth";

import type { Permission } from "@/lib/constants/permissions";
import type { Role } from "@/lib/constants/roles";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: DefaultSession["user"] & {
      id: string;
      role: Role;
      organizationId?: string;
      isPlatformAdmin?: boolean;
      firstName?: string;
      lastName?: string;
      fullName?: string;
    };
  }

  interface User {
    id: string;
    role?: Role;
    organizationId?: string;
    isPlatformAdmin?: boolean;
    accessToken?: string;
    refreshToken?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: Role;
    organizationId?: string;
    isPlatformAdmin?: boolean;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    permissions?: Permission[];
  }
}
