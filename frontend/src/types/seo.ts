import type { ID, ISODateString } from "./common";

/**
 * Seo domain types.
 */

export type SeoStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | "CANCELLED";

export type Seo = {
  id: ID;
  organizationId: ID;
  name: string;
  status: SeoStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type SeoListItem = Pick<Seo, "id" | "name" | "status" | "createdAt" | "updatedAt">;

export type SeoFilterState = {
  search: string;
  statuses: SeoStatus[];
};

export const emptySeoFilters: SeoFilterState = {
  search: "",
  statuses: [],
};

export type CreateSeoPayload = {
  name: string;
  description?: string | null;
  status?: SeoStatus;
  metadata?: Record<string, unknown>;
};

export type UpdateSeoPayload = Partial<CreateSeoPayload>;
