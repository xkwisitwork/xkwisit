"use client";

import type { TriggerType } from "../types";
import { TriggerPicker } from "./TriggerPicker";

export function WhenBlock({
  triggerType,
  onChange,
}: {
  triggerType: TriggerType;
  onChange: (value: TriggerType) => void;
}) {
  return (
    <div className="space-y-2 rounded-xl border border-neutral-400 p-4">
      <p className="text-300 font-medium">When</p>
      <TriggerPicker value={triggerType} onChange={onChange} />
    </div>
  );
}
