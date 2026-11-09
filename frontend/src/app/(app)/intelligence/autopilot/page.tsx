"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  AutopilotReview,
  useAutopilotFeed,
  useAutopilotRules,
} from "@/features/intelligence";

export default function IntelligenceAutopilotPage() {
  const rules = useAutopilotRules();
  const feed = useAutopilotFeed();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Intelligence", href: "/intelligence" },
            { label: "Autopilot" },
          ]}
        />
        <PageHeader title="Autopilot" description="Rules and review queue." />
      </div>
      <AutopilotReview
        rules={rules.data ?? []}
        events={feed.data ?? []}
        loading={rules.isLoading || feed.isLoading}
      />
    </div>
  );
}
