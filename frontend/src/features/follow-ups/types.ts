import type { ID, ISODateString } from "@/types/common";

/**
 * Follow-up queue - overdue and upcoming touches across leads & opportunities.
 */

export type FollowUpStatus = "PENDING" | "DONE" | "SNOOZED" | "OVERDUE";

export type FollowUpEntityType = "LEAD" | "OPPORTUNITY" | "CLIENT";

export type FollowUpItem = {
  id: ID;
  entityType: FollowUpEntityType;
  entityId: ID;
  title: string;
  company: string;
  ownerName: string | null;
  dueAt: ISODateString;
  status: FollowUpStatus;
  channel: "CALL" | "EMAIL" | "WHATSAPP" | "MEETING" | "OTHER";
  note: string | null;
};

export type FollowUpQueueData = {
  overdue: FollowUpItem[];
  today: FollowUpItem[];
  upcoming: FollowUpItem[];
};

export type FollowUpRuleData = {
  id: ID;
  name: string;
  description: string;
  enabled: boolean;
  trigger: string;
  action: string;
};

export type StaleProspect = {
  id: ID;
  name: string;
  company: string;
  lastContactedAt: ISODateString | null;
  daysSilent: number;
  href: string;
};
