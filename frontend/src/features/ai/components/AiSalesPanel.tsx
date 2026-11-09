"use client";

import { SALES_ASSISTANT } from "../assistants/sales";
import { AiAssistantPanel } from "./AiAssistantPanel";

export function AiSalesPanel() {
  return <AiAssistantPanel meta={SALES_ASSISTANT} />;
}
