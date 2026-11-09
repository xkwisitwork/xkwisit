"use client";

import { RESEARCH_ASSISTANT } from "../assistants/research";
import { AiAssistantPanel } from "./AiAssistantPanel";

export function AiResearchPanel() {
  return <AiAssistantPanel meta={RESEARCH_ASSISTANT} />;
}
