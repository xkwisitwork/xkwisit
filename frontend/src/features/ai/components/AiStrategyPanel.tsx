"use client";

import { STRATEGY_ASSISTANT } from "../assistants/strategy";
import { AiAssistantPanel } from "./AiAssistantPanel";

export function AiStrategyPanel() {
  return <AiAssistantPanel meta={STRATEGY_ASSISTANT} />;
}
