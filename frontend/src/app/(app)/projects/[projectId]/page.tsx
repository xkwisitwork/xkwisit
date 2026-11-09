"use client";

import Link from "next/link";
import { use } from "react";
import { Pencil } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Skeleton } from "@/components/ui/Skeleton";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatDate } from "@/lib/utils/date";
import { formatCurrency } from "@/lib/utils/currency";

import { PauseProjectButton, ProjectStatusBadge, useProject } from "@/features/projects";
import { TaskList, useTasks } from "@/features/tasks";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  const { data: project, isLoading } = useProject(projectId);
  const { data: tasks = [] } = useTasks({ projectId });

  if (isLoading || !project) {
    return (
      <div className="space-y-6">
        <Skeleton variant="text" className="h-8 w-64" />
        <Skeleton variant="rectangle" className="h-64 w-full" />
      </div>
    );
  }

  return (
    <>
      <div>
        <Breadcrumbs
          items={[{ label: "Projects", href: "/projects" }, { label: project.name }]}
        />

        <PageHeader
          title={project.name}
          description={project.clientName}
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <PauseProjectButton project={project} />
              <Button
                variant="contained"
                leftIcon={<Pencil className="h-4 w-4" />}
                asChild={false}
              >
                <Link href={`/projects/${project.id}/edit`}>Edit project</Link>
              </Button>
            </div>
          }
        />
      </div>

      <div className="grid gap-6 laptop:grid-cols-3">
        <div className="space-y-6 laptop:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle>Overview</CardTitle>
                </div>
                <ProjectStatusBadge status={project.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {project.status === "PAUSED" && project.healthNote ? (
                <p className="rounded-xl bg-amber-50 px-3 py-2 text-400 text-neutral-800">
                  {project.healthNote}
                </p>
              ) : null}
              {project.description ? (
                <p className="whitespace-pre-wrap text-400 leading-relaxed text-neutral-700">
                  {project.description}
                </p>
              ) : null}

              <div>
                <Progress
                  value={project.progress}
                  label={`Progress · ${project.tasksDone}/${project.tasksTotal} tasks`}
                  showValue
                />
              </div>

              {project.healthNote ? (
                <div className="rounded-xl border border-warning/30 bg-warning/5 p-4">
                  <p className="text-300 font-semibold uppercase tracking-wide text-warning">
                    Attention
                  </p>
                  <p className="mt-1 text-400 leading-relaxed text-neutral-700">
                    {project.healthNote}
                  </p>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <div>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="font-display text-600 leading-tight">Tasks</h2>
              <Button variant="outlined" size="sm" asChild={false}>
                <Link href={`/tasks/new?projectId=${project.id}`}>Add task</Link>
              </Button>
            </div>

            <TaskList tasks={tasks} emptyMessage="No tasks yet." />
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-300">
              <Row label="Client">
                <Link
                  href={`/clients/${project.clientId}`}
                  className="text-primary hover:underline"
                >
                  {project.clientName}
                </Link>
              </Row>

              <Row label="Owner">
                {project.ownerName ? (
                  <div className="flex items-center gap-2">
                    <Avatar name={project.ownerName} size="xs" />
                    <span>{project.ownerName}</span>
                  </div>
                ) : (
                  "Unassigned"
                )}
              </Row>

              {project.startDate ? (
                <Row label="Start">{formatDate(project.startDate)}</Row>
              ) : null}

              {project.endDate ? (
                <Row label="End">{formatDate(project.endDate)}</Row>
              ) : null}

              {project.budgetAmount ? (
                <Row label="Budget">
                  {formatCurrency(project.budgetAmount, {
                    currency: project.currency,
                  })}
                </Row>
              ) : null}
            </CardContent>
          </Card>

          {project.tags.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" size="sm">
                    {tag}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-neutral-600">{label}</span>
      <span className="font-medium text-neutral-900">{children}</span>
    </div>
  );
}
