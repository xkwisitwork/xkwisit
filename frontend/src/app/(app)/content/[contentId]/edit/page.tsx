"use client";

import { use } from "react";

import { Skeleton } from "@/components/ui/Skeleton";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContentForm, useContent } from "@/features/content";

export default function EditContentPage({
  params,
}: {
  params: Promise<{ contentId: string }>;
}) {
  const { contentId } = use(params);
  const { data: item, isLoading } = useContent(contentId);

  if (isLoading || !item) {
    return (
      <div className="space-y-6">
        <Skeleton variant="text" className="h-8 w-64" />
        <Skeleton variant="rectangle" className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Content", href: "/content" },
            { label: item.title, href: `/content/${item.id}` },
            { label: "Edit" },
          ]}
        />
        <PageHeader title="Edit content" description={item.title} />
      </div>

      <ContentForm
        mode="edit"
        item={item}
        clients={[{ id: item.clientId, name: item.clientName }]}
        cancelHref={`/content/${item.id}`}
      />
    </div>
  );
}
