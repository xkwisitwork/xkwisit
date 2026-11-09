"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/Badge";
import { Card, CardStat } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/utils/date";
import { cn } from "@/lib/utils/cn";
import { buttonVariants } from "@/components/ui/Button/variants";

import {
  useBrandApprovals,
  useBrandGuidelines,
  useBrandRevisions,
  useBrandStats,
} from "../hooks/useBrandApprovals";
import { useBrandAssets } from "../hooks/useBrandAssets";
import { ApprovalActions } from "./ApprovalActions";
import { BrandAssetGrid } from "./BrandAssetGrid";
import { BrandGuidelinesView } from "./BrandGuidelines";
import { RevisionTimeline } from "./RevisionTimeline";

export type BrandWorkspaceProps = {
  clientId?: string | null;
};

export function BrandWorkspace({ clientId }: BrandWorkspaceProps) {
  const stats = useBrandStats();
  const assets = useBrandAssets(clientId ? { clientId } : {});
  const guidelines = useBrandGuidelines(clientId);
  const approvals = useBrandApprovals(clientId);
  const revisions = useBrandRevisions(clientId);

  const pending = (approvals.data ?? []).filter((a) => a.status === "PENDING");

  return (
    <div className="space-y-8">
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
            <CardStat label="Assets" value={stats.data.totalAssets} />
          </Card>
          <Card>
            <CardStat
              label="Pending approvals"
              value={stats.data.pendingApprovals}
              delta={
                stats.data.pendingApprovals > 0 ? (
                  <Badge variant="warning" size="sm">
                    Review
                  </Badge>
                ) : null
              }
            />
          </Card>
          <Card>
            <CardStat label="Logo concepts" value={stats.data.logoConcepts} />
          </Card>
          <Card>
            <CardStat
              label="Guidelines"
              value={
                stats.data.guidelinesUpdatedAt
                  ? formatDate(stats.data.guidelinesUpdatedAt, "d MMM")
                  : "-"
              }
            />
          </Card>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Link
          href="/brand/assets"
          className={cn(buttonVariants({ variant: "outlined", size: "sm" }))}
        >
          Assets
        </Link>
        <Link
          href="/brand/guidelines"
          className={cn(buttonVariants({ variant: "outlined", size: "sm" }))}
        >
          Guidelines
        </Link>
      </div>

      <section className="space-y-3">
        <h2 className="text-500 font-medium">Assets</h2>
        <BrandAssetGrid assets={assets.data ?? []} loading={assets.isLoading} canDelete />
      </section>

      <section className="space-y-3">
        <h2 className="text-500 font-medium">Guidelines</h2>
        <BrandGuidelinesView
          guidelines={guidelines.data}
          loading={guidelines.isLoading}
        />
      </section>

      {pending.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-500 font-medium">Pending approvals</h2>
          <div className="space-y-4">
            {pending.map((approval) => (
              <ApprovalActions key={approval.id} approval={approval} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-500 font-medium">Revisions</h2>
        {revisions.isLoading ? (
          <Skeleton variant="rectangle" className="h-40 w-full" />
        ) : (
          <RevisionTimeline revisions={revisions.data ?? []} />
        )}
      </section>
    </div>
  );
}
