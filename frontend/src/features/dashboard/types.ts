import type { ID, ISODateString } from "@/types/common";

export type DashboardStat = {
  id: string;
  label: string;
  value: string;
  delta: number | null;
};

export type AttentionItem = {
  id: ID;
  title: string;
  severity: "HIGH" | "MEDIUM" | "LOW";
  href: string | null;
};

export type ActivityItem = {
  id: ID;
  actorName: string;
  summary: string;
  createdAt: ISODateString;
};

export type DashboardOrganization = {
  id: string;
  name: string;
  slug: string;
};

export type DashboardMember = {
  id: string;
  name: string;
  email: string | null;
  role: string;
};

export type DashboardOverview = {
  stats: DashboardStat[];
  attention: AttentionItem[];
  recentActivity: ActivityItem[];
  pipelineValue: number;
  revenueMtd: number;
  currency: "NGN" | "USD" | "GBP" | "EUR";
  activeProjects: number;
  openLeads?: number;
  openTasks?: number;
  teamUtilization: number;
  memberCount?: number;
  seatsIncluded?: number;
  highAttention?: number;
  mediumAttention?: number;
  members?: DashboardMember[];
  organization?: DashboardOrganization | null;
};
