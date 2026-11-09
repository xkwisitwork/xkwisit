import type { BillingSnapshot } from "../config/entitlements.js";
import type { OrgPlan, OrgStatus } from "../models/Organization.js";
import type { ID, ISODateString } from "./common.types.js";

export type BillingPlanChange = {
  organizationId: ID;
  fromPlan: OrgPlan;
  toPlan: OrgPlan;
  changedAt: ISODateString;
  changedById: ID | null;
};

export type BillingStatusChange = {
  organizationId: ID;
  fromStatus: OrgStatus;
  toStatus: OrgStatus;
  changedAt: ISODateString;
  reason: string | null;
};

export type OrganizationBillingView = BillingSnapshot & {
  organizationId: ID;
  seatsUsed: number;
};

export type { BillingSnapshot, OrgPlan, OrgStatus };
