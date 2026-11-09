"use client";

import {
  TASK_STATUSES,
  TASK_STATUS_LABELS,
  type TaskStatus,
} from "@/lib/constants/statuses";
import type { Task } from "../types";
import { TaskCard } from "./TaskCard";

const COLUMNS = Object.values(TASK_STATUSES) as TaskStatus[];

export function TaskBoard({ tasks }: { tasks: Task[] }) {
  return (
    <div className="grid gap-4 laptop:grid-cols-5">
      {COLUMNS.map((status) => {
        const columnTasks = tasks.filter((t) => t.status === status);

        return (
          <div key={status} className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-300 font-semibold uppercase tracking-wider text-neutral-600">
                {TASK_STATUS_LABELS[status]}
              </p>
              <span className="rounded-full bg-neutral-300 px-2 py-0.5 text-200 font-semibold">
                {columnTasks.length}
              </span>
            </div>

            <div className="space-y-3">
              {columnTasks.length === 0 ? (
                <p className="rounded-xl border border-dashed border-neutral-400 px-3 py-6 text-center text-200 text-neutral-600">
                  Empty
                </p>
              ) : (
                columnTasks.map((task) => <TaskCard key={task.id} task={task} />)
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
