import type { ID, ISODateString } from "@/types/common";

/**
 * Files feature types.
 */

export type FilesStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Files = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: FilesStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type FilesListItem = Pick<
  Files,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type FilesFilterState = {
  search: string;
  statuses: FilesStatus[];
  clientId: string | null;
};

export const emptyFilesFilters: FilesFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateFilesPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: FilesStatus;
};

export type UpdateFilesPayload = Partial<CreateFilesPayload>;

export type FilesStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
