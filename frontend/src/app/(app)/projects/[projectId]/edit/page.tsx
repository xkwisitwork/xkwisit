"use client";

import { use } from "react";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { Skeleton } from "@/components/ui/Skeleton";

import { ProjectForm, useProject } from "@/features/projects";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { data: project, isLoading } = useProject(projectId);

  if (isLoading || !project) {
    return (
      <div className="space-y-6">
        <Skeleton variant="text" className="h-6 w-64" />
        <Skeleton variant="rectangle" className="h-[600px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumbs
          items={[
            { label: "Projects", href: "/projects" },
            { label: project.name, href: `/projects/${project.id}` },
            { label: "Edit" },
          ]}
        />
        <PageHeader title={`Edit ${project.name}`} />
      </div>

      <ProjectForm
        mode="edit"
        project={project}
        clients={[]}
        cancelHref={`/projects/${project.id}`}
      />
    </div>
  );
}
