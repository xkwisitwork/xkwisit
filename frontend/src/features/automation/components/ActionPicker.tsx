"use client";

import { Button } from "@/components/ui/Button";

import { ACTION_OPTIONS } from "../engine/actions";
import type { ActionType } from "../types";

export function ActionPicker({ onPick }: { onPick: (type: ActionType) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {ACTION_OPTIONS.map((opt) => (
        <Button
          key={opt.value}
          variant="outlined"
          size="sm"
          onClick={() => onPick(opt.value)}
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
}
