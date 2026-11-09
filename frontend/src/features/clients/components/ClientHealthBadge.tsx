import { StatusBadge } from "@/components/ui/Badge";
import type { HealthLevel } from "@/lib/constants/statuses";
import { healthLevelLabel, healthLevelTone } from "../utils/clientHealth";

export function ClientHealthBadge({
  level,
  score,
}: {
  level: HealthLevel;
  score?: number;
}) {
  return (
    <StatusBadge tone={healthLevelTone(level)} dot>
      {healthLevelLabel(level)}
      {typeof score === "number" ? ` · ${Math.round(score)}` : ""}
    </StatusBadge>
  );
}
