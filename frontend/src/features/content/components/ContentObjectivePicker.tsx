"use client";

import type { ContentObjective } from "../types";
import { CONTENT_OBJECTIVE_LABELS } from "../utils/contentLabels";

export type ContentObjectivePickerProps = {
  value: ContentObjective | null;
  onChange: (value: ContentObjective) => void;
  disabled?: boolean;
};

const OBJECTIVES = Object.keys(CONTENT_OBJECTIVE_LABELS) as ContentObjective[];

export function ContentObjectivePicker({
  value,
  onChange,
  disabled = false,
}: ContentObjectivePickerProps) {
  return (
    <div className="grid gap-2 tablet:grid-cols-2">
      {OBJECTIVES.map((objective) => {
        const selected = value === objective;
        return (
          <button
            key={objective}
            type="button"
            disabled={disabled}
            onClick={() => onChange(objective)}
            className={`rounded-xl border px-4 py-3 text-left transition ${
              selected
                ? "border-primary bg-primary/5 text-primary"
                : "border-neutral-400 bg-neutral-100 text-neutral-700 hover:border-neutral-500"
            } disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <span className="text-400 font-medium">
              {CONTENT_OBJECTIVE_LABELS[objective]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
