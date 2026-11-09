"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

import { TRIGGER_OPTIONS } from "../engine/triggers";
import type { TriggerType } from "../types";

export function TriggerPicker({
  value,
  onChange,
}: {
  value: TriggerType;
  onChange: (value: TriggerType) => void;
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as TriggerType)}>
      <SelectTrigger>
        <SelectValue placeholder="Trigger" />
      </SelectTrigger>
      <SelectContent>
        {TRIGGER_OPTIONS.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
