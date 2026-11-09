"use client";

import { use } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatDate } from "@/lib/utils/date";

import { TaskPriorityBadge, TaskStatusBadge, useTasks } from "@/features/tasks";

export default function TaskDetailPage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = use(params);
  const { data: tasks = [], isLoading } = useTasks({});
  const task = tasks.find((t) => t.id === taskId);

  if (isLoading) {
    return <Skeleton variant="rectangle" className="h-96 w-full" />;
  }

  if (!task) {
    return (
      <div className="rounded-2xl border border-neutral-400 bg-neutral-100 p-12 text-center">
        <p className="text-400 text-neutral-600">Task not found.</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <Breadcrumbs
          items={[{ label: "Tasks", href: "/tasks" }, { label: task.title }]}
        />

        <PageHeader
          title={task.title}
          description={task.projectName ?? "No project"}
          actions={
            <Button
              variant="contained"
              leftIcon={<Pencil className="h-4 w-4" />}
              asChild={false}
            >
              <Link href={`/tasks/${task.id}/edit`}>Edit</Link>
            </Button>
          }
        />
      </div>

      <div className="grid gap-6 laptop:grid-cols-3">
        <div className="laptop:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-400 leading-relaxed text-neutral-700">
                {task.description || "No description."}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-300">
            <Row label="Status">
              <TaskStatusBadge status={task.status} />
            </Row>

            <Row label="Priority">
              <TaskPriorityBadge priority={task.priority} />
            </Row>

            <Row label="Assignee">{task.assigneeName ?? "Unassigned"}</Row>

            {task.dueDate ? <Row label="Due">{formatDate(task.dueDate)}</Row> : null}

            {task.estimateHours ? (
              <Row label="Estimate">{task.estimateHours}h</Row>
            ) : null}

            {task.tags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 pt-2">
                {task.tags.map((tag) => (
                  <Badge key={tag} variant="outline" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : null}
          </CardContent>
        </Card>
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
