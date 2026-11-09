import type { ID, ISODateString } from "@/types/common";

/* ─── Enums ──────────────────────────────────────────── */

export type KnowledgeKind = "SOP" | "PLAYBOOK" | "TEMPLATE" | "FRAMEWORK";

export type SopStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

/* ─── Core ───────────────────────────────────────────── */

export type KnowledgeItem = {
  id: ID;
  kind: KnowledgeKind;
  title: string;
  summary: string | null;
  tags: string[];
  updatedAt: ISODateString;
};

export type Sop = {
  id: ID;
  title: string;
  summary: string | null;
  status: SopStatus;
  ownerName: string | null;
  steps: SopStep[];
  tags: string[];
  updatedAt: ISODateString;
  createdAt: ISODateString;
};

export type SopStep = {
  id: string;
  title: string;
  body: string;
  order: number;
  required: boolean;
};

export type SopListItem = Pick<
  Sop,
  "id" | "title" | "summary" | "status" | "ownerName" | "updatedAt"
>;

export type Playbook = {
  id: ID;
  title: string;
  summary: string;
  audience: string | null;
  steps: string[];
  updatedAt: ISODateString;
};

export type KnowledgeTemplate = {
  id: ID;
  title: string;
  summary: string;
  category: string;
  updatedAt: ISODateString;
};

export type Framework = {
  id: ID;
  title: string;
  summary: string;
  pillars: string[];
  updatedAt: ISODateString;
};

export type KnowledgeSearchResult = {
  id: ID;
  kind: KnowledgeKind;
  title: string;
  snippet: string;
};
