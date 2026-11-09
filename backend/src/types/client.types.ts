import type { ID, ISODateString, Money, Trend } from "./common.types.js";

/**
 * Client (agency customer) domain types.
 */

export type ClientStatus =
  | "ACTIVE"
  | "PAUSED"
  | "CHURNED"
  | "PROSPECT"
  | "ARCHIVED";

export type ClientTier = "STANDARD" | "PREMIUM" | "ENTERPRISE";

export type HealthLevel = "CRITICAL" | "AT_RISK" | "STABLE" | "HEALTHY" | "EXCELLENT";

export type Client = {
  id: ID;
  organizationId: ID;
  name: string;
  slug: string;
  legalName: string | null;
  industry: string;
  website: string | null;
  logoUrl: string | null;
  status: ClientStatus;
  tier: ClientTier;
  lifecycleStage: string;
  healthLevel: HealthLevel;
  healthScore: number;
  primaryContactId: ID | null;
  accountManagerId: ID | null;
  strategistId: ID | null;
  retainerAmount: Money | null;
  retainerCurrency: Money["currency"];
  contractStartDate: ISODateString | null;
  contractEndDate: ISODateString | null;
  onboardingCompletedAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ClientContact = {
  id: ID;
  clientId: ID;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string | null;
  jobTitle: string | null;
  avatarUrl: string | null;
  isPrimary: boolean;
  receivesReports: boolean;
  receivesInvoices: boolean;
  createdAt: ISODateString;
};

export type ClientHealthScore = {
  clientId: ID;
  overall: number;
  level: HealthLevel;
  dimensions: {
    acquisition: number;
    conversion: number;
    retention: number;
    brand: number;
    digital: number;
    operations: number;
    analytics: number;
  };
  calculatedAt: ISODateString;
  trend: Trend;
};

export type ClientListItem = Pick<
  Client,
  | "id"
  | "name"
  | "slug"
  | "logoUrl"
  | "industry"
  | "status"
  | "tier"
  | "healthLevel"
  | "healthScore"
  | "lifecycleStage"
> & {
  accountManagerName: string | null;
  openProjectsCount: number;
  overdueTasksCount: number;
  pendingApprovalsCount: number;
};

export type CreateClientPayload = {
  name: string;
  industry?: string;
  website?: string | null;
  tier?: ClientTier;
  accountManagerId?: ID | null;
};

export type UpdateClientPayload = Partial<CreateClientPayload> & {
  status?: ClientStatus;
  legalName?: string | null;
  logoUrl?: string | null;
};
