import type { ID, ISODateString, Money, Trend } from "./common.types.js";

export type AuditLogEntry = {
  id: ID;
  organizationId: ID | null;
  actorId: ID | null;
  actorName: string | null;
  actorEmail: string | null;
  action: string;
  resourceType: string;
  resourceId: string | null;
  resourceLabel: string | null;
  changes: Record<string, { from: unknown; to: unknown }>;
  ipAddress: string | null;
  userAgent: string | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
};

export type CreateAuditLogPayload = Omit<AuditLogEntry, "id" | "createdAt">;
