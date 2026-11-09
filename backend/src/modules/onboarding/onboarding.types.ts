import type { ID, ISODateString } from "../../types/common.types.js";

export type OnboardingStepStatus = "PENDING" | "IN_PROGRESS" | "DONE" | "SKIPPED";

export type OnboardingStep = {
  id: ID;
  key: string;
  label: string;
  status: OnboardingStepStatus;
  completedAt: ISODateString | null;
};

export type OnboardingChecklist = {
  organizationId: ID;
  clientId: ID | null;
  steps: OnboardingStep[];
  progressPercent: number;
  updatedAt: ISODateString;
};
