import type { ID, ISODateString } from "@/types/common";

/**
 * Lifecycle feature types.
 */

export type LifecycleStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Lifecycle = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: LifecycleStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type LifecycleListItem = Pick<
  Lifecycle,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type LifecycleFilterState = {
  search: string;
  statuses: LifecycleStatus[];
  clientId: string | null;
};

export const emptyLifecycleFilters: LifecycleFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateLifecyclePayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: LifecycleStatus;
};

export type UpdateLifecyclePayload = Partial<CreateLifecyclePayload>;

export type LifecycleStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
