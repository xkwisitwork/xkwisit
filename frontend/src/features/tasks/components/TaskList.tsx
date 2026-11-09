"use client";

import Link from "next/link";

import { Avatar } from "@/components/ui/Avatar";
import { EmptyState } from "@/components/ui/Skeleton";

import type { Task } from "../types";
import { TaskPriorityBadge } from "./TaskPriorityBadge";
import { TaskStatusBadge } from "./TaskStatusBadge";

export function TaskList({
  tasks,
  emptyMessage = "No tasks match your filters.",
}: {
  tasks: Task[];
  emptyMessage?: string;
}) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-400 bg-neutral-100 p-12 text-center">
        <p className="text-400 text-neutral-600">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-neutral-300 overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100">
      {tasks.map((task) => (
        <li key={task.id}>
          <Link
            href={`/tasks/${task.id}`}
            className="flex items-start gap-4 p-4 transition-colors hover:bg-neutral-200/60"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <p className="text-400 font-medium leading-tight">{task.title}</p>
                <TaskPriorityBadge priority={task.priority} />
              </div>

              {task.projectName ? (
                <p className="mt-1 truncate text-300 text-neutral-600">
                  {task.projectName}
                </p>
              ) : null}

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <TaskStatusBadge status={task.status} />
                {task.dueDate ? (
                  <span className="text-200 text-neutral-600">
                    Due {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                ) : null}
              </div>
            </div>

            {task.assigneeName ? (
              <Avatar
                src={task.assigneeAvatarUrl ?? undefined}
                name={task.assigneeName}
                size="sm"
              />
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  );
}
