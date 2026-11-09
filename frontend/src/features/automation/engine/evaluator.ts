import type { WorkflowCondition } from "../types";

export function evaluateCondition(
  condition: WorkflowCondition,
  context: Record<string, string | number | boolean | null | undefined>,
): boolean {
  const raw = context[condition.field];
  const left = raw == null ? "" : String(raw);
  const right = condition.value;

  switch (condition.operator) {
    case "eq":
      return left === right;
    case "neq":
      return left !== right;
    case "gt":
      return Number(left) > Number(right);
    case "lt":
      return Number(left) < Number(right);
    case "contains":
      return left.toLowerCase().includes(right.toLowerCase());
    default:
      return false;
  }
}

export function evaluateAll(
  conditions: WorkflowCondition[],
  context: Record<string, string | number | boolean | null | undefined>,
): boolean {
  if (conditions.length === 0) return true;
  return conditions.every((c) => evaluateCondition(c, context));
}
