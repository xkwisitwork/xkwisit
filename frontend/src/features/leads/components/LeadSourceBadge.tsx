import { Badge } from "@/components/ui/Badge";
import type { LeadSource } from "@/lib/constants/funnel-stages";

const sourceEmoji: Record<string, string> = {
  "Google Ads": "🔍",
  "Meta Ads": "📘",
  Instagram: "📸",
  LinkedIn: "💼",
  "X (Twitter)": "🐦",
  Website: "🌐",
  Referral: "🤝",
  "Organic Search": "🌱",
  YouTube: "▶️",
  Email: "✉️",
  WhatsApp: "💬",
  Direct: "🎯",
  Event: "🎪",
  "Cold Outreach": "📞",
  Partnership: "🔗",
  Other: "·",
};

export function LeadSourceBadge({ source }: { source: LeadSource | string }) {
  const emoji = sourceEmoji[source] ?? "·";

  return (
    <Badge variant="outline" size="sm">
      <span aria-hidden="true">{emoji}</span>
      <span>{source}</span>
    </Badge>
  );
}
