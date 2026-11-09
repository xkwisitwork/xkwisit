"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

import {
  FollowUpQueue,
  FollowUpRule,
  OverdueLeads,
  useFollowUpEngine,
} from "@/features/follow-ups";

export default function FollowUpsPage() {
  const { queue, rules, stale } = useFollowUpEngine();

  return (
    <>
      <PageHeader
        title="Follow-ups"
        description="Overdue touches, today's queue, and automation rules that keep deals warm."
      />

      <div className="xl:grid-cols-[1fr_320px] grid gap-6">
        <div className="space-y-4">
          {queue.isLoading || !queue.data ? (
            <Skeleton variant="rectangle" className="h-64 rounded-2xl" />
          ) : (
            <>
              <FollowUpQueue title="Overdue" items={queue.data.overdue} tone="danger" />
              <FollowUpQueue title="Today" items={queue.data.today} tone="mint" />
              <FollowUpQueue title="Upcoming" items={queue.data.upcoming} />
            </>
          )}
        </div>

        <aside className="space-y-6">
          <Card className="border-neutral-400/60 shadow-none">
            <CardHeader>
              <CardTitle>Stale prospects</CardTitle>
              <CardDescription>No contact in 7+ days</CardDescription>
            </CardHeader>
            <CardContent>
              {stale.isLoading ? (
                <Skeleton variant="rectangle" className="h-32" />
              ) : (
                <OverdueLeads items={stale.data ?? []} />
              )}
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h3 className="font-display text-500 font-semibold">Rules</h3>
            {rules.isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} variant="rectangle" className="h-28 rounded-xl" />
                ))
              : (rules.data ?? []).map((rule) => (
                  <FollowUpRule key={rule.id} rule={rule} />
                ))}
          </div>
        </aside>
      </div>
    </>
  );
}
