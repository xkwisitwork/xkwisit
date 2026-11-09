import type { ID, ISODateString } from "./common";

/**
 * Audit domain types.
 */

export type AuditStatus =
  "DRAFT" | "ACTIVE" | "PAUSED" | "COMPLETED" | "ARCHIVED" | "CANCELLED";

export type Audit = {
  id: ID;
  organizationId: ID;
  name: string;
  status: AuditStatus;
  description: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type AuditListItem = Pick<
  Audit,
  "id" | "name" | "status" | "createdAt" | "updatedAt"
>;

export type AuditFilterState = {
  search: string;
  statuses: AuditStatus[];
};

export const emptyAuditFilters: AuditFilterState = {
  search: "",
  statuses: [],
};

export type CreateAuditPayload = {
  name: string;
  description?: string | null;
  status?: AuditStatus;
  metadata?: Record<string, unknown>;
};

export type UpdateAuditPayload = Partial<CreateAuditPayload>;
