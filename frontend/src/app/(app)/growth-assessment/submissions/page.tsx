"use client";

import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatusBadge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils/date";
import { useAssessmentSubmissions } from "@/features/assessment";

export default function GrowthAssessmentSubmissionsPage() {
  const { data = [], isLoading } = useAssessmentSubmissions();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Growth assessment", href: "/growth-assessment/submissions" },
            { label: "Submissions" },
          ]}
        />
        <PageHeader title="Submissions" description="All growth assessment runs." />
      </div>
      {isLoading ? (
        <Skeleton variant="rectangle" className="h-40 w-full" />
      ) : data.length === 0 ? (
        <p className="text-400 text-neutral-600">No submissions yet.</p>
      ) : (
        <ul className="divide-y divide-neutral-300 rounded-xl border border-neutral-400">
          {data.map((item) => (
            <li key={item.id}>
              <Link
                href={`/growth-assessment/${item.token}`}
                className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 hover:bg-neutral-200/40"
              >
                <div>
                  <p className="text-400 font-medium">
                    {item.businessName ?? "Untitled"}
                  </p>
                  <p className="text-200 text-neutral-600">
                    {item.email ?? "-"} · {formatDate(item.createdAt, "d MMM yyyy")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {item.overallScore != null ? (
                    <span className="text-300 tabular-nums">{item.overallScore}</span>
                  ) : null}
                  <StatusBadge tone="muted" size="sm">
                    {item.status}
                  </StatusBadge>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
