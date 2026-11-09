import { notImplemented } from "../utils/errors.js";
import type { CreateAiChatPayload, CreateAiJobPayload } from "../types/ai.types.js";

export const aiService = {
  async chat(_input: CreateAiChatPayload) {
    throw notImplemented("AI chat");
  },
  async createJob(_input: CreateAiJobPayload) {
    throw notImplemented("AI jobs");
  },
};
