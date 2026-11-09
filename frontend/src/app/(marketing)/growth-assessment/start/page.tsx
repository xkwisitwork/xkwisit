import type { Metadata } from "next";

import { AssessmentStartClient } from "@/features/assessment";

export const metadata: Metadata = {
  title: "Start Growth Assessment",
  description:
    "Answer a few questions. Get a growth score and the one thing to fix first.",
};

export default function StartAssessmentPage() {
  return <AssessmentStartClient />;
}
