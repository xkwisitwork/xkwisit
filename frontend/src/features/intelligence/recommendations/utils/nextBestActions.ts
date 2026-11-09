import type { ActionPriority, RecommendedAction } from "../../types";
import type { StatusTone } from "@/components/ui/Badge";

export function actionPriorityTone(priority: ActionPriority): StatusTone {
  if (priority === "P0") return "destructive";
  if (priority === "P1") return "warning";
  if (priority === "P2") return "info";
  return "muted";
}

export function sortByPriority(actions: RecommendedAction[]): RecommendedAction[] {
  const order: Record<ActionPriority, number> = {
    P0: 0,
    P1: 1,
    P2: 2,
    P3: 3,
  };
  return [...actions].sort((a, b) => order[a.priority] - order[b.priority]);
}
