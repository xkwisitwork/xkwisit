import type { ID, ISODateString } from "@/types/common";

/**
 * Billing feature types.
 */

export type BillingStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Billing = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: BillingStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type BillingListItem = Pick<
  Billing,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type BillingFilterState = {
  search: string;
  statuses: BillingStatus[];
  clientId: string | null;
};

export const emptyBillingFilters: BillingFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateBillingPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: BillingStatus;
};

export type UpdateBillingPayload = Partial<CreateBillingPayload>;

export type BillingStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
