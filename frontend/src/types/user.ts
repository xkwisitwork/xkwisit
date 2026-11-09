import type { ISODateString, ID } from "./common";
import type { Role } from "@/lib/constants/roles";

/**
 * User-related types beyond authentication.
 * `User` itself is defined in `@/types/auth`.
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
  notificationPreferences: UserNotificationPreferences;
};

export type UserNotificationPreferences = {
  email: boolean;
  push: boolean;
  inApp: boolean;
  digestFrequency: "daily" | "weekly" | "never";
  channels: {
    leads: boolean;
    approvals: boolean;
    mentions: boolean;
    projectUpdates: boolean;
    reports: boolean;
    invoices: boolean;
    system: boolean;
  };
};

export type UserInvite = {
  id: ID;
  email: string;
  role: Role;
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

export type TeamMember = {
  id: ID;
  user: {
    id: ID;
    fullName: string;
    email: string;
    avatarUrl: string | null;
    role: Role;
    jobTitle: string | null;
  };
  capacityHours: number;
  allocatedHours: number;
  utilization: number;
  activeProjectsCount: number;
  openTasksCount: number;
  status: "AVAILABLE" | "BUSY" | "OVERLOADED" | "OFF";
};
