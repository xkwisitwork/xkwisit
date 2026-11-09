import type { TriggerType } from "../types";

export const TRIGGER_OPTIONS: Array<{ value: TriggerType; label: string }> = [
  { value: "MANUAL", label: "Manual" },
  { value: "SCHEDULE", label: "Schedule" },
  { value: "WEBHOOK", label: "Webhook" },
  { value: "EVENT", label: "Event" },
  { value: "THRESHOLD", label: "Threshold" },
];

export function triggerLabel(type: TriggerType): string {
  return TRIGGER_OPTIONS.find((t) => t.value === type)?.label ?? type;
}
