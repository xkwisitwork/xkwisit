import type { ID, ISODateString } from "./common.types.js";

/**
 * Lead / CRM domain types.
 */

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "PROPOSAL"
  | "WON"
  | "LOST"
  | "ARCHIVED";

export type LeadSource =
  | "WEBSITE"
  | "REFERRAL"
  | "ADS"
  | "COLD_OUTREACH"
  | "PARTNER"
  | "EVENT"
  | "OTHER";

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
  industry: string;
  source: LeadSource | string;
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

export type LeadListItem = Pick<
  Lead,
  | "id"
  | "fullName"
  | "email"
  | "company"
  | "status"
  | "source"
  | "score"
  | "ownerName"
  | "nextFollowUpAt"
  | "createdAt"
>;

export type LeadStats = {
  total: number;
  newThisWeek: number;
  qualified: number;
  won: number;
  averageScore: number;
};

export type CreateLeadPayload = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string | null;
  source?: LeadSource | string;
  industry?: string;
  notes?: string | null;
  ownerId?: ID | null;
};

export type UpdateLeadPayload = Partial<CreateLeadPayload> & {
  status?: LeadStatus;
  score?: number;
  tags?: string[];
  nextFollowUpAt?: ISODateString | null;
};
