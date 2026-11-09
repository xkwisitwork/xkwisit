import { StatusBadge } from "@/components/ui/Badge";

import type { CampaignChannel } from "../types";
import { campaignChannelLabel } from "../utils/metricsCalculator";

export function CampaignChannelBadge({ channel }: { channel: CampaignChannel }) {
  return (
    <StatusBadge tone="info" size="sm" dot={false}>
      {campaignChannelLabel(channel)}
    </StatusBadge>
  );
}
