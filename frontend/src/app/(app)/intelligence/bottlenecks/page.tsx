"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  BottleneckCard,
  BottleneckTimeline,
  useBottlenecks,
} from "@/features/intelligence";
import { Skeleton } from "@/components/ui/Skeleton";

export default function IntelligenceBottlenecksPage() {
  const { data = [], isLoading } = useBottlenecks();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Intelligence", href: "/intelligence" },
            { label: "Bottlenecks" },
          ]}
        />
        <PageHeader title="Bottlenecks" description="Stages limiting growth." />
      </div>
      {isLoading ? (
        <Skeleton variant="rectangle" className="h-40 w-full" />
      ) : (
        <>
          <BottleneckTimeline bottlenecks={data} />
          <div className="grid gap-4 tablet:grid-cols-2">
            {data.map((item) => (
              <BottleneckCard key={item.id} bottleneck={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
