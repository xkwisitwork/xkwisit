import type { ID, ISODateString } from "../../types/common.types.js";

export type ExpansionOpportunity = {
  id: ID;
  organizationId: ID;
  clientId: ID;
  title: string;
  estimatedMonthlyValue: number | null;
  confidence: number;
  rationale: string;
  detectedAt: ISODateString;
};
