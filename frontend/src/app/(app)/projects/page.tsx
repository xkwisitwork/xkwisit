"use client";

import Link from "next/link";
import { LayoutGrid, List, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { PageHeader } from "@/components/layout/PageHeader";

import {
  ProjectBoard,
  ProjectEmptyState,
  ProjectFilters,
  ProjectPagination,
  ProjectStatsStrip,
  ProjectTable,
  useProjectFilters,
  useProjects,
} from "@/features/projects";

export default function ProjectsPage() {
  const [view, setView] = useState<"list" | "board">("list");

  const {
    filters,
    page,
    pageSize,
    activeCount,
    updateFilter,
    setPage,
    setPageSize,
    reset,
  } = useProjectFilters();

  const { data, isLoading } = useProjects({ filters, page, pageSize });

  return (
    <>
      <PageHeader
        title="Projects"
        description="Every engagement in flight."
        actions={
          <Button
            variant="contained"
            leftIcon={<Plus className="h-4 w-4" />}
            asChild={false}
          >
            <Link href="/projects/new">New project</Link>
          </Button>
        }
      />

      <ProjectStatsStrip />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <ProjectFilters
          filters={filters}
          activeCount={activeCount}
          onUpdate={updateFilter}
          onReset={reset}
        />

        <Tabs value={view} onValueChange={(v) => setView(v as "list" | "board")}>
          <TabsList variant="pill">
            <TabsTrigger value="list" icon={<List className="h-3.5 w-3.5" />}>
              List
            </TabsTrigger>
            <TabsTrigger value="board" icon={<LayoutGrid className="h-3.5 w-3.5" />}>
              Board
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {view === "list" ? (
        <>
          <ProjectTable
            items={data?.items ?? []}
            loading={isLoading}
            emptyState={<ProjectEmptyState hasFilters={activeCount > 0} />}
          />

          {data?.meta && data.meta.total > 0 ? (
            <ProjectPagination
              meta={data.meta}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          ) : null}
        </>
      ) : (
        <ProjectBoard items={data?.items ?? []} />
      )}
    </>
  );
}
