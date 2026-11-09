"use client";

import Link from "next/link";
import { LayoutGrid, List, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { PageHeader } from "@/components/layout/PageHeader";

import { TaskBoard, TaskList, useBoardTasks } from "@/features/tasks";

export default function TasksPage() {
  const [view, setView] = useState<"list" | "board">("list");
  const { data: tasks = [], isLoading } = useBoardTasks({});

  return (
    <>
      <PageHeader
        title="Tasks"
        description="All tasks across every project."
        actions={
          <Button
            variant="contained"
            leftIcon={<Plus className="h-4 w-4" />}
            asChild={false}
          >
            <Link href="/tasks/new">New task</Link>
          </Button>
        }
      />

      <div className="flex justify-end">
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

      {isLoading ? (
        <div className="rounded-2xl border border-neutral-400 bg-neutral-100 p-12 text-center">
          <p className="text-400 text-neutral-600">Loading tasks…</p>
        </div>
      ) : view === "list" ? (
        <TaskList tasks={tasks} />
      ) : (
        <TaskBoard tasks={tasks} />
      )}
    </>
  );
}
