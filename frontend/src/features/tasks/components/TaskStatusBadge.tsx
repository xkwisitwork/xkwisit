import { StatusBadge, type StatusTone } from "@/components/ui/Badge";
import { TASK_STATUS_LABELS, type TaskStatus } from "@/lib/constants/statuses";

const tones: Record<TaskStatus, StatusTone> = {
  TODO: "muted",
  IN_PROGRESS: "info",
  IN_REVIEW: "warning",
  BLOCKED: "destructive",
  DONE: "success",
};

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  return <StatusBadge tone={tones[status]}>{TASK_STATUS_LABELS[status]}</StatusBadge>;
}
