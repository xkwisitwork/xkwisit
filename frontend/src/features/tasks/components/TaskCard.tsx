"use client";

import Link from "next/link";
import { Calendar, MessageSquare } from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { formatShortRelative } from "@/lib/utils/date";

import type { Task } from "../types";
import { TaskPriorityBadge } from "./TaskPriorityBadge";
import { TaskStatusBadge } from "./TaskStatusBadge";

export function TaskCard({ task }: { task: Task }) {
  return (
    <Link
      href={`/tasks/${task.id}`}
      className="block rounded-xl border border-neutral-400 bg-neutral-100 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-400 font-medium leading-tight">{task.title}</p>
        <TaskPriorityBadge priority={task.priority} />
      </div>

      {task.projectName ? (
        <p className="mt-2 truncate text-300 text-neutral-600">{task.projectName}</p>
      ) : null}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <TaskStatusBadge status={task.status} />

        {task.dueDate ? (
          <span className="inline-flex items-center gap-1 text-200 text-neutral-600">
            <Calendar className="h-3 w-3" />
            {formatShortRelative(task.dueDate)}
          </span>
        ) : null}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-neutral-300 pt-3">
        {task.assigneeName ? (
          <div className="flex items-center gap-2">
            <Avatar
              src={task.assigneeAvatarUrl ?? undefined}
              name={task.assigneeName}
              size="xs"
            />
            <span className="truncate text-200 text-neutral-600">
              {task.assigneeName}
            </span>
          </div>
        ) : (
          <span className="text-200 text-neutral-600">Unassigned</span>
        )}

        {task.tags.length > 0 ? (
          <span className="text-200 text-neutral-600">
            {task.tags.length} tag{task.tags.length === 1 ? "" : "s"}
          </span>
        ) : null}
      </div>
    </Link>
  );
}
