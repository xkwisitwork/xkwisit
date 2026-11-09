"use client";

import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/Button";

export type DataTableToolbarProps = {
  className?: string;
  actions?: Array<{ id: string; label: string; onClick?: () => void }>;
};

export function DataTableToolbar({
  className,
  actions = [
    { id: "save", label: "Save" },
    { id: "preview", label: "Preview" },
    { id: "publish", label: "Publish" },
  ],
}: DataTableToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-2xl border border-neutral-400 bg-neutral-100 p-2",
        className,
      )}
    >
      {actions.map((action, index) => (
        <Button
          key={action.id}
          type="button"
          size="sm"
          variant={index === actions.length - 1 ? "contained" : "outlined"}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
