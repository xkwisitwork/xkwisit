import type { ID, ISODateString } from "./common";

/**
 * Brand domain types.
 */

export type BrandStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | "CANCELLED";

export type Brand = {
  id: ID;
  organizationId: ID;
  name: string;
  status: BrandStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type BrandListItem = Pick<
  Brand,
  "id" | "name" | "status" | "createdAt" | "updatedAt"
>;

export type BrandFilterState = {
  search: string;
  statuses: BrandStatus[];
};

export const emptyBrandFilters: BrandFilterState = {
  search: "",
  statuses: [],
};

export type CreateBrandPayload = {
  name: string;
  description?: string | null;
  status?: BrandStatus;
  metadata?: Record<string, unknown>;
};

export type UpdateBrandPayload = Partial<CreateBrandPayload>;
