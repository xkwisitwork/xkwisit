"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { ContentCalendar, useContentCalendar } from "@/features/content";

export default function ContentCalendarPage() {
  const { data = [], isLoading } = useContentCalendar();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Content calendar"
        description="Scheduled and due content by date."
      />
      <ContentCalendar items={data} loading={isLoading} />
    </div>
  );
}
