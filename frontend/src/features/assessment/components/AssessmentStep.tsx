"use client";

import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils/cn";

import type { AssessmentAnswer } from "../types";

type Question = {
  id: string;
  prompt: string;
  type: "scale" | "boolean" | "choice" | "number" | "text";
  options?: ReadonlyArray<{ label: string; score: number; value?: string }>;
  placeholder?: string;
};

const SCALE_LABELS = ["Weak", "Fair", "OK", "Strong", "Excellent"] as const;

export function AssessmentStep({
  questions,
  answers,
  onChange,
}: {
  questions: readonly Question[];
  answers: Record<string, AssessmentAnswer["value"]>;
  onChange: (questionId: string, value: AssessmentAnswer["value"]) => void;
}) {
  return (
    <div className="space-y-6">
      {questions.map((q) => (
        <div
          key={q.id}
          className="rounded-[1.25rem] border border-white/80 bg-white/90 p-4 shadow-[0_12px_28px_-22px_rgba(22,2,74,0.28)] mobile-sm:p-5"
        >
          <p className="font-display text-[1rem] font-bold leading-snug text-mint-ink mobile-sm:text-[1.05rem]">
            {q.prompt}
          </p>

          {q.type === "boolean" ? (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(
                [
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ] as const
              ).map((opt) => {
                const selected = answers[q.id] === opt.value;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => onChange(q.id, opt.value)}
                    className={cn(
                      "rounded-full border px-4 py-3 text-[0.88rem] font-semibold transition-all",
                      selected
                        ? "border-mint bg-mint text-white shadow-[0_10px_22px_-14px_rgba(59,5,196,0.75)]"
                        : "border-[#E8E4F0] bg-[#FAFAFB] text-neutral-600 hover:border-mint/35 hover:bg-mint-soft/60",
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          ) : null}

          {q.type === "scale" ? (
            <div className="mt-3 grid grid-cols-5 gap-1.5 mobile-sm:gap-2">
              {[1, 2, 3, 4, 5].map((n) => {
                const selected = answers[q.id] === n;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => onChange(q.id, n)}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-full border px-1 py-3 transition-all",
                      selected
                        ? "border-mint bg-mint text-white shadow-[0_10px_22px_-14px_rgba(59,5,196,0.75)]"
                        : "border-[#E8E4F0] bg-[#FAFAFB] text-neutral-600 hover:border-mint/35 hover:bg-mint-soft/60",
                    )}
                  >
                    <span className="font-display text-[1.05rem] font-bold tabular-nums">
                      {n}
                    </span>
                    <span
                      className={cn(
                        "hidden text-[0.62rem] font-medium mobile-lg:block",
                        selected ? "text-white/85" : "text-neutral-500",
                      )}
                    >
                      {SCALE_LABELS[n - 1]}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : null}

          {q.type === "choice" && q.options ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {q.options.map((opt) => {
                const value = opt.value ?? opt.label;
                const selected = answers[q.id] === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => onChange(q.id, value)}
                    className={cn(
                      "rounded-full border px-3.5 py-2.5 text-left text-[0.84rem] font-medium transition-all",
                      selected
                        ? "border-mint bg-mint text-white shadow-[0_10px_22px_-14px_rgba(59,5,196,0.75)]"
                        : "border-[#E8E4F0] bg-[#FAFAFB] text-neutral-700 hover:border-mint/35 hover:bg-mint-soft/60",
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          ) : null}

          {q.type === "text" || q.type === "number" ? (
            <div className="mt-3">
              <Input
                value={answers[q.id] != null ? String(answers[q.id]) : ""}
                onChange={(e) =>
                  onChange(
                    q.id,
                    q.type === "number" ? Number(e.target.value || 0) : e.target.value,
                  )
                }
                type={q.type === "number" ? "number" : "text"}
                placeholder={q.placeholder ?? "Your answer"}
                className="!h-12 !rounded-full !border-[#E8E4F0] !bg-[#FAFAFB] !px-5"
              />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
