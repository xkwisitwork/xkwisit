"use client";

import { Input } from "@/components/ui/Input";

import type { WorkflowCondition } from "../types";

export function ConditionEditor({
  condition,
  onChange,
}: {
  condition: WorkflowCondition;
  onChange: (next: WorkflowCondition) => void;
}) {
  return (
    <div className="grid gap-2 tablet:grid-cols-3">
      <Input
        value={condition.field}
        onChange={(e) => onChange({ ...condition, field: e.target.value })}
        placeholder="Field"
      />
      <Input
        value={condition.operator}
        onChange={(e) =>
          onChange({
            ...condition,
            operator: e.target.value as WorkflowCondition["operator"],
          })
        }
        placeholder="Operator"
      />
      <Input
        value={condition.value}
        onChange={(e) => onChange({ ...condition, value: e.target.value })}
        placeholder="Value"
      />
    </div>
  );
}
