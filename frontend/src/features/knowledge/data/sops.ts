import type { SopListItem } from "../types";

export const SAMPLE_SOPS: SopListItem[] = [
  {
    id: "sop-onboarding",
    title: "Client onboarding",
    summary: "Kickoff checklist for new retainers.",
    status: "PUBLISHED",
    ownerName: "Ops",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sop-reporting",
    title: "Monthly reporting",
    summary: "Assemble and QA the monthly pack.",
    status: "PUBLISHED",
    ownerName: "Delivery",
    updatedAt: new Date().toISOString(),
  },
];
