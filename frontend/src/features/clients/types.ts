import type { ID, ISODateString, Money } from "@/types/common";
import type { Industry } from "@/lib/constants/industries";
import type { LifecycleStageId } from "@/lib/constants/funnel-stages";
import type { HealthLevel } from "@/lib/constants/statuses";

/* ─── Enums ──────────────────────────────────────────── */

export type ClientStatus = "ACTIVE" | "PAUSED" | "CHURNED" | "PROSPECT" | "ARCHIVED";
export type ClientTier = "STANDARD" | "PREMIUM" | "ENTERPRISE";

/* ─── Core ───────────────────────────────────────────── */

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
  accountManagerName: string | null;
  strategistId: ID | null;
  strategistName: string | null;
  retainerAmount: Money | null;
  contractStartDate: ISODateString | null;
  contractEndDate: ISODateString | null;
  onboardingCompletedAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

/* ─── Business info ──────────────────────────────────── */

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

/* ─── Contacts ───────────────────────────────────────── */

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

/* ─── Health score ───────────────────────────────────── */

export type ClientHealthDimensions = {
  acquisition: number;
  conversion: number;
  retention: number;
  brand: number;
  digital: number;
  operations: number;
  analytics: number;
};

export type ClientHealthScore = {
  clientId: ID;
  overall: number;
  level: HealthLevel;
  dimensions: ClientHealthDimensions;
  trend: "up" | "down" | "flat";
  calculatedAt: ISODateString;
};

/* ─── Access tracking ────────────────────────────────── */

export type ClientAccessStatus = "PENDING" | "GRANTED" | "REVOKED" | "ERROR";

export type ClientAccess = {
  id: ID;
  clientId: ID;
  provider: string;
  label: string;
  status: ClientAccessStatus;
  grantedToUserId: ID | null;
  grantedToUserName: string | null;
  accountIdentifier: string | null;
  notes: string | null;
  grantedAt: ISODateString | null;
  revokedAt: ISODateString | null;
};

/* ─── List item ──────────────────────────────────────── */

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
  | "accountManagerName"
> & {
  openProjectsCount: number;
  overdueTasksCount: number;
  pendingApprovalsCount: number;
};

/* ─── Filters ────────────────────────────────────────── */

export type ClientFilterState = {
  search: string;
  statuses: ClientStatus[];
  tiers: ClientTier[];
  industries: string[];
  healthLevels: HealthLevel[];
  accountManagerId: string | null;
};

export const emptyClientFilters: ClientFilterState = {
  search: "",
  statuses: [],
  tiers: [],
  industries: [],
  healthLevels: [],
  accountManagerId: null,
};

/* ─── Payloads ───────────────────────────────────────── */

export type CreateClientPayload = {
  name: string;
  legalName?: string;
  industry: string;
  website?: string;
  tier: ClientTier;
  lifecycleStage?: LifecycleStageId;
  accountManagerId?: string;
  strategistId?: string;
  retainerAmount?: Money;
  contractStartDate?: string;
  contractEndDate?: string;
  notes?: string;
};

export type UpdateClientPayload = Partial<CreateClientPayload> & {
  status?: ClientStatus;
};

/* ─── Stats ──────────────────────────────────────────── */

export type ClientStats = {
  total: number;
  active: number;
  atRisk: number;
  churnedThisQuarter: number;
  totalRetainerValue: Money;
  averageHealthScore: number;
};
