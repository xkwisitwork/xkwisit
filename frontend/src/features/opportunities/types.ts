import type { ID, ISODateString, Money } from "@/types/common";
import type { LeadStatus } from "@/lib/constants/statuses";

/**
 * Opportunity = qualified deal progressing through the sales stages.
 */

export type OpportunityStage = Extract<
  LeadStatus,
  "QUALIFIED" | "DISCOVERY" | "PROPOSAL" | "NEGOTIATION" | "WON" | "LOST"
>;

export type Opportunity = {
  id: ID;
  organizationId: ID;
  leadId: ID | null;
  clientId: ID | null;
  name: string;
  company: string;
  contactName: string | null;
  stage: OpportunityStage;
  value: Money;
  probability: number;
  expectedCloseDate: ISODateString | null;
  ownerId: ID | null;
  ownerName: string | null;
  source: string | null;
  nextStep: string | null;
  notes: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type OpportunityListItem = Pick<
  Opportunity,
  | "id"
  | "name"
  | "company"
  | "contactName"
  | "stage"
  | "value"
  | "probability"
  | "expectedCloseDate"
  | "ownerName"
  | "updatedAt"
>;

export type OpportunityFilterState = {
  search: string;
  stages: OpportunityStage[];
  ownerId: string | null;
};

export const emptyOpportunityFilters: OpportunityFilterState = {
  search: "",
  stages: [],
  ownerId: null,
};

export type CreateOpportunityPayload = {
  name: string;
  company: string;
  contactName?: string | null;
  stage?: OpportunityStage;
  value: Money;
  probability?: number;
  leadId?: string | null;
  expectedCloseDate?: string | null;
  ownerId?: string | null;
  nextStep?: string | null;
  notes?: string | null;
};

export type UpdateOpportunityPayload = Partial<CreateOpportunityPayload>;

export type OpportunityStats = {
  total: number;
  open: number;
  won: number;
  lost: number;
  totalValue: Money;
  weightedValue: Money;
};
