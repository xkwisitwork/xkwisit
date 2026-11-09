import type { ID, ISODateString } from "../../types/common.types.js";

export type MemoryEntry = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  key: string;
  content: string;
  source: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};
