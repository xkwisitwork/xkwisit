"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  EventDefinitionEditor,
  EventTable,
  useAnalyticsEvents,
} from "@/features/analytics";

export default function AnalyticsEventsPage() {
  const { data = [], isLoading } = useAnalyticsEvents();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Analytics", href: "/analytics" }, { label: "Events" }]}
        />
        <PageHeader title="Events" description="Key and custom events." />
      </div>
      <EventDefinitionEditor />
      <EventTable events={data} loading={isLoading} />
    </div>
  );
}
