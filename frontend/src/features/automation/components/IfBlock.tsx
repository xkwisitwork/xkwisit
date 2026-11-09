"use client";

import { Button } from "@/components/ui/Button";

import type { WorkflowCondition } from "../types";
import { ConditionEditor } from "./ConditionEditor";

export function IfBlock({
  conditions,
  onChange,
  onAdd,
}: {
  conditions: WorkflowCondition[];
  onChange: (next: WorkflowCondition[]) => void;
  onAdd: () => void;
}) {
  return (
    <div className="space-y-3 rounded-xl border border-neutral-400 p-4">
      <div className="flex items-center justify-between">
        <p className="text-300 font-medium">If</p>
        <Button variant="outlined" size="sm" onClick={onAdd}>
          Add condition
        </Button>
      </div>
      {conditions.length === 0 ? (
        <p className="text-200 text-neutral-600">No conditions (always run).</p>
      ) : (
        conditions.map((condition, index) => (
          <ConditionEditor
            key={condition.id}
            condition={condition}
            onChange={(next) => {
              const copy = [...conditions];
              copy[index] = next;
              onChange(copy);
            }}
          />
        ))
      )}
    </div>
  );
}
