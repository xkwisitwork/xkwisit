import type { ActionType } from "../types";

export const ACTION_OPTIONS: Array<{ value: ActionType; label: string }> = [
  { value: "NOTIFY", label: "Notify" },
  { value: "CREATE_TASK", label: "Create task" },
  { value: "UPDATE_STATUS", label: "Update status" },
  { value: "WEBHOOK", label: "Webhook" },
  { value: "AI_RUN", label: "AI run" },
  { value: "OTHER", label: "Other" },
];

export function actionLabel(type: ActionType): string {
  return ACTION_OPTIONS.find((a) => a.value === type)?.label ?? type;
}
