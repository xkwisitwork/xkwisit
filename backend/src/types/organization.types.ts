import type { BillingSnapshot } from "../config/entitlements.js";
import type { OrgPlan, OrgStatus } from "../models/Organization.js";
import type { MembershipRole } from "../models/Membership.js";
import type { ID, ISODateString } from "./common.types.js";

/**
 * Organization (tenant / workspace) API types.
 */

export type OrganizationPublic = {
  id: ID;
  name: string;
  slug: string;
  ownerId: ID;
  plan: OrgPlan;
  status: OrgStatus;
  trialStartsAt: ISODateString | null;
  trialEndsAt: ISODateString | null;
  seatsIncluded: number;
  billing: BillingSnapshot;
  createdAt: ISODateString | null;
  updatedAt: ISODateString | null;
};

export type OrganizationMember = {
  id: ID;
  role: MembershipRole | string;
  userId: ID;
  email: string | null;
  name: string | null;
  joinedAt: ISODateString | null;
};

export type WorkspaceListItem = OrganizationPublic & {
  ownerEmail: string | null;
  ownerName: string | null;
  memberCount: number;
  ownerIsPlatformAdmin?: boolean;
};

export type OrganizationSettings = {
  timezone: string;
  locale: string;
  currency: "NGN" | "USD" | "GBP" | "EUR";
  fiscalYearStartMonth: number;
  weekStartsOn: 0 | 1 | 6;
  workingDays: number[];
  billingEmail: string | null;
};

export type { OrgPlan, OrgStatus, MembershipRole };
