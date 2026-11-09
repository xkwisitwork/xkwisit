"use client";

import { CONTENT_ASSISTANT } from "../assistants/content";
import { AiAssistantPanel } from "./AiAssistantPanel";

export function AiContentPanel() {
  return <AiAssistantPanel meta={CONTENT_ASSISTANT} />;
}
