import type { ID, ISODateString } from "@/types/common";

/**
 * Churn feature types.
 */

export type ChurnStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Churn = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: ChurnStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type ChurnListItem = Pick<
  Churn,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type ChurnFilterState = {
  search: string;
  statuses: ChurnStatus[];
  clientId: string | null;
};

export const emptyChurnFilters: ChurnFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateChurnPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: ChurnStatus;
};

export type UpdateChurnPayload = Partial<CreateChurnPayload>;

export type ChurnStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
