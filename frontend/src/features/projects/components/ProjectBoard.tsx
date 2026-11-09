"use client";

import Link from "next/link";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { formatDate } from "@/lib/utils/date";

import type { ProjectListItem } from "../types";
import { projectStatusLabel } from "../utils/projectHealth";
import type { ProjectStatus } from "@/lib/constants/statuses";

const COLUMNS: { status: ProjectStatus; label: string }[] = [
  { status: "ON_TRACK", label: "On track" },
  { status: "AT_RISK", label: "At risk" },
  { status: "BLOCKED", label: "Blocked" },
  { status: "OVERDUE", label: "Overdue" },
  { status: "COMPLETED", label: "Completed" },
];

export function ProjectBoard({ items }: { items: ProjectListItem[] }) {
  return (
    <div className="grid gap-4 laptop:grid-cols-5">
      {COLUMNS.map((column) => {
        const columnItems = items.filter((p) => p.status === column.status);

        return (
          <div key={column.status} className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-300 font-semibold uppercase tracking-wider text-neutral-600">
                {column.label}
              </p>
              <Badge variant="muted" size="sm">
                {columnItems.length}
              </Badge>
            </div>

            <div className="space-y-3">
              {columnItems.length === 0 ? (
                <p className="rounded-xl border border-dashed border-neutral-400 px-3 py-6 text-center text-200 text-neutral-600">
                  Empty
                </p>
              ) : (
                columnItems.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="block rounded-xl border border-neutral-400 bg-neutral-100 p-3 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <p className="text-400 font-medium leading-tight">{project.name}</p>

                    <p className="mt-1 truncate text-300 text-neutral-600">
                      {project.clientName}
                    </p>

                    <Progress
                      value={project.progress}
                      size="sm"
                      className="mt-3"
                      tone={
                        project.status === "ON_TRACK"
                          ? "primary"
                          : project.status === "AT_RISK"
                            ? "warning"
                            : project.status === "COMPLETED"
                              ? "success"
                              : "destructive"
                      }
                    />

                    <div className="mt-3 flex items-center justify-between gap-2">
                      {project.ownerName ? (
                        <div className="flex items-center gap-1.5">
                          <Avatar name={project.ownerName} size="xs" />
                          <span className="truncate text-200 text-neutral-600">
                            {project.ownerName.split(" ")[0]}
                          </span>
                        </div>
                      ) : null}

                      {project.endDate ? (
                        <span className="shrink-0 text-200 text-neutral-600">
                          {formatDate(project.endDate, "d MMM")}
                        </span>
                      ) : null}
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
