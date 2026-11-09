import type { ID, ISODateString, Money } from "@/types/common";
import type { Industry } from "@/lib/constants/industries";
import type { LeadSource } from "@/lib/constants/funnel-stages";
import type { LeadStatus } from "@/lib/constants/statuses";

/* ─── Core entity ────────────────────────────────────── */

export type Lead = {
  id: ID;
  organizationId: ID;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string | null;
  company: string;
  website: string | null;
  jobTitle: string | null;
  industry: Industry | string;
  source: LeadSource;
  status: LeadStatus;
  score: number;
  serviceInterest: string | null;
  budgetRange: string | null;
  notes: string | null;
  tags: string[];
  ownerId: ID | null;
  ownerName: string | null;
  nextFollowUpAt: ISODateString | null;
  lastContactedAt: ISODateString | null;
  convertedClientId: ID | null;
  archivedAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

/* ─── Lead score breakdown ──────────────────────────── */

export type LeadScoreBreakdownData = {
  total: number;
  dimensions: {
    budgetFit: number;
    serviceFit: number;
    engagement: number;
    urgency: number;
    authority: number;
  };
  calculatedAt: ISODateString;
};

/* ─── Activity ───────────────────────────────────────── */

export type LeadActivityType =
  | "CREATED"
  | "STATUS_CHANGED"
  | "NOTE_ADDED"
  | "EMAIL_SENT"
  | "CALL_LOGGED"
  | "MEETING_HELD"
  | "SCORE_UPDATED"
  | "OWNER_CHANGED"
  | "ARCHIVED";

export type LeadActivity = {
  id: ID;
  leadId: ID;
  type: LeadActivityType;
  actorId: ID | null;
  actorName: string | null;
  summary: string;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
};

/* ─── Filters ────────────────────────────────────────── */

export type LeadFilterState = {
  search: string;
  statuses: LeadStatus[];
  sources: LeadSource[];
  ownerId: string | null;
  industry: string | null;
  scoreMin: number | null;
  scoreMax: number | null;
  createdFrom: string | null;
  createdTo: string | null;
};

export const emptyLeadFilters: LeadFilterState = {
  search: "",
  statuses: [],
  sources: [],
  ownerId: null,
  industry: null,
  scoreMin: null,
  scoreMax: null,
  createdFrom: null,
  createdTo: null,
};

/* ─── Create / Update payloads ──────────────────────── */

export type CreateLeadPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  website?: string;
  jobTitle?: string;
  industry: string;
  source: LeadSource;
  serviceInterest?: string;
  budgetRange?: string;
  notes?: string;
  ownerId?: string;
  tags?: string[];
};

export type UpdateLeadPayload = Partial<CreateLeadPayload> & {
  status?: LeadStatus;
  score?: number;
  nextFollowUpAt?: string;
};

/* ─── Table row shape ────────────────────────────────── */

export type LeadListItem = Pick<
  Lead,
  | "id"
  | "fullName"
  | "email"
  | "company"
  | "source"
  | "status"
  | "score"
  | "ownerName"
  | "createdAt"
  | "nextFollowUpAt"
>;

/* ─── Stats ──────────────────────────────────────────── */

export type LeadStats = {
  total: number;
  new: number;
  qualified: number;
  won: number;
  lost: number;
  averageScore: number;
  conversionsThisMonth: number;
  pipelineValue: Money;
};
