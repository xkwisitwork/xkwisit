import type { ID, ISODateString } from "@/types/common";

/* ─── Enums ──────────────────────────────────────────── */

export type TeamMemberStatus = "ACTIVE" | "INVITED" | "INACTIVE";

export type TeamRole = "OWNER" | "ADMIN" | "MANAGER" | "SPECIALIST" | "CONTRACTOR";

/* ─── Core ───────────────────────────────────────────── */

export type TeamMember = {
  id: ID;
  name: string;
  email: string;
  role: TeamRole;
  status: TeamMemberStatus;
  title: string | null;
  capacityHoursPerWeek: number;
  utilizationPercent: number;
  avatarUrl: string | null;
  createdAt: ISODateString;
};

export type TeamMemberListItem = Pick<
  TeamMember,
  | "id"
  | "name"
  | "email"
  | "role"
  | "status"
  | "title"
  | "utilizationPercent"
  | "capacityHoursPerWeek"
>;

export type CapacityRow = {
  memberId: ID;
  memberName: string;
  allocatedHours: number;
  capacityHours: number;
  utilizationPercent: number;
};

export type TimesheetEntry = {
  id: ID;
  memberId: ID;
  memberName: string;
  projectName: string | null;
  clientName: string | null;
  hours: number;
  date: ISODateString;
  note: string | null;
};

export type UtilizationSnapshot = {
  averageUtilization: number;
  overCapacityCount: number;
  underCapacityCount: number;
  rows: CapacityRow[];
};

/* ─── Payloads ───────────────────────────────────────── */

export type InviteMemberPayload = {
  name: string;
  email: string;
  role: TeamRole;
  title?: string;
  capacityHoursPerWeek?: number;
};

export type UpdateMemberPayload = Partial<Omit<InviteMemberPayload, "email">> & {
  status?: TeamMemberStatus;
};
