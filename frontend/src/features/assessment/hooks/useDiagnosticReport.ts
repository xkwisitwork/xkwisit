"use client";

import { useQuery } from "@tanstack/react-query";

import { getAssessmentReport } from "../api/assessment.api";
import { assessmentKeys } from "../api/queryKeys";

export function useDiagnosticReport(token: string, enabled = true) {
  return useQuery({
    queryKey: assessmentKeys.report(token),
    queryFn: ({ signal }) => getAssessmentReport(token, signal),
    enabled: enabled && Boolean(token),
  });
}
