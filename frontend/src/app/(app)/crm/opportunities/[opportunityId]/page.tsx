"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, KanbanSquare } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/layout/PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils/date";

import {
  OpportunityStageBadge,
  OpportunityValue,
  useOpportunity,
} from "@/features/opportunities";

export default function OpportunityDetailPage() {
  const params = useParams<{ opportunityId: string }>();
  const id = params.opportunityId;
  const { data, isLoading } = useOpportunity(id);

  if (isLoading || !data) {
    return (
      <div className="space-y-4">
        <Skeleton variant="rectangle" className="h-12 w-64" />
        <Skeleton variant="rectangle" className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title={data.name}
        description={data.company}
        actions={
          <>
            <Button
              variant="outlined"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
              asChild
            >
              <Link href="/crm/opportunities">All opportunities</Link>
            </Button>
            <Button
              variant="contained"
              leftIcon={<KanbanSquare className="h-4 w-4" />}
              asChild
            >
              <Link href="/crm/pipeline">Pipeline</Link>
            </Button>
          </>
        }
      />

      <div className="lg:grid-cols-[1fr_320px] grid gap-4">
        <Card className="border-neutral-400/60 shadow-none">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <OpportunityStageBadge stage={data.stage} />
              <CardDescription>
                Updated {formatDate(data.updatedAt, "d MMM yyyy")}
              </CardDescription>
            </div>
            <CardTitle className="font-display text-600">Deal overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-400 text-neutral-700">
            <p>
              <span className="text-neutral-600">Contact · </span>
              {data.contactName ?? "-"}
            </p>
            <p>
              <span className="text-neutral-600">Owner · </span>
              {data.ownerName ?? "Unassigned"}
            </p>
            <p>
              <span className="text-neutral-600">Next step · </span>
              {data.nextStep ?? "-"}
            </p>
            {data.notes ? (
              <div className="rounded-xl bg-neutral-100 p-4 text-300 leading-relaxed">
                {data.notes}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="border-neutral-400/60 shadow-none">
          <CardHeader>
            <CardDescription>Deal value</CardDescription>
            <CardTitle>
              <OpportunityValue
                value={data.value}
                probability={data.probability}
                compact={false}
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-300 text-neutral-600">
            Expected close:{" "}
            {data.expectedCloseDate
              ? formatDate(data.expectedCloseDate, "d MMM yyyy")
              : "Not set"}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
