"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { TaskList, useMyTasks } from "@/features/tasks";

export default function MyTasksPage() {
  const { data: tasks = [], isLoading } = useMyTasks();

  return (
    <>
      <PageHeader title="My tasks" description="Everything assigned to you." />

      {isLoading ? (
        <div className="rounded-2xl border border-neutral-400 bg-neutral-100 p-12 text-center">
          <p className="text-400 text-neutral-600">Loading…</p>
        </div>
      ) : (
        <TaskList tasks={tasks} emptyMessage="You have no open tasks." />
      )}
    </>
  );
}
