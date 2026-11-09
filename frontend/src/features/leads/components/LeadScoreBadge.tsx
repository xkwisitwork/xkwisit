import { StatusBadge, type StatusTone } from "@/components/ui/Badge";
import { scoreBand } from "../utils/leadScoring";

const toneMap: Record<"destructive" | "warning" | "info" | "success", StatusTone> = {
  destructive: "destructive",
  warning: "warning",
  info: "info",
  success: "success",
};

export function LeadScoreBadge({ score }: { score: number }) {
  const band = scoreBand(score);

  return (
    <StatusBadge tone={toneMap[band.tone]} dot>
      {band.label} · {Math.round(score)}
    </StatusBadge>
  );
}
