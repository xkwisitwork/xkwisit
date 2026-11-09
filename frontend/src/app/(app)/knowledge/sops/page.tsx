"use client";

import Link from "next/link";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  KnowledgeSidebar,
  SAMPLE_SOPS,
  SopChecklist,
  useSops,
} from "@/features/knowledge";

export default function KnowledgeSopsPage() {
  const { data, isLoading } = useSops();
  const items = data?.length ? data : SAMPLE_SOPS;

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Knowledge", href: "/knowledge" }, { label: "SOPs" }]}
        />
        <PageHeader title="SOPs" description="Standard operating procedures." />
      </div>
      <KnowledgeSidebar active="/knowledge/sops" />
      {isLoading ? (
        <Skeleton variant="rectangle" className="h-40 w-full" />
      ) : (
        <div className="grid gap-4 tablet:grid-cols-2">
          {items.map((sop) => (
            <Link key={sop.id} href={`/knowledge/sops/${sop.id}`}>
              <SopChecklist sop={sop} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
