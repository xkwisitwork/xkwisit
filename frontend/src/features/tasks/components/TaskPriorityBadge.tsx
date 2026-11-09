import { Badge } from "@/components/ui/Badge";
import type { TaskPriority } from "../types";

const labels: Record<TaskPriority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};

const variants: Record<TaskPriority, "muted" | "info" | "warning" | "destructive"> = {
  LOW: "muted",
  MEDIUM: "info",
  HIGH: "warning",
  URGENT: "destructive",
};

export function TaskPriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <Badge variant={variants[priority]} size="sm">
      {labels[priority]}
    </Badge>
  );
}
