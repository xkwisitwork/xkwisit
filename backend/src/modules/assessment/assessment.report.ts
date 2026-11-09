import type { AssessmentReport } from "../../types/assessment.types.js";

export function toAssessmentReportPayload(report: AssessmentReport) {
  return {
    ...report,
    generatedAt: new Date().toISOString(),
  };
}
