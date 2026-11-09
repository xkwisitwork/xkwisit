"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { ContentCard, ContentEmptyState, useContentList } from "@/features/content";
import { Skeleton } from "@/components/ui/Skeleton";

export default function PortalContentPage() {
  const { data, isLoading } = useContentList({ pageSize: 50 });

  return (
    <div className="space-y-6">
      <PageHeader title="Content" description="Pieces in production for your brand." />

      {isLoading ? (
        <div className="grid gap-4 tablet:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="rectangle" className="h-40 w-full" />
          ))}
        </div>
      ) : (data?.items.length ?? 0) === 0 ? (
        <ContentEmptyState hasFilters={false} />
      ) : (
        <div className="grid gap-4 tablet:grid-cols-2">
          {data?.items.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
