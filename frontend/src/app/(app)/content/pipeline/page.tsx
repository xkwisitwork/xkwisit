"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { ContentPipelineBoard, useContentPipeline } from "@/features/content";

export default function ContentPipelinePage() {
  const { data = [], isLoading } = useContentPipeline();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Content pipeline"
        description="Every piece by production stage."
      />
      <ContentPipelineBoard columns={data} loading={isLoading} />
    </div>
  );
}
