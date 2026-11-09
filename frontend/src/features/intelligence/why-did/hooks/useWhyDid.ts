"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { getErrorMessage, normalizeError } from "@/lib/api/errors";

import { runWhyDid } from "../../api/intelligence.api";
import type { WhyDidQueryPayload } from "../../types";

export function useWhyDid() {
  return useMutation({
    mutationFn: async (payload: WhyDidQueryPayload) => {
      try {
        return await runWhyDid(payload);
      } catch (error) {
        throw normalizeError(error);
      }
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
