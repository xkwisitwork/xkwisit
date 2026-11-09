import type { ID, ISODateString } from "../../types/common.types.js";

export type LifecycleTransition = {
  id: ID;
  organizationId: ID;
  clientId: ID;
  fromStage: string;
  toStage: string;
  changedById: ID | null;
  changedAt: ISODateString;
  note: string | null;
};
