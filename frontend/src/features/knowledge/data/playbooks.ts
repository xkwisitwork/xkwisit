import type { Playbook } from "../types";

export const SAMPLE_PLAYBOOKS: Playbook[] = [
  {
    id: "pb-lead-gen",
    title: "Lead generation sprint",
    summary: "2-week outbound + content push.",
    audience: "Growth team",
    steps: ["Audit channels", "Launch offers", "Review pipeline"],
    updatedAt: new Date().toISOString(),
  },
];
