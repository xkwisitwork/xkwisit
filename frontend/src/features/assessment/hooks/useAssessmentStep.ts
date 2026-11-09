"use client";

import { useMemo, useState } from "react";

import { growthAssessmentSections } from "@/config/growthDimensions";

export function useAssessmentStep(initialStep = 0) {
  const sections = growthAssessmentSections;
  const [step, setStep] = useState(initialStep);

  const current = sections[step];
  const total = sections.length;

  const totalQuestions = useMemo(
    () => sections.reduce((sum, s) => sum + s.questions.length, 0),
    [sections],
  );

  const next = () => setStep((s) => Math.min(total - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));
  const goTo = (index: number) => setStep(Math.min(total - 1, Math.max(0, index)));

  /**
   * Progress from answered questions - never 100% just by landing on the last step.
   */
  function progressForAnswers(
    answers: Record<string, string | number | boolean | undefined | null>,
  ) {
    if (totalQuestions <= 0) return 0;
    let answered = 0;
    for (const section of sections) {
      for (const q of section.questions) {
        const v = answers[q.id];
        if (v === undefined || v === null || v === "") continue;
        answered += 1;
      }
    }
    return Math.min(100, Math.round((answered / totalQuestions) * 100));
  }

  return {
    sections,
    step,
    current,
    total,
    totalQuestions,
    progressForAnswers,
    isFirst: step === 0,
    isLast: step >= total - 1,
    next,
    prev,
    goTo,
  };
}
