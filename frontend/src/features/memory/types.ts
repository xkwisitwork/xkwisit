import type { ID, ISODateString } from "@/types/common";

/**
 * Memory feature types.
 */

export type MemoryStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Memory = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: MemoryStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type MemoryListItem = Pick<
  Memory,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type MemoryFilterState = {
  search: string;
  statuses: MemoryStatus[];
  clientId: string | null;
};

export const emptyMemoryFilters: MemoryFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateMemoryPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: MemoryStatus;
};

export type UpdateMemoryPayload = Partial<CreateMemoryPayload>;

export type MemoryStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
