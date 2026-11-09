"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { ContentCalendar, useContentCalendar } from "@/features/content";

export default function PortalContentCalendarPage() {
  const { data = [], isLoading } = useContentCalendar();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Content calendar"
        description="Upcoming content for your brand."
      />
      <ContentCalendar items={data} loading={isLoading} />
    </div>
  );
}
