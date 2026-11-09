"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { ContentApprovalFlow, ContentCard, useContentList } from "@/features/content";
import { Skeleton } from "@/components/ui/Skeleton";

export default function PortalContentApprovalsPage() {
  const { data, isLoading } = useContentList({
    filters: { statuses: ["CLIENT_APPROVAL"] },
    pageSize: 50,
  });

  const items = data?.items ?? [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Content approvals"
        description="Pieces waiting for your review."
      />

      {isLoading ? (
        <Skeleton variant="rectangle" className="h-48 w-full" />
      ) : items.length === 0 ? (
        <p className="text-400 text-neutral-600">Nothing waiting on approval.</p>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="space-y-3">
              <ContentCard item={item} />
              <ContentApprovalFlow contentId={item.id} status={item.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
