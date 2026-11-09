"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  FrameworkCard,
  KnowledgeSidebar,
  SAMPLE_FRAMEWORKS,
  useFrameworks,
} from "@/features/knowledge";

export default function KnowledgeFrameworksPage() {
  const { data, isLoading } = useFrameworks();
  const items = data?.length ? data : SAMPLE_FRAMEWORKS;

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Knowledge", href: "/knowledge" }, { label: "Frameworks" }]}
        />
        <PageHeader title="Frameworks" description="Core operating models." />
      </div>
      <KnowledgeSidebar active="/knowledge/frameworks" />
      {isLoading ? (
        <Skeleton variant="rectangle" className="h-32 w-full" />
      ) : (
        <div className="grid gap-4 tablet:grid-cols-2">
          {items.map((framework) => (
            <FrameworkCard key={framework.id} framework={framework} />
          ))}
        </div>
      )}
    </div>
  );
}
