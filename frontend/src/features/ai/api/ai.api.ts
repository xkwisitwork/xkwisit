import { apiClient } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";

import type { AiAssistantKind, AiPromptPayload, AiRunResult } from "../types";

const pathFor = (kind: AiAssistantKind): string => {
  switch (kind) {
    case "research":
      return endpoints.ai.research;
    case "strategy":
      return endpoints.ai.strategy;
    case "reporting":
      return endpoints.ai.reporting;
    case "content":
      return endpoints.ai.content;
    case "sales":
      return endpoints.ai.sales;
    case "operations":
      return endpoints.ai.operations;
  }
};

export async function runAiAssistant(
  kind: AiAssistantKind,
  payload: AiPromptPayload,
): Promise<AiRunResult> {
  return apiClient<AiRunResult>(pathFor(kind), {
    method: "POST",
    body: payload,
  });
}
