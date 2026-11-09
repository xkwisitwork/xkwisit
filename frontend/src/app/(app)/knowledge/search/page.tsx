"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { KnowledgeSearch, KnowledgeSidebar } from "@/features/knowledge";

export default function KnowledgeSearchPage() {
  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Knowledge", href: "/knowledge" }, { label: "Search" }]}
        />
        <PageHeader title="Search" description="Find knowledge assets." />
      </div>
      <KnowledgeSidebar active="/knowledge/search" />
      <KnowledgeSearch />
    </div>
  );
}
