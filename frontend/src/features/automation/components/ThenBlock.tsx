"use client";

import type { ActionType, WorkflowAction } from "../types";
import { ActionPicker } from "./ActionPicker";
import { actionLabel } from "../engine/actions";

export function ThenBlock({
  actions,
  onAdd,
}: {
  actions: WorkflowAction[];
  onAdd: (type: ActionType) => void;
}) {
  return (
    <div className="space-y-3 rounded-xl border border-neutral-400 p-4">
      <p className="text-300 font-medium">Then</p>
      {actions.length === 0 ? (
        <p className="text-200 text-neutral-600">No actions yet.</p>
      ) : (
        <ul className="space-y-2">
          {actions.map((action) => (
            <li key={action.id} className="text-300">
              {actionLabel(action.type)}
            </li>
          ))}
        </ul>
      )}
      <ActionPicker onPick={onAdd} />
    </div>
  );
}
