"use client";

import { REPORTING_ASSISTANT } from "../assistants/reporting";
import { AiAssistantPanel } from "./AiAssistantPanel";

export function AiReportingPanel() {
  return <AiAssistantPanel meta={REPORTING_ASSISTANT} />;
}
