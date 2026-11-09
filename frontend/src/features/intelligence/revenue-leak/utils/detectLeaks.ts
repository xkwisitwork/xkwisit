import type { RevenueLeak } from "../../types";

export function totalEstimatedLoss(leaks: RevenueLeak[]): number {
  return leaks.reduce((sum, leak) => sum + leak.estimatedMonthlyLoss, 0);
}

export function groupLeaksByStage(leaks: RevenueLeak[]): Record<string, RevenueLeak[]> {
  return leaks.reduce<Record<string, RevenueLeak[]>>((acc, leak) => {
    const key = leak.stage || "Other";
    (acc[key] ??= []).push(leak);
    return acc;
  }, {});
}
