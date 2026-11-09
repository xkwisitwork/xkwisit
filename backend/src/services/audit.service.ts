import { randomUUID } from "node:crypto";
import type { AuditLogEntry, CreateAuditLogPayload } from "../types/audit.types.js";

const logs: AuditLogEntry[] = [];

export const auditService = {
  async record(input: CreateAuditLogPayload): Promise<AuditLogEntry> {
    const entry: AuditLogEntry = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...input,
    };
    logs.unshift(entry);
    if (logs.length > 1000) logs.length = 1000;
    return entry;
  },
  async list(limit = 50): Promise<AuditLogEntry[]> {
    return logs.slice(0, limit);
  },
};
