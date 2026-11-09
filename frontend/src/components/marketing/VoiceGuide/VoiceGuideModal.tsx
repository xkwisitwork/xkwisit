"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { cn } from "@/lib/utils/cn";

import { useVoiceGuide, type VoiceGuideMessage, type VoiceGuideStatus } from "./useVoiceGuide";
import { VoiceWaveform } from "./VoiceWaveform";

export type VoiceGuideModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Start listening as soon as the modal opens (after mic was requested on click). */
  autoListen?: boolean;
};

type Exchange = {
  id: string;
  user?: VoiceGuideMessage;
  assistant?: VoiceGuideMessage;
};

const EMAIL_RE = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

const SUGGESTIONS = [
  "What is this website about?",
  "How much is CRM?",
  "Do you build mobile apps?",
] as const;

function statusLabel(
  status: VoiceGuideStatus,
  interim: string,
  micSupported: boolean,
) {
  switch (status) {
    case "requesting":
      return "Requesting mic…";
    case "listening":
      return interim ? "Hearing you…" : "Listening — speak now";
    case "heard":
      return "Got it — wrapping up…";
    case "thinking":
      return "Thinking…";
    case "speaking":
      return "Speaking…";
    case "silence":
      return "I didn’t catch that — try again";
    default:
      return micSupported
        ? "Tap the mic · Abeo · male Nigerian English"
        : "Mic unavailable here · type instead";
  }
}

function statusTone(status: VoiceGuideStatus): "idle" | "live" | "busy" | "warn" {
  if (status === "listening" || status === "speaking" || status === "heard") return "live";
  if (status === "thinking" || status === "requesting") return "busy";
  if (status === "silence") return "warn";
  return "idle";
}

/** Pair chat into compact pages: one user + one assistant turn each. */
function buildExchanges(messages: VoiceGuideMessage[]): Exchange[] {
  const pages: Exchange[] = [];
  let i = 0;
  while (i < messages.length) {
    const current = messages[i]!;
    if (current.role === "user") {
      const next = messages[i + 1];
      if (next?.role === "assistant") {
        pages.push({ id: current.id, user: current, assistant: next });
        i += 2;
      } else {
        pages.push({ id: current.id, user: current });
        i += 1;
      }
      continue;
    }
    pages.push({ id: current.id, assistant: current });
    i += 1;
  }
  return pages;
}

/** Split a spoken answer into short readable beats (paragraphs). */
function answerParagraphs(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  if (trimmed.includes("\n")) {
    return trimmed
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
  }

  const parts = trimmed.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [trimmed];
  const paras: string[] = [];
  let buf = "";

  for (const part of parts) {
    const sentence = part.trim();
    if (!sentence) continue;
    const next = buf ? `${buf} ${sentence}` : sentence;
    if (buf && next.length > 110) {
      paras.push(buf);
      buf = sentence;
    } else {
      buf = next;
    }
  }
  if (buf) paras.push(buf);
  return paras;
}

/** Inline email addresses as mailto links. */
function withEmailLinks(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(EMAIL_RE.source, "g");

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const email = match[1]!;
    nodes.push(
      <a
        key={`${email}-${match.index}`}
        href={`mailto:${email}`}
        className="font-semibold text-mint underline decoration-mint/25 underline-offset-[3px] transition-colors hover:decoration-mint"
      >
        {email}
      </a>,
    );
    last = match.index + match[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes.length ? nodes : [text];
}

function AnswerBody({ text }: { text: string }) {
  const paragraphs = answerParagraphs(text);

  return (
    <div className="space-y-3.5">
      {paragraphs.map((para, i) => (
        <p
          key={`${i}-${para.slice(0, 24)}`}
          className="text-[0.95rem] leading-[1.7] tracking-[-0.015em] text-[#16024A]"
        >
          {withEmailLinks(para)}
        </p>
      ))}
    </div>
  );
}

export function VoiceGuideModal({
  open,
  onOpenChange,
  autoListen = false,
}: VoiceGuideModalProps) {
  const reduce = useReducedMotion();
  const {
    messages,
    draft,
    setDraft,
    interim,
    listening,
    speaking,
    muted,
    busy,
    error,
    level,
    status,
    micSupported,
    getBars,
    ask,
    toggleListening,
    toggleMute,
  } = useVoiceGuide(open, autoListen);

  const exchanges = useMemo(() => buildExchanges(messages), [messages]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!exchanges.length) {
      setPage(0);
      return;
    }
    setPage(exchanges.length - 1);
  }, [exchanges.length]);

  useEffect(() => {
    if (!open) setPage(0);
  }, [open]);

  const voiceActive = listening && !busy;
  const total = exchanges.length;
  const safePage = total === 0 ? 0 : Math.min(page, total - 1);
  const current = total > 0 ? exchanges[safePage] : null;
  const tone = statusTone(status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        size="md"
        hideCloseButton
        className={cn(
          "max-h-[min(84vh,38rem)] overflow-hidden border-white/70 bg-transparent p-0",
          "shadow-none tablet:rounded-[2rem]",
          "flex flex-col",
        )}
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "relative flex min-h-0 flex-1 flex-col overflow-hidden",
            "rounded-[1.75rem] tablet:rounded-[2rem]",
            "border border-white/80 bg-white/90 backdrop-blur-2xl",
            "shadow-[0_40px_100px_-48px_rgba(22,2,74,0.55),0_18px_40px_-28px_rgba(59,5,196,0.28)]",
          )}
        >
          {/* Soft brand atmosphere */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_0%,rgba(59,5,196,0.14),transparent_55%),radial-gradient(90%_70%_at_100%_0%,rgba(252,63,227,0.08),transparent_50%),linear-gradient(180deg,#FBF9FF_0%,#FFFFFF_42%,#F7F5FC_100%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-mint/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-[#FC3FE3]/10 blur-3xl"
          />

          <DialogHeader className="relative mb-0 shrink-0 px-5 pb-1 pt-5 tablet:px-7 tablet:pt-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 space-y-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <p className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-mint">
                    Voice guide
                  </p>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.68rem] font-semibold tracking-wide",
                      tone === "live" && "bg-mint text-white",
                      tone === "busy" && "bg-[#16024A] text-white",
                      tone === "warn" && "bg-amber-100 text-amber-800",
                      tone === "idle" && "bg-white/80 text-[#5C5478] ring-1 ring-[#ECEAF2]",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        tone === "live" && "animate-pulse bg-white",
                        tone === "busy" && "animate-pulse bg-mint",
                        tone === "warn" && "bg-amber-500",
                        tone === "idle" && "bg-[#C8C2D8]",
                      )}
                      aria-hidden
                    />
                    {tone === "live"
                      ? listening
                        ? "Live"
                        : "Speaking"
                      : tone === "busy"
                        ? "Working"
                        : tone === "warn"
                          ? "Retry"
                          : "Ready"}
                  </span>
                </div>
                <div>
                  <DialogTitle className="font-display text-[1.45rem] font-bold leading-none tracking-tight text-[#16024A]">
                    Ask Xkwisit
                  </DialogTitle>
                  <DialogDescription className="mt-2 max-w-[32ch] text-[0.88rem] leading-relaxed text-[#6B6484]">
                    Short answers about services, pricing, free checks, and booking.
                  </DialogDescription>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close Ask Xkwisit"
                onClick={() => onOpenChange(false)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/80 text-[#5C5478] shadow-[0_8px_24px_-16px_rgba(22,2,74,0.35)] ring-1 ring-[#ECEAF2] transition-colors hover:bg-mint-soft hover:text-mint"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </DialogHeader>

          <div className="relative flex min-h-[11.5rem] flex-1 flex-col px-5 py-4 tablet:px-7 tablet:py-5">
            {total === 0 && !interim ? (
              <div className="rounded-[1.4rem] bg-white/75 p-4 shadow-[0_16px_40px_-30px_rgba(22,2,74,0.35)] ring-1 ring-white/90 backdrop-blur-sm tablet:p-5">
                <p className="font-display text-[0.95rem] font-semibold text-[#16024A]">
                  Try asking
                </p>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      disabled={busy}
                      onClick={() => void ask(suggestion)}
                      className="rounded-full bg-[#F4F1FA] px-3.5 py-2 text-left text-[0.8rem] font-medium leading-snug text-[#3D3658] transition-colors hover:bg-mint-soft hover:text-mint disabled:opacity-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {current ? (
              <div className="flex min-h-0 flex-1 flex-col gap-3.5 overflow-y-auto pr-0.5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-3.5"
                  >
                    {current.user ? (
                      <div className="ml-auto max-w-[88%] rounded-[1.25rem] rounded-br-md bg-gradient-to-br from-mint to-[#2A0494] px-4 py-3 text-[0.92rem] leading-relaxed text-white shadow-[0_14px_36px_-18px_rgba(59,5,196,0.65)]">
                        {current.user.text}
                      </div>
                    ) : null}
                    {current.assistant ? (
                      <div className="max-w-[98%] rounded-[1.35rem] rounded-bl-md bg-white/90 px-4 py-4 shadow-[0_18px_44px_-28px_rgba(22,2,74,0.35)] ring-1 ring-[#ECEAF2]/90">
                        <p className="mb-3 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#9A93AE]">
                          Answer
                        </p>
                        <AnswerBody text={current.assistant.text} />
                        {current.assistant.cta ? (
                          <Link
                            href={current.assistant.cta.href}
                            onClick={() => onOpenChange(false)}
                            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#16024A] px-3.5 py-2 text-[0.8rem] font-semibold text-white transition-transform hover:scale-[1.02]"
                          >
                            {current.assistant.cta.label}
                            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                          </Link>
                        ) : null}
                      </div>
                    ) : busy ? (
                      <div className="inline-flex items-center gap-2.5 rounded-[1.2rem] bg-white/90 px-4 py-3 text-[0.86rem] text-[#8B849E] shadow-[0_12px_28px_-22px_rgba(22,2,74,0.35)] ring-1 ring-[#ECEAF2]">
                        <Loader2 className="h-4 w-4 animate-spin text-mint" />
                        Thinking…
                      </div>
                    ) : null}
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : null}

            {interim ? (
              <p
                className="mt-3 rounded-[1.25rem] bg-mint-soft/80 px-4 py-3.5 text-[0.92rem] leading-relaxed text-mint shadow-[0_12px_28px_-22px_rgba(59,5,196,0.35)]"
                aria-live="polite"
              >
                <span className="mb-1.5 block text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-mint/70">
                  Hearing you
                </span>
                “{interim}”
              </p>
            ) : null}

            {error ? (
              <p className="mt-3 rounded-[1.2rem] bg-red-50 px-4 py-3 text-[0.84rem] leading-relaxed text-red-700">
                {error}
              </p>
            ) : null}

            {total > 1 ? (
              <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                <button
                  type="button"
                  aria-label="Previous answer"
                  disabled={safePage <= 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  className="inline-flex h-9 items-center gap-1 rounded-full bg-white/90 px-3.5 text-[0.78rem] font-semibold text-[#5C5478] shadow-[0_8px_20px_-16px_rgba(22,2,74,0.4)] ring-1 ring-[#ECEAF2] disabled:opacity-35"
                >
                  <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
                  Prev
                </button>
                <p className="text-[0.75rem] font-medium tabular-nums text-[#9A93AE]">
                  {safePage + 1} / {total}
                </p>
                <button
                  type="button"
                  aria-label="Next answer"
                  disabled={safePage >= total - 1}
                  onClick={() => setPage((p) => Math.min(total - 1, p + 1))}
                  className="inline-flex h-9 items-center gap-1 rounded-full bg-white/90 px-3.5 text-[0.78rem] font-semibold text-[#5C5478] shadow-[0_8px_20px_-16px_rgba(22,2,74,0.4)] ring-1 ring-[#ECEAF2] disabled:opacity-35"
                >
                  Next
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                </button>
              </div>
            ) : null}
          </div>

          <div className="relative shrink-0 px-5 pb-5 pt-1 tablet:px-7 tablet:pb-6">
            <div className="rounded-[1.5rem] bg-white/85 p-3.5 shadow-[0_20px_50px_-34px_rgba(22,2,74,0.45)] ring-1 ring-[#ECEAF2]/90 backdrop-blur-sm tablet:p-4">
              <VoiceWaveform
                active={voiceActive}
                getBars={getBars}
                level={level}
                className={cn(
                  "mb-4 h-12 border-0 bg-[#F7F5FC] px-3",
                  voiceActive && level > 0.1 && "bg-mint-soft/50",
                )}
              />

              <div className="mb-4 flex items-center justify-center gap-5">
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-pressed={muted}
                  aria-label={muted ? "Unmute voice replies" : "Mute voice replies"}
                  className="grid h-11 w-11 place-items-center rounded-full bg-[#F4F1FA] text-[#5C5478] transition-colors hover:bg-mint-soft hover:text-mint"
                >
                  {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>

                <button
                  type="button"
                  onClick={toggleListening}
                  disabled={!micSupported || busy}
                  aria-pressed={listening}
                  aria-label={listening ? "Stop listening" : "Start listening"}
                  className={cn(
                    "relative grid h-[3.75rem] w-[3.75rem] place-items-center rounded-full text-white transition-transform disabled:opacity-50",
                    listening
                      ? "bg-[#16024A]"
                      : "bg-gradient-to-br from-mint to-[#2A0494] hover:scale-[1.04]",
                  )}
                  style={
                    listening
                      ? {
                          boxShadow: `0 0 0 ${6 + level * 14}px rgba(59,5,196,${0.14 + level * 0.3}), 0 18px 40px -16px rgba(22,2,74,0.55)`,
                        }
                      : {
                          boxShadow:
                            "0 18px 40px -16px rgba(59,5,196,0.7), 0 0 0 6px rgba(59,5,196,0.08)",
                        }
                  }
                >
                  {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>

                <div className="grid h-11 w-11 place-items-center text-[#9A93AE]" aria-live="polite">
                  {busy || speaking ? <Loader2 className="h-4 w-4 animate-spin text-mint" /> : null}
                </div>
              </div>

              <form
                className="flex items-center gap-2 rounded-full bg-[#F7F5FC] p-1.5 ring-1 ring-[#ECEAF2]/90 focus-within:ring-mint/30"
                onSubmit={(e) => {
                  e.preventDefault();
                  void ask(draft);
                }}
              >
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={
                    micSupported ? "Or type your question…" : "Type your question…"
                  }
                  disabled={busy}
                  className="h-10 flex-1 rounded-full bg-transparent px-3.5 text-[0.9rem] text-[#16024A] outline-none placeholder:text-[#A39BB8] disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={busy || !draft.trim()}
                  aria-label="Send question"
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#16024A] text-white transition-opacity disabled:opacity-35"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>

            <p
              className="mt-3 text-center text-[0.72rem] leading-relaxed text-[#9A93AE]"
              aria-live="polite"
            >
              {statusLabel(status, interim, micSupported)}
            </p>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
