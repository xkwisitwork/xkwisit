import type { BillingSnapshot } from "../config/entitlements.js";
import type { MembershipDocument } from "../models/Membership.js";
import type { OrganizationDocument } from "../models/Organization.js";
import type { UserDocument, UserRole } from "../models/User.js";
import type { ID, ISODateString } from "./common.types.js";

/**
 * Auth / session DTOs returned by `/auth/*` and embedded in JWTs.
 */

export type UserStatus = "ACTIVE" | "INVITED" | "SUSPENDED" | "DEACTIVATED";

export type MembershipRoleName = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";

export type PublicUser = {
  id: ID;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl: string | null;
  phone: string | null;
  jobTitle: string | null;
  /** Primary app RBAC role (first entry of `roles`). */
  role: string;
  /** All app RBAC roles on this account. */
  roles: string[];
  /** Org membership role: OWNER | ADMIN | MEMBER | VIEWER */
  membershipRole: string | null;
  status: UserStatus;
  organizationId: ID;
  isPlatformAdmin: boolean;
  lastLoginAt: ISODateString | null;
  mfaEnabled: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type AuthSessionPayload = {
  user: PublicUser;
  accessToken: string;
  refreshToken: string;
  organization?: {
    id: ID;
    name: string;
    slug: string;
  };
  billing?: BillingSnapshot;
};

export type AuthContext = {
  user: UserDocument;
  organization: OrganizationDocument;
  membership: MembershipDocument;
};

export type AccessTokenPayload = {
  sub: string;
  email: string;
  orgId?: string;
  role?: string;
  isPlatformAdmin?: boolean;
};

export type AuthRequestUser = {
  id: string;
  email: string;
  orgId?: string;
  role?: string;
  isPlatformAdmin?: boolean;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
  phone?: string;
};

export type PasswordResetRequest = {
  email: string;
};

export type PasswordResetPayload = {
  token: string;
  password: string;
  confirmPassword: string;
};

export type { UserRole };
