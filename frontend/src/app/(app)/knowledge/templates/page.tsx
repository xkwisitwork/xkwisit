"use client";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  KnowledgeSidebar,
  TemplateCard,
  useKnowledgeTemplates,
} from "@/features/knowledge";

export default function KnowledgeTemplatesPage() {
  const { data = [], isLoading } = useKnowledgeTemplates();

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[{ label: "Knowledge", href: "/knowledge" }, { label: "Templates" }]}
        />
        <PageHeader title="Templates" description="Reusable document templates." />
      </div>
      <KnowledgeSidebar active="/knowledge/templates" />
      {isLoading ? (
        <Skeleton variant="rectangle" className="h-32 w-full" />
      ) : data.length === 0 ? (
        <p className="text-400 text-neutral-600">No templates yet.</p>
      ) : (
        <div className="grid gap-4 tablet:grid-cols-2">
          {data.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      )}
    </div>
  );
}
