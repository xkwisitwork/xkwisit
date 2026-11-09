import type { Metadata } from "next";

import { AssessmentReportClient } from "@/features/assessment";

export const metadata: Metadata = {
  title: "Your Growth X-Ray",
  description: "See where growth is leaking - and what to fix first.",
};

export default function AssessmentReportPage({ params }: { params: { token: string } }) {
  return <AssessmentReportClient token={params.token} />;
}
