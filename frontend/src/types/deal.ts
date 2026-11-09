import type { ID, ISODateString } from "./common";

/**
 * Deal domain types.
 */

export type DealStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | "CANCELLED";

export type Deal = {
  id: ID;
  organizationId: ID;
  name: string;
  status: DealStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type DealListItem = Pick<
  Deal,
  "id" | "name" | "status" | "createdAt" | "updatedAt"
>;

export type DealFilterState = {
  search: string;
  statuses: DealStatus[];
};

export const emptyDealFilters: DealFilterState = {
  search: "",
  statuses: [],
};

export type CreateDealPayload = {
  name: string;
  description?: string | null;
  status?: DealStatus;
  metadata?: Record<string, unknown>;
};

export type UpdateDealPayload = Partial<CreateDealPayload>;
