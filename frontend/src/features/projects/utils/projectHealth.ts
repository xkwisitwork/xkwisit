import type { StatusTone } from "@/components/ui/Badge";
import type { ProjectStatus } from "@/lib/constants/statuses";

export function projectStatusTone(status: ProjectStatus): StatusTone {
  const map: Record<ProjectStatus, StatusTone> = {
    ON_TRACK: "success",
    AT_RISK: "warning",
    BLOCKED: "destructive",
    OVERDUE: "destructive",
    PAUSED: "warning",
    COMPLETED: "info",
  };

  return map[status];
}

export function projectStatusLabel(status: ProjectStatus): string {
  const map: Record<ProjectStatus, string> = {
    ON_TRACK: "On track",
    AT_RISK: "At risk",
    BLOCKED: "Blocked",
    OVERDUE: "Overdue",
    PAUSED: "Paused",
    COMPLETED: "Completed",
  };

  return map[status];
}

export function computeProgress(project: {
  tasksTotal: number;
  tasksDone: number;
}): number {
  if (project.tasksTotal === 0) return 0;

  return Math.round((project.tasksDone / project.tasksTotal) * 100);
}

export function daysUntil(date: string | null): number | null {
  if (!date) return null;

  const target = new Date(date).getTime();
  const now = Date.now();

  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

export function isOverdue(project: {
  endDate: string | null;
  status: ProjectStatus;
}): boolean {
  if (project.status === "COMPLETED") return false;
  if (!project.endDate) return false;

  const days = daysUntil(project.endDate);

  return days !== null && days < 0;
}
