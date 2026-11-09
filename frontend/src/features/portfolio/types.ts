import type { ID, ISODateString } from "@/types/common";

/**
 * Portfolio feature types.
 */

export type PortfolioStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Portfolio = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: PortfolioStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type PortfolioListItem = Pick<
  Portfolio,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type PortfolioFilterState = {
  search: string;
  statuses: PortfolioStatus[];
  clientId: string | null;
};

export const emptyPortfolioFilters: PortfolioFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreatePortfolioPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: PortfolioStatus;
};

export type UpdatePortfolioPayload = Partial<CreatePortfolioPayload>;

export type PortfolioStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
