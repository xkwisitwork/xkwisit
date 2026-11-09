import type { AutopilotRule, AutopilotRuleStatus } from "../../types";
import type { StatusTone } from "@/components/ui/Badge";

export function autopilotStatusTone(status: AutopilotRuleStatus): StatusTone {
  if (status === "ACTIVE") return "success";
  if (status === "REVIEW") return "warning";
  return "muted";
}

export function activeRules(rules: AutopilotRule[]): AutopilotRule[] {
  return rules.filter((r) => r.status === "ACTIVE");
}
