import type { WorkflowTemplate } from "../types";

export const WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: "lead-notify",
    name: "New lead notify",
    description: "Notify the team when a high-score lead arrives.",
    triggerType: "EVENT",
    actionTypes: ["NOTIFY"],
  },
  {
    id: "stale-task",
    name: "Stale task escalate",
    description: "Create a follow-up when a task is overdue.",
    triggerType: "SCHEDULE",
    actionTypes: ["CREATE_TASK", "NOTIFY"],
  },
  {
    id: "anomaly-alert",
    name: "Anomaly alert",
    description: "Ping Slack when an anomaly opens.",
    triggerType: "THRESHOLD",
    actionTypes: ["NOTIFY", "WEBHOOK"],
  },
];
