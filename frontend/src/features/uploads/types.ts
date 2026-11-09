import type { ID, ISODateString } from "@/types/common";

/**
 * Uploads feature types.
 */

export type UploadsStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Uploads = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: UploadsStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type UploadsListItem = Pick<
  Uploads,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type UploadsFilterState = {
  search: string;
  statuses: UploadsStatus[];
  clientId: string | null;
};

export const emptyUploadsFilters: UploadsFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateUploadsPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: UploadsStatus;
};

export type UpdateUploadsPayload = Partial<CreateUploadsPayload>;

export type UploadsStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
