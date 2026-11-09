import type { ID, ISODateString } from "../../types/common.types.js";

export type BriefStatus = "DRAFT" | "READY" | "SHARED" | "ARCHIVED";

export type ExecutiveBrief = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  title: string;
  status: BriefStatus;
  summary: string;
  highlights: string[];
  generatedAt: ISODateString | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};
