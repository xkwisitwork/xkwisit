"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils/date";

import type { Bottleneck } from "../../types";
import { rankBottlenecksByImpact } from "../utils/detectBottleneck";

export function BottleneckTimeline({
  bottlenecks,
  loading,
}: {
  bottlenecks: Bottleneck[];
  loading?: boolean;
}) {
  if (loading) {
    return <Skeleton variant="rectangle" className="h-40 w-full" />;
  }

  const ranked = rankBottlenecksByImpact(bottlenecks);

  if (ranked.length === 0) {
    return <p className="text-400 text-neutral-600">No bottlenecks found.</p>;
  }

  return (
    <ol className="space-y-4 border-l border-neutral-400 pl-4">
      {ranked.map((item) => (
        <li key={item.id} className="relative">
          <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
          <p className="text-400 font-medium">{item.title}</p>
          <p className="text-200 text-neutral-600">
            {item.stage} · {formatDate(item.detectedAt, "d MMM yyyy")} · impact{" "}
            {item.impactScore}
          </p>
        </li>
      ))}
    </ol>
  );
}
