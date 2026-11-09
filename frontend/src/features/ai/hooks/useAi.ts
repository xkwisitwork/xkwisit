"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { getErrorMessage, normalizeError } from "@/lib/api/errors";

import { runAiAssistant } from "../api/ai.api";
import type { AiAssistantKind, AiPromptPayload } from "../types";

export function useAi(kind: AiAssistantKind) {
  return useMutation({
    mutationFn: async (payload: AiPromptPayload) => {
      try {
        return await runAiAssistant(kind, payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
