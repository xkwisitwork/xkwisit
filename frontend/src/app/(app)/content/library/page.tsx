"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import {
  ContentCard,
  ContentEmptyState,
  ContentPerformanceWidget,
  useContentLibrary,
  useContentPerformance,
} from "@/features/content";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ContentLibraryPage() {
  const { data = [], isLoading } = useContentLibrary();
  const performance = useContentPerformance();

  return (
    <div className="space-y-6">
      <PageHeader title="Content library" description="Published and reusable pieces." />

      <ContentPerformanceWidget
        metrics={performance.data}
        loading={performance.isLoading}
      />

      {isLoading ? (
        <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="rectangle" className="h-40 w-full" />
          ))}
        </div>
      ) : data.length === 0 ? (
        <ContentEmptyState hasFilters={false} />
      ) : (
        <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
          {data.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
