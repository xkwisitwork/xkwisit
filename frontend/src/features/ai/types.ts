import type { ID, ISODateString } from "@/types/common";

/* ─── Enums ──────────────────────────────────────────── */

export type AiAssistantKind =
  "research" | "strategy" | "reporting" | "content" | "sales" | "operations";

export type AiRunStatus = "PENDING" | "SUCCEEDED" | "FAILED";

/* ─── Core ───────────────────────────────────────────── */

export type AiPromptPayload = {
  prompt: string;
  clientId?: string;
  context?: string;
};

export type AiInsight = {
  id: ID;
  title: string;
  body: string;
  confidence: number | null;
};

export type AiRunResult = {
  id: ID;
  kind: AiAssistantKind;
  status: AiRunStatus;
  output: string;
  insights: AiInsight[];
  createdAt: ISODateString;
};

export type AiAssistantMeta = {
  kind: AiAssistantKind;
  title: string;
  description: string;
  placeholder: string;
};
