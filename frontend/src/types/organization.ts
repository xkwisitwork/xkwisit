import type { ISODateString, ID } from "./common";

/**
 * Organization (tenant) types.
 * Every record in the platform belongs to exactly one organization.
 */

export type OrganizationPlan = "STARTER" | "GROWTH" | "SCALE" | "ENTERPRISE";

export type OrganizationStatus = "ACTIVE" | "TRIAL" | "SUSPENDED" | "CANCELLED";

export type Organization = {
  id: ID;
  name: string;
  slug: string;
  legalName: string | null;
  industry: string | null;
  website: string | null;
  logoUrl: string | null;
  brandColor: string;
  plan: OrganizationPlan;
  status: OrganizationStatus;
  ownerId: ID;
  settings: OrganizationSettings;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type OrganizationSettings = {
  timezone: string;
  locale: string;
  currency: "NGN" | "USD" | "GBP" | "EUR";
  fiscalYearStartMonth: number;
  weekStartsOn: 0 | 1 | 6;
  workingDays: number[];
  defaultLeadOwnerId: ID | null;
  defaultProjectTemplateId: ID | null;
  billingEmail: string | null;
};

export type OrganizationBilling = {
  organizationId: ID;
  plan: OrganizationPlan;
  status: OrganizationStatus;
  currentPeriodStart: ISODateString;
  currentPeriodEnd: ISODateString;
  seatsIncluded: number;
  seatsUsed: number;
  monthlyAmount: number;
  currency: "NGN" | "USD" | "GBP" | "EUR";
  nextInvoiceAt: ISODateString | null;
};

export type OrganizationIntegration = {
  id: ID;
  organizationId: ID;
  provider: string;
  status: "CONNECTED" | "DISCONNECTED" | "ERROR" | "PENDING";
  accountName: string | null;
  accountEmail: string | null;
  lastSyncedAt: ISODateString | null;
  errorMessage: string | null;
  createdAt: ISODateString;
};

export type OrganizationUsage = {
  organizationId: ID;
  activeClients: number;
  activeProjects: number;
  activeUsers: number;
  storageUsedBytes: number;
  storageLimitBytes: number;
  apiCallsThisMonth: number;
  apiCallLimit: number;
};

export type AuditLog = {
  id: ID;
  organizationId: ID;
  actorId: ID;
  actorName: string;
  actorEmail: string;
  action: string;
  resourceType: string;
  resourceId: string | null;
  resourceLabel: string | null;
  changes: Record<string, { from: unknown; to: unknown }>;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: ISODateString;
};
