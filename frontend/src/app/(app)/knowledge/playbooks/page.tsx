"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  KnowledgeSidebar,
  PlaybookCard,
  SAMPLE_PLAYBOOKS,
  usePlaybooks,
} from "@/features/knowledge";

export default function KnowledgePlaybooksPage() {
  const { data, isLoading } = usePlaybooks();
  const items = data?.length ? data : SAMPLE_PLAYBOOKS;

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Knowledge", href: "/knowledge" }, { label: "Playbooks" }]}
        />
        <PageHeader title="Playbooks" description="Repeatable growth plays." />
      </div>
      <KnowledgeSidebar active="/knowledge/playbooks" />
      {isLoading ? (
        <Skeleton variant="rectangle" className="h-32 w-full" />
      ) : (
        <div className="grid gap-4 tablet:grid-cols-2">
          {items.map((playbook) => (
            <PlaybookCard key={playbook.id} playbook={playbook} />
          ))}
        </div>
      )}
    </div>
  );
}
