"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { KnowledgeSidebar, SopEditor, SopViewer, useSop } from "@/features/knowledge";

export default function KnowledgeSopDetailPage({
  params,
}: {
  params: Promise<{ sopId: string }>;
}) {
  const { sopId } = use(params);
  const { data, isLoading } = useSop(sopId);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Knowledge", href: "/knowledge" },
            { label: "SOPs", href: "/knowledge/sops" },
            { label: data?.title ?? "SOP" },
          ]}
        />
        <PageHeader
          title={data?.title ?? "SOP"}
          description={data?.summary ?? "Procedure detail."}
        />
      </div>
      <KnowledgeSidebar active="/knowledge/sops" />
      {data ? <SopEditor sop={data} /> : null}
      <SopViewer sop={data} loading={isLoading} />
    </div>
  );
}
