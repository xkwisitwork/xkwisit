import type { ID, ISODateString } from "@/types/common";

/**
 * Onboarding feature types.
 */

export type OnboardingStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Onboarding = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: OnboardingStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type OnboardingListItem = Pick<
  Onboarding,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type OnboardingFilterState = {
  search: string;
  statuses: OnboardingStatus[];
  clientId: string | null;
};

export const emptyOnboardingFilters: OnboardingFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateOnboardingPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: OnboardingStatus;
};

export type UpdateOnboardingPayload = Partial<CreateOnboardingPayload>;

export type OnboardingStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
