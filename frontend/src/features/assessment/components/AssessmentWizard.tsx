"use client";

import { useMemo, useState, type ComponentType } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  CircleDot,
  Clock3,
  Handshake,
  ListChecks,
  Megaphone,
  Palette,
  Settings2,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

import { useAssessmentStep } from "../hooks/useAssessmentStep";
import type { AssessmentAnswer } from "../types";
import {
  buildLocalReport,
  extractBusinessName,
  saveLocalReport,
} from "../utils/reportBuilder";
import { AssessmentStep } from "./AssessmentStep";

const bounce = { type: "spring" as const, stiffness: 380, damping: 22, mass: 0.7 };

const sectionIcons: Record<string, ComponentType<{ className?: string }>> = {
  business: Building2,
  demand: Megaphone,
  sales: Handshake,
  brand: Palette,
  ops: Settings2,
};

const causeTones = [
  {
    label: "Primary focus",
    chip: "bg-[#FDE8E8] text-[#B42318]",
    icon: "bg-[#FDE8E8] text-[#B42318]",
    body: "bg-[#FFF5F5]",
  },
  {
    label: "Contributing",
    chip: "bg-[#FCEFE4] text-[#9A3412]",
    icon: "bg-[#FCEFE4] text-[#9A3412]",
    body: "bg-[#FFF8F1]",
  },
  {
    label: "Trigger",
    chip: "bg-[#FEF6D8] text-[#92400E]",
    icon: "bg-[#FEF6D8] text-[#92400E]",
    body: "bg-[#FFFBEB]",
  },
  {
    label: "Result",
    chip: "bg-[#EEF0F3] text-[#374151]",
    icon: "bg-[#EEF0F3] text-[#374151]",
    body: "bg-[#F7F8FA]",
  },
] as const;

function makeToken() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  }
  return `xray${Date.now().toString(36)}`;
}

function isAnswered(value: AssessmentAnswer["value"] | undefined | null) {
  return value !== undefined && value !== null && value !== "";
}

/**
 * Incident-dashboard style assessment wizard — same questions, new shell.
 */
export function AssessmentWizard({
  token: tokenProp,
  onComplete,
}: {
  token?: string;
  onComplete?: (token: string) => void;
}) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const stepper = useAssessmentStep();
  const [token] = useState(() => tokenProp ?? makeToken());
  const [answers, setAnswers] = useState<Record<string, AssessmentAnswer["value"]>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setAnswer = (questionId: string, value: AssessmentAnswer["value"]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setError(null);
  };

  const progress = stepper.progressForAnswers(answers);

  const answeredCount = useMemo(() => {
    let n = 0;
    for (const section of stepper.sections) {
      for (const q of section.questions) {
        if (isAnswered(answers[q.id])) n += 1;
      }
    }
    return n;
  }, [answers, stepper.sections]);

  const currentAnswered = useMemo(() => {
    if (!stepper.current) return false;
    return stepper.current.questions.every((q) => isAnswered(answers[q.id]));
  }, [answers, stepper.current]);

  const allAnswered = useMemo(() => {
    return stepper.sections.every((section) =>
      section.questions.every((q) => isAnswered(answers[q.id])),
    );
  }, [answers, stepper.sections]);

  const sectionDoneCount = useMemo(() => {
    return stepper.sections.filter((section) =>
      section.questions.every((q) => isAnswered(answers[q.id])),
    ).length;
  }, [answers, stepper.sections]);

  const onSubmit = () => {
    if (!allAnswered) {
      setError("Answer every question before viewing your score.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload: AssessmentAnswer[] = Object.entries(answers).map(
        ([questionId, value]) => ({ questionId, value }),
      );
      const report = buildLocalReport({
        token,
        businessName: extractBusinessName(payload),
        answers: payload,
      });
      saveLocalReport(report);
      onComplete?.(token);
      router.push(`/growth-assessment/report/${encodeURIComponent(token)}`);
    } catch {
      setError("Could not save your score. Please try again.");
      setSubmitting(false);
    }
  };

  if (!stepper.current) return null;

  const CurrentIcon = sectionIcons[stepper.current.id] ?? ListChecks;
  const tone = causeTones[stepper.step % causeTones.length]!;

  const metrics = [
    { label: "Section", value: `${stepper.step + 1}/${stepper.total}` },
    { label: "Answered", value: `${answeredCount}` },
    { label: "Progress", value: `${progress}%` },
    { label: "Done rooms", value: `${sectionDoneCount}` },
  ] as const;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={bounce}
        className="overflow-hidden rounded-[1.75rem] border border-[#E8E4F0] bg-white shadow-[0_30px_70px_-42px_rgba(22,2,74,0.35)]"
      >
        {/* Segmented section nav */}
        <div className="border-b border-[#F0ECF6] px-4 py-3 mobile-sm:px-5">
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {stepper.sections.map((section, i) => {
              const done = section.questions.every((q) =>
                isAnswered(answers[q.id]),
              );
              const active = i === stepper.step;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    if (i <= stepper.step || done) stepper.goTo(i);
                  }}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.78rem] font-semibold transition",
                    active
                      ? "bg-mint text-white shadow-[0_10px_22px_-14px_rgba(59,5,196,0.8)]"
                      : done
                        ? "bg-mint-soft text-mint-ink"
                        : "bg-[#F4F2F8] text-neutral-600 hover:bg-[#EEEAF6]",
                  )}
                >
                  {done && !active ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : null}
                  {section.title}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-7 p-5 mobile-sm:p-7 tablet:p-8">
          {/* Status + title */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F8EF] px-3 py-1 text-[0.72rem] font-semibold text-[#067647]">
                  <CircleDot className="h-3 w-3" />
                  In progress · watching
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F2F8] px-3 py-1 text-[0.72rem] font-semibold text-neutral-600">
                  <Clock3 className="h-3 w-3" />
                  ~10 min total
                </span>
              </div>
              <div className="mt-4 flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                    tone.icon,
                  )}
                >
                  <CurrentIcon className="h-5 w-5" />
                </span>
                <div>
                  <h1 className="font-display text-[clamp(1.45rem,3.2vw,2rem)] font-bold tracking-tight text-mint-ink">
                    {stepper.current.title}
                  </h1>
                  <p className="mt-1.5 max-w-2xl text-[0.92rem] leading-relaxed text-neutral-600">
                    {stepper.current.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics strip */}
          <div className="grid grid-cols-2 gap-3 rounded-[1.35rem] border border-[#F0ECF6] bg-[#FAFAFB] p-3 tablet:grid-cols-4 tablet:gap-0 tablet:divide-x tablet:divide-[#E8E4F0] tablet:p-0 tablet:py-4">
            {metrics.map((m) => (
              <div key={m.label} className="px-3 tablet:px-5">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  {m.label}
                </p>
                <p className="mt-1 font-display text-[1.45rem] font-bold tabular-nums tracking-tight text-mint-ink">
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          {/* Path pills */}
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Assessment path
            </p>
            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              {stepper.sections.map((section, i) => {
                const done = section.questions.every((q) =>
                  isAnswered(answers[q.id]),
                );
                const active = i === stepper.step;
                return (
                  <div key={section.id} className="inline-flex items-center gap-1.5">
                    {i > 0 ? (
                      <ArrowRight className="h-3 w-3 text-neutral-400" aria-hidden />
                    ) : null}
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-1 text-[0.72rem] font-semibold",
                        active
                          ? "bg-[#FFF1E0] text-[#C2410C]"
                          : done
                            ? "bg-[#E8F8EF] text-[#067647]"
                            : "bg-[#F4F2F8] text-neutral-600",
                      )}
                    >
                      {section.title}
                      {active ? " · now" : done ? " · done" : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Root-cause style framing + questions */}
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex rounded-md px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em]",
                  tone.chip,
                )}
              >
                {tone.label}
              </span>
              <p className="text-[0.85rem] font-semibold text-mint-ink">
                Answer this room honestly
              </p>
            </div>
            <div
              className={cn(
                "rounded-[1.35rem] border border-transparent p-4 mobile-sm:p-5",
                tone.body,
              )}
            >
              <AssessmentStep
                questions={stepper.current.questions}
                answers={answers}
                onChange={setAnswer}
              />
            </div>
          </div>

          {error ? (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-[0.88rem] text-red-700">
              {error}
            </p>
          ) : null}

          <div className="flex items-center justify-between gap-3 border-t border-[#F0ECF6] pt-5">
            <Button
              variant="outlined"
              disabled={stepper.isFirst || submitting}
              onClick={stepper.prev}
              leftIcon={<ArrowLeft className="h-4 w-4" />}
              className="!rounded-full"
            >
              Back
            </Button>
            {stepper.isLast ? (
              <Button
                type="button"
                variant="contained"
                loading={submitting}
                disabled={!currentAnswered || submitting}
                onClick={onSubmit}
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="!rounded-full border-0 !bg-mint !text-white hover:!bg-mint-deep"
              >
                See my score
              </Button>
            ) : (
              <Button
                type="button"
                variant="contained"
                disabled={!currentAnswered}
                onClick={stepper.next}
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="!rounded-full border-0 !bg-mint !text-white hover:!bg-mint-deep"
              >
                Continue
              </Button>
            )}
          </div>

          {stepper.isLast && currentAnswered ? (
            <p className="text-center text-[0.78rem] text-neutral-600">
              Last room — tap{" "}
              <span className="font-semibold text-mint-ink">See my score</span> to open
              your reading.
            </p>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
