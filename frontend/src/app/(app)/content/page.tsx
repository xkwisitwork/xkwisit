"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Card, CardStat } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

import {
  ContentCard,
  ContentEmptyState,
  useContentFilters,
  useContentList,
  useContentStats,
} from "@/features/content";

export default function ContentPage() {
  const { filters, page, pageSize, activeCount, updateFilter, reset } =
    useContentFilters();

  const { data, isLoading } = useContentList({ filters, page, pageSize });
  const stats = useContentStats();

  return (
    <>
      <PageHeader
        title="Content"
        description="Pipeline of pieces across every client."
        actions={
          <Button variant="contained" leftIcon={<Plus className="h-4 w-4" />}>
            <Link href="/content/new">New content</Link>
          </Button>
        }
      />

      {stats.isLoading || !stats.data ? (
        <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <Skeleton variant="text" className="w-20" />
              <Skeleton variant="text" className="mt-3 h-7 w-16" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-4">
          <Card>
            <CardStat label="In pipeline" value={stats.data.inPipeline} />
          </Card>
          <Card>
            <CardStat
              label="Awaiting approval"
              value={stats.data.awaitingApproval}
              delta={
                stats.data.awaitingApproval > 0 ? (
                  <Badge variant="warning" size="sm">
                    Review
                  </Badge>
                ) : null
              }
            />
          </Card>
          <Card>
            <CardStat label="Scheduled" value={stats.data.scheduled} />
          </Card>
          <Card>
            <CardStat label="Published" value={stats.data.published} />
          </Card>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Input
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder="Search content…"
            className="max-w-md"
          />
          {activeCount > 0 ? (
            <Button variant="ghost" size="sm" onClick={reset}>
              Clear filters
            </Button>
          ) : null}
        </div>

        {isLoading ? (
          <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} variant="rectangle" className="h-40 w-full" />
            ))}
          </div>
        ) : (data?.items.length ?? 0) === 0 ? (
          <ContentEmptyState hasFilters={activeCount > 0} />
        ) : (
          <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
            {data?.items.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
