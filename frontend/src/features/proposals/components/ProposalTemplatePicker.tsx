"use client";

import type { ProposalTemplate } from "../types";

export function ProposalTemplatePicker({
  templates,
  selectedId,
  onSelect,
}: {
  templates: ProposalTemplate[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <div className="grid gap-3 tablet:grid-cols-3">
      {templates.map((template) => (
        <button
          key={template.id}
          type="button"
          onClick={() => onSelect?.(template.id)}
          className={`rounded-2xl border p-4 text-left ${
            selectedId === template.id
              ? "border-primary bg-primary/5"
              : "border-neutral-400 hover:border-primary/40"
          }`}
        >
          <p className="text-400 font-medium">{template.name}</p>
          <p className="mt-1 text-200 text-neutral-600">{template.description}</p>
        </button>
      ))}
    </div>
  );
}
