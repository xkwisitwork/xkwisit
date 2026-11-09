import type { ISODateString, ID, Money } from "./common";
import type { Industry } from "@/lib/constants/industries";
import type { LifecycleStageId } from "@/lib/constants/funnel-stages";
import type { HealthLevel } from "@/lib/constants/statuses";

/**
 * Client (customer of Xkwisit) types.
 */

export type ClientStatus = "ACTIVE" | "PAUSED" | "CHURNED" | "PROSPECT" | "ARCHIVED";

export type ClientTier = "STANDARD" | "PREMIUM" | "ENTERPRISE";

export type Client = {
  id: ID;
  organizationId: ID;
  name: string;
  slug: string;
  legalName: string | null;
  industry: Industry | string;
  website: string | null;
  logoUrl: string | null;
  status: ClientStatus;
  tier: ClientTier;
  lifecycleStage: LifecycleStageId;
  healthLevel: HealthLevel;
  healthScore: number;
  primaryContactId: ID | null;
  accountManagerId: ID | null;
  strategistId: ID | null;
  retainerAmount: Money | null;
  retainerCurrency: "NGN" | "USD" | "GBP" | "EUR";
  contractStartDate: ISODateString | null;
  contractEndDate: ISODateString | null;
  onboardingCompletedAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ClientBusinessInfo = {
  clientId: ID;
  description: string | null;
  foundedYear: number | null;
  employeeCount: number | null;
  revenueRange: string | null;
  targetMarket: string | null;
  valueProposition: string | null;
  productsServices: string[];
  competitors: ClientCompetitor[];
  locations: ClientLocation[];
};

export type ClientCompetitor = {
  name: string;
  website: string | null;
  notes: string | null;
  strengths: string[];
  weaknesses: string[];
};

export type ClientLocation = {
  label: string;
  address: string;
  city: string;
  state: string | null;
  country: string;
  isPrimary: boolean;
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

export type ClientAccess = {
  id: ID;
  clientId: ID;
  provider: string;
  label: string;
  status: "PENDING" | "GRANTED" | "REVOKED" | "ERROR";
  grantedToUserId: ID | null;
  accountIdentifier: string | null;
  notes: string | null;
  grantedAt: ISODateString | null;
  revokedAt: ISODateString | null;
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
  trend: "up" | "down" | "flat";
};

export type ClientAccessSummary = {
  clientId: ID;
  totalRequired: number;
  totalGranted: number;
  totalPending: number;
  totalRevoked: number;
  items: ClientAccess[];
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
