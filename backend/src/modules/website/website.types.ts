import type { ID, ISODateString } from "../../types/common.types.js";

export type WebsiteMonitorResult = {
  id: ID;
  organizationId: ID;
  clientId: ID | null;
  url: string;
  statusCode: number | null;
  ok: boolean;
  responseMs: number | null;
  checkedAt: ISODateString;
};
