import type { ProposalTemplate } from "../types";

export const PROPOSAL_TEMPLATES: ProposalTemplate[] = [
  {
    id: "growth-retainer",
    name: "Growth retainer",
    description: "Monthly growth partnership scope.",
    defaultDeliverables: [
      "Strategy & roadmap",
      "Campaign management",
      "Monthly reporting",
    ],
  },
  {
    id: "project-sprint",
    name: "Project sprint",
    description: "Fixed-scope delivery sprint.",
    defaultDeliverables: ["Discovery", "Build", "Handoff"],
  },
  {
    id: "brand-launch",
    name: "Brand launch",
    description: "Identity and launch package.",
    defaultDeliverables: ["Brand system", "Website", "Launch assets"],
  },
];
