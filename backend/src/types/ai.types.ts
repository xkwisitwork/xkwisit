import type { ID, ISODateString } from "./common.types.js";

/**
 * AI assistant / generation domain types.
 */

export type AiJobStatus =
  | "QUEUED"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELLED";

export type AiCapability =
  | "CHAT"
  | "SUMMARY"
  | "BRIEF"
  | "REPORT"
  | "RECOMMENDATION"
  | "CONTENT"
  | "ANALYSIS";

export type AiMessageRole = "system" | "user" | "assistant" | "tool";

export type AiMessage = {
  id: ID;
  role: AiMessageRole;
  content: string;
  createdAt: ISODateString;
  metadata?: Record<string, unknown>;
};

export type AiConversation = {
  id: ID;
  organizationId: ID;
  userId: ID;
  title: string | null;
  capability: AiCapability;
  messages: AiMessage[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type AiJob = {
  id: ID;
  organizationId: ID;
  userId: ID | null;
  capability: AiCapability;
  status: AiJobStatus;
  prompt: string;
  result: string | null;
  errorMessage: string | null;
  startedAt: ISODateString | null;
  finishedAt: ISODateString | null;
  metadata: Record<string, unknown>;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type CreateAiChatPayload = {
  message: string;
  conversationId?: ID | null;
  capability?: AiCapability;
  context?: Record<string, unknown>;
};

export type CreateAiJobPayload = {
  capability: AiCapability;
  prompt: string;
  metadata?: Record<string, unknown>;
};
