import type { ID, ISODateString } from "@/types/common";

/**
 * Audit feature types.
 */

export type AuditStatus = "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED";

export type Audit = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  name: string;
  status: AuditStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type AuditListItem = Pick<
  Audit,
  "id" | "name" | "status" | "clientId" | "createdAt" | "updatedAt"
>;

export type AuditFilterState = {
  search: string;
  statuses: AuditStatus[];
  clientId: string | null;
};

export const emptyAuditFilters: AuditFilterState = {
  search: "",
  statuses: [],
  clientId: null,
};

export type CreateAuditPayload = {
  name: string;
  clientId?: string | null;
  description?: string | null;
  status?: AuditStatus;
};

export type UpdateAuditPayload = Partial<CreateAuditPayload>;

export type AuditStats = {
  total: number;
  active: number;
  paused: number;
  completed: number;
};
