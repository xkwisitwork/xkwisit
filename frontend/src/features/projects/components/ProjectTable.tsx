"use client";

import Link from "next/link";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { TableSkeleton } from "@/components/ui/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { formatDate } from "@/lib/utils/date";

import type { ProjectListItem } from "../types";
import { ProjectStatusBadge } from "./ProjectStatusBadge";

export type ProjectTableProps = {
  items: ProjectListItem[];
  loading?: boolean;
  emptyState?: React.ReactNode;
};

export function ProjectTable({ items, loading, emptyState }: ProjectTableProps) {
  if (loading) return <TableSkeleton rows={8} columns={6} />;
  if (items.length === 0) return <>{emptyState}</>;

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-400 bg-neutral-100">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-neutral-400 bg-neutral-200/60 hover:bg-neutral-200/60">
            <TableHead className="w-[300px]">Project</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[180px]">Progress</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Timeline</TableHead>
            <TableHead className="text-right">Approvals</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((project) => (
            <TableRow
              key={project.id}
              className="border-b border-neutral-300 last:border-0"
            >
              <TableCell>
                <Link
                  href={`/projects/${project.id}`}
                  className="text-400 font-medium leading-tight hover:text-primary"
                >
                  {project.name}
                </Link>
              </TableCell>

              <TableCell>
                <Link
                  href={`/clients/${project.clientId}`}
                  className="text-400 text-neutral-600 hover:text-primary"
                >
                  {project.clientName}
                </Link>
              </TableCell>

              <TableCell>
                <ProjectStatusBadge status={project.status} />
              </TableCell>

              <TableCell>
                <Progress
                  value={project.progress}
                  size="sm"
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
                <p className="mt-1 text-200 tabular-nums text-neutral-600">
                  {project.tasksDone} / {project.tasksTotal} tasks
                </p>
              </TableCell>

              <TableCell>
                {project.ownerName ? (
                  <div className="flex items-center gap-2">
                    <Avatar name={project.ownerName} size="xs" />
                    <span className="text-400 text-neutral-600">{project.ownerName}</span>
                  </div>
                ) : (
                  <Badge variant="muted" size="sm">
                    Unassigned
                  </Badge>
                )}
              </TableCell>

              <TableCell>
                <span className="text-300 text-neutral-600">
                  {project.startDate && project.endDate
                    ? `${formatDate(project.startDate, "d MMM")} – ${formatDate(project.endDate, "d MMM")}`
                    : "-"}
                </span>
              </TableCell>

              <TableCell className="text-right">
                {project.openApprovalsCount > 0 ? (
                  <Badge variant="warning" size="sm">
                    {project.openApprovalsCount} pending
                  </Badge>
                ) : (
                  <span className="text-300 text-neutral-600"> - </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
