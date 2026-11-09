"use client";

import type { CampaignObjective } from "../types";
import { campaignObjectiveLabel } from "../utils/metricsCalculator";

export type CampaignObjectivePickerProps = {
  value: CampaignObjective | null;
  onChange: (value: CampaignObjective) => void;
  disabled?: boolean;
};

const OBJECTIVES: CampaignObjective[] = [
  "LEAD_GENERATION",
  "BRAND_AWARENESS",
  "CONVERSIONS",
  "TRAFFIC",
  "RETENTION",
];

export function CampaignObjectivePicker({
  value,
  onChange,
  disabled = false,
}: CampaignObjectivePickerProps) {
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
              {campaignObjectiveLabel(objective)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
