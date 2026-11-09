import type { ID, ISODateString } from "./common.types.js";
import type { PublicUser, UserStatus } from "./auth.types.js";

/**
 * User domain types beyond the auth session DTO.
 */

export type UserProfile = {
  userId: ID;
  bio: string | null;
  timezone: string;
  locale: string;
  avatarColor: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
};

export type UserInvite = {
  id: ID;
  email: string;
  role: string;
  organizationId: ID;
  invitedById: ID;
  token: string;
  expiresAt: ISODateString;
  acceptedAt: ISODateString | null;
  createdAt: ISODateString;
};

export type UserActivity = {
  id: ID;
  userId: ID;
  action: string;
  resourceType: string;
  resourceId: string | null;
  metadata: Record<string, unknown>;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: ISODateString;
};

export type PlatformUserListItem = {
  id: ID;
  email: string;
  name: string;
  isPlatformAdmin: boolean;
  roles: string[];
  membershipRole: string | null;
  organizationId: ID | null;
  organizationName: string | null;
  createdAt: ISODateString | null;
};

export type TeamMember = {
  id: ID;
  user: Pick<
    PublicUser,
    "id" | "fullName" | "email" | "avatarUrl" | "role" | "jobTitle"
  >;
  capacityHours: number;
  allocatedHours: number;
  utilization: number;
  activeProjectsCount: number;
  openTasksCount: number;
  status: "AVAILABLE" | "BUSY" | "OVERLOADED" | "OFF";
};

export type { UserStatus };
