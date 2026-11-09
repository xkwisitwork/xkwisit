import type { ISODateString, ID } from "./common";
import type { Role } from "@/lib/constants/roles";
import type { Permission } from "@/lib/constants/permissions";

/**
 * Authentication & authorization types.
 */

export type UserStatus = "ACTIVE" | "INVITED" | "SUSPENDED" | "DEACTIVATED";

export type User = {
  id: ID;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl: string | null;
  phone: string | null;
  jobTitle: string | null;
  role: Role;
  /** App RBAC roles stored on the user document. */
  roles?: Role[];
  /** Org membership role: OWNER | ADMIN | MEMBER | VIEWER */
  membershipRole?: string | null;
  status: UserStatus;
  organizationId: ID;
  isPlatformAdmin?: boolean;
  lastLoginAt: ISODateString | null;
  mfaEnabled: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type Session = {
  user: User;
  permissions: Permission[];
  expiresAt: ISODateString;
};

export type LoginCredentials = {
  email: string;
  password: string;
  remember?: boolean;
};

export type RegisterPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
  inviteToken?: string;
};

export type PasswordResetRequest = {
  email: string;
};

export type PasswordResetPayload = {
  token: string;
  password: string;
  confirmPassword: string;
};

export type MfaSetupResult = {
  secret: string;
  qrCodeUrl: string;
  recoveryCodes: string[];
};

export type MfaVerifyPayload = {
  code: string;
};

export type AuthProvider = "credentials" | "google" | "microsoft";
