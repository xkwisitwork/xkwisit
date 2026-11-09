"use client";

import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  KnowledgeSidebar,
  SAMPLE_SOPS,
  SopChecklist,
  useKnowledge,
  useSops,
} from "@/features/knowledge";

export default function KnowledgePage() {
  const knowledge = useKnowledge();
  const sops = useSops();
  const items = sops.data?.length ? sops.data : SAMPLE_SOPS;

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs items={[{ label: "Knowledge" }]} />
        <PageHeader title="Knowledge" description="SOPs, playbooks, and frameworks." />
      </div>
      <KnowledgeSidebar active="/knowledge" />
      {knowledge.isLoading || sops.isLoading ? (
        <Skeleton variant="rectangle" className="h-32 w-full" />
      ) : (
        <div className="grid gap-4 tablet:grid-cols-2">
          {items.slice(0, 4).map((sop) => (
            <Link key={sop.id} href={`/knowledge/sops/${sop.id}`}>
              <SopChecklist sop={sop} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
