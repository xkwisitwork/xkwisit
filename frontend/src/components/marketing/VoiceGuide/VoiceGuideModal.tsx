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
  Plus,
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
import { LanguageSelect } from "@/components/marketing/LanguageSelect";
import { useLanguage } from "@/contexts/LanguageContext";
import { toPidgin } from "@/lib/i18n/pidgin";
import { cn } from "@/lib/utils/cn";

import { useVoiceGuide, type VoiceGuideMessage } from "./useVoiceGuide";
import { VoiceWaveform } from "./VoiceWaveform";

export type VoiceGuideModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  autoListen?: boolean;
};

type Exchange = {
  id: string;
  user?: VoiceGuideMessage;
  assistant?: VoiceGuideMessage;
};

const EMAIL_RE = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

const SUGGESTIONS = [
  {
    label: "About us",
    labelPcm: "About us",
    prompt: "What is this website about?",
  },
  {
    label: "CRM price",
    labelPcm: "CRM price",
    prompt: "How much is CRM?",
  },
  {
    label: "Mobile apps",
    labelPcm: "Mobile apps",
    prompt: "Do you build mobile apps?",
  },
  {
    label: "Free check",
    labelPcm: "Free check",
    prompt: "How do I get a free check?",
  },
  {
    label: "Book a call",
    labelPcm: "Book call",
    prompt: "How do I book a call?",
  },
] as const;

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

function withEmailLinks(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(EMAIL_RE.source, "g");
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const email = match[1]!;
    nodes.push(
      <a
        key={`${email}-${match.index}`}
        href={`mailto:${email}`}
        className="font-semibold text-[#3B05C4] underline decoration-[#3B05C4]/35 underline-offset-[3px]"
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
  return (
    <div className="space-y-3">
      {answerParagraphs(text).map((para, i) => (
        <p
          key={`${i}-${para.slice(0, 24)}`}
          className="text-[1.02rem] font-medium leading-[1.7] tracking-[-0.01em] text-[#16024A]"
        >
          {withEmailLinks(para)}
        </p>
      ))}
    </div>
  );
}

function formatTimer(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function VoiceOrb({ active, level }: { active: boolean; level: number }) {
  const pulse = 1 + (active ? 0.04 + level * 0.12 : 0);
  return (
    <div className="relative mx-auto grid h-44 w-44 place-items-center tablet:h-52 tablet:w-52">
      <motion.div
        aria-hidden
        className="absolute inset-[8%] rounded-full opacity-70 blur-2xl"
        style={{
          background:
            "conic-gradient(from 180deg, #7C3AED, #EC4899, #F97316, #A855F7, #7C3AED)",
        }}
        animate={
          active
            ? { rotate: 360, scale: [1, 1.08, 1] }
            : { rotate: 0, scale: 1 }
        }
        transition={
          active
            ? { rotate: { duration: 10, repeat: Infinity, ease: "linear" }, scale: { duration: 2.4, repeat: Infinity } }
            : { duration: 0.4 }
        }
      />
      <motion.div
        className="relative h-[72%] w-[72%] overflow-hidden rounded-full shadow-[0_0_60px_rgba(168,85,247,0.45)]"
        style={{
          background:
            "radial-gradient(circle at 30% 25%, #F5D0FE, #C084FC 35%, #7C3AED 62%, #1E1B4B 100%)",
          scale: pulse,
        }}
        animate={active ? { rotate: [-2, 2, -2] } : { rotate: 0 }}
        transition={active ? { duration: 2.8, repeat: Infinity, ease: "easeInOut" } : undefined}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "repeating-radial-gradient(circle at 50% 50%, transparent 0 10px, rgba(255,255,255,0.08) 10px 12px)",
          }}
        />
        <div
          aria-hidden
          className="absolute -left-4 -top-6 h-24 w-24 rounded-full bg-white/25 blur-2xl"
        />
      </motion.div>
    </div>
  );
}

/**
 * Ask Xkwisit — white AI-assistant modal (orb, chrome, answer-first layout).
 */
export function VoiceGuideModal({
  open,
  onOpenChange,
  autoListen = false,
}: VoiceGuideModalProps) {
  const reduce = useReducedMotion();
  const { locale } = useLanguage();
  const t = (english: string) => (locale === "pcm" ? toPidgin(english) : english);
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
    stopListening,
    toggleMute,
  } = useVoiceGuide(open, autoListen, locale);

  const exchanges = useMemo(() => buildExchanges(messages), [messages]);
  const [page, setPage] = useState(0);
  const [elapsed, setElapsed] = useState(0);

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

  useEffect(() => {
    if (!listening) {
      setElapsed(0);
      return;
    }
    setElapsed(0);
    const timer = window.setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => window.clearInterval(timer);
  }, [listening]);

  const voiceActive = listening && !busy;
  const total = exchanges.length;
  const safePage = total === 0 ? 0 : Math.min(page, total - 1);
  const current = total > 0 ? exchanges[safePage] : null;
  const showListening = listening;
  const showAnswer =
    !listening && Boolean(current?.assistant || current?.user || error || busy);
  const showIdle = !showListening && !showAnswer;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        size="md"
        hideCloseButton
        overlayClassName="bg-black/70 backdrop-blur-[6px]"
        className={cn(
          "border-0 bg-transparent p-0 shadow-none",
          "w-[98%] max-w-none tablet:w-[min(100%-2rem,26rem)] tablet:max-w-md",
          "max-h-[min(92vh,44rem)] overflow-visible",
          "data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100",
        )}
      >
        <motion.div
          data-voice-guide
          data-no-translate
          key={open ? "voice-open" : "voice-closed"}
          initial={reduce ? false : { opacity: 0, scale: 0.88, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={
            reduce
              ? { duration: 0.15 }
              : { type: "spring", stiffness: 420, damping: 18, mass: 0.8 }
          }
          className={cn(
            "relative flex max-h-[min(92vh,44rem)] flex-col overflow-hidden",
            "rounded-[1.75rem] text-[#16024A]",
            "bg-white",
            "ring-1 ring-[#16024A]/08",
            "shadow-[0_40px_100px_-30px_rgba(22,2,74,0.35)]",
          )}
        >
          {/* Soft brand wash */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-[radial-gradient(ellipse_at_bottom,_rgba(59,5,196,0.08),_transparent_70%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 top-24 h-40 w-40 rounded-full bg-[#3B05C4]/06 blur-3xl"
          />

          {/* Header */}
          <DialogHeader className="relative z-10 mb-0 flex shrink-0 flex-row items-center justify-between gap-2 px-4 pb-2 pt-4">
            <button
              type="button"
              aria-label="Close Ask Xkwisit"
              onClick={() => onOpenChange(false)}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#16024A]/10 bg-[#F7F8FA] text-[#16024A]/70 transition hover:bg-[#EDE8F7]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="inline-flex min-w-0 items-center gap-2 rounded-full border border-[#16024A]/10 bg-[#F7F8FA] px-3 py-1.5">
              <div className="min-w-0 text-left">
                <DialogTitle className="truncate text-[0.78rem] font-semibold leading-none text-[#16024A]">
                  {t("Ask Xkwisit")}
                </DialogTitle>
                <DialogDescription className="mt-0.5 truncate text-[0.62rem] text-[#16024A]/50">
                  {t("AI Assistant")}
                </DialogDescription>
              </div>
            </div>

            <button
              type="button"
              aria-label={muted ? "Unmute voice" : "Mute voice"}
              onClick={toggleMute}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#16024A]/10 bg-[#F7F8FA] text-[#16024A]/70 transition hover:bg-[#EDE8F7]"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </DialogHeader>

          <div className="relative z-10 flex justify-center px-4 pb-2">
            <LanguageSelect tone="light" />
          </div>

          {/* Main stage — answers live here, never under the mic bar */}
          <div className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-3 pt-1">
            <AnimatePresence mode="wait">
              {showListening ? (
                <motion.div
                  key="listening"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex min-h-[16rem] flex-col items-center justify-center gap-4 py-4"
                >
                  <VoiceWaveform
                    active={voiceActive}
                    getBars={getBars}
                    level={level}
                    tone="brand"
                    className="h-16 w-full max-w-sm bg-transparent"
                  />
                  <p className="font-display text-[2rem] font-semibold tabular-nums tracking-tight text-[#16024A]">
                    {formatTimer(elapsed)}
                  </p>
                  <p className="text-[0.85rem] text-[#16024A]/55">
                    {interim ? t("Hearing you…") : t("Listening — speak now")}
                  </p>
                  {interim ? (
                    <p className="max-w-[34ch] text-center text-[0.95rem] font-medium leading-relaxed text-[#16024A]/90">
                      “{interim}”
                    </p>
                  ) : null}
                </motion.div>
              ) : showAnswer ? (
                <motion.div
                  key="answer"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex flex-col gap-3 py-2"
                >
                  {current?.user ? (
                    <div className="ml-auto max-w-[90%] rounded-[1.15rem] rounded-br-md bg-[#3B05C4] px-3.5 py-2.5 text-[0.9rem] leading-relaxed text-white shadow-sm">
                      {current.user.text}
                    </div>
                  ) : null}

                  {current?.assistant ? (
                    <div className="w-full rounded-[1.35rem] bg-[#F7F8FA] px-4 py-4 ring-1 ring-[#16024A]/08">
                      <p className="mb-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[#3B05C4]">
                        {t("Answer")}
                      </p>
                      <AnswerBody text={current.assistant.text} />
                      {current.assistant.cta ? (
                        <Link
                          href={current.assistant.cta.href}
                          onClick={() => onOpenChange(false)}
                          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#3B05C4] px-3.5 py-1.5 text-[0.75rem] font-semibold text-white"
                        >
                          {current.assistant.cta.label}
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                        </Link>
                      ) : null}
                    </div>
                  ) : busy ? (
                    <div className="inline-flex items-center gap-2 rounded-[1.1rem] bg-[#F7F8FA] px-3.5 py-3 text-[0.88rem] text-[#16024A]/70 ring-1 ring-[#16024A]/08">
                      <Loader2 className="h-4 w-4 animate-spin text-[#3B05C4]" />
                      {t("Thinking…")}
                    </div>
                  ) : null}

                  {error ? (
                    <p className="rounded-[1.15rem] bg-red-50 px-3.5 py-3 text-[0.88rem] leading-relaxed text-red-700 ring-1 ring-red-200">
                      {error}
                    </p>
                  ) : null}

                  {total > 1 ? (
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        aria-label="Previous answer"
                        disabled={safePage <= 0}
                        onClick={() => setPage((p) => Math.max(0, p - 1))}
                        className="inline-flex h-8 items-center gap-1 rounded-full bg-[#F7F8FA] px-3 text-[0.72rem] font-semibold text-[#16024A]/70 ring-1 ring-[#16024A]/08 disabled:opacity-35"
                      >
                        <ChevronLeft className="h-3.5 w-3.5" aria-hidden />
                        Prev
                      </button>
                      <p className="text-[0.7rem] tabular-nums text-[#16024A]/40">
                        {safePage + 1} / {total}
                      </p>
                      <button
                        type="button"
                        aria-label="Next answer"
                        disabled={safePage >= total - 1}
                        onClick={() => setPage((p) => Math.min(total - 1, p + 1))}
                        className="inline-flex h-8 items-center gap-1 rounded-full bg-[#F7F8FA] px-3 text-[0.72rem] font-semibold text-[#16024A]/70 ring-1 ring-[#16024A]/08 disabled:opacity-35"
                      >
                        Next
                        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                      </button>
                    </div>
                  ) : null}
                </motion.div>
              ) : showIdle ? (
                <motion.div
                  key="idle"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex min-h-[17rem] flex-col items-center justify-center gap-5 py-4 text-center"
                >
                  <VoiceOrb active={speaking || busy} level={level} />
                  <div className="max-w-[18ch]">
                    <p className="font-display text-[1.55rem] font-bold leading-[1.15] tracking-tight text-[#16024A] tablet:text-[1.75rem]">
                      {locale === "pcm"
                        ? "How far, na Xkwisit be this!"
                        : "Hi, I'm Xkwisit!"}
                    </p>
                    <p className="mt-1.5 text-[1.05rem] font-medium text-[#16024A]/55">
                      {locale === "pcm"
                        ? "How I fit help you today?"
                        : "How can I help you today?"}
                    </p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {/* Suggestion chips */}
          {!listening ? (
            <div className="relative z-10 shrink-0 px-4 pb-3">
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {SUGGESTIONS.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    disabled={busy}
                    onClick={() => void ask(item.prompt)}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#16024A]/10 bg-[#F7F8FA] px-3 py-1.5 text-[0.72rem] font-medium text-[#16024A]/80 transition hover:bg-[#EDE8F7] disabled:opacity-40"
                  >
                    {locale === "pcm" ? item.labelPcm : item.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* Bottom glass input — mic lives here only */}
          <div className="relative z-10 shrink-0 px-4 pb-5 pt-1">
            {listening ? (
              <div className="mb-4 flex items-center justify-between gap-4 px-2">
                <button
                  type="button"
                  onClick={stopListening}
                  aria-label="Stop listening"
                  className="grid h-12 w-12 place-items-center rounded-full border border-[#16024A]/10 bg-[#F7F8FA] text-[#16024A]/70"
                >
                  <X className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={toggleListening}
                  aria-pressed={listening}
                  aria-label="Listening"
                  className="relative grid h-16 w-16 place-items-center rounded-full bg-[#3B05C4] text-white"
                  style={{
                    boxShadow: `0 0 0 ${8 + level * 18}px rgba(59,5,196,${0.1 + level * 0.18})`,
                  }}
                >
                  <Mic className="h-6 w-6" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const spoken = interim.trim();
                    if (spoken) {
                      stopListening();
                      void ask(spoken);
                      return;
                    }
                    stopListening();
                  }}
                  aria-label="Send or stop"
                  className="grid h-12 w-12 place-items-center rounded-full border border-[#16024A]/10 bg-[#F7F8FA] text-[#16024A]/70"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <form
                className="flex items-center gap-2 rounded-full border border-[#16024A]/10 bg-[#F7F8FA] p-1.5"
                onSubmit={(e) => {
                  e.preventDefault();
                  void ask(draft);
                }}
              >
                <span className="grid h-10 w-10 place-items-center rounded-full text-[#16024A]/40" aria-hidden>
                  <Plus className="h-4 w-4" />
                </span>
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={t("Message…")}
                  disabled={busy}
                  className="h-10 flex-1 bg-transparent text-[0.9rem] text-[#16024A] outline-none placeholder:text-[#16024A]/35 disabled:opacity-60"
                />
                <button
                  type="button"
                  onClick={toggleListening}
                  disabled={!micSupported || busy}
                  aria-label="Start listening"
                  className={cn(
                    "relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#3B05C4] text-white shadow-[0_10px_28px_-10px_rgba(59,5,196,0.55)] transition",
                    "disabled:opacity-40",
                  )}
                >
                  <Mic className="h-5 w-5" />
                </button>
              </form>
            )}

            <p className="mt-2.5 text-center text-[0.65rem] text-[#16024A]/40" aria-live="polite">
              {status === "listening"
                ? interim
                  ? t("Hearing you…")
                  : t("Listening — speak now")
                : status === "thinking"
                  ? t("Thinking…")
                  : status === "speaking"
                    ? t("Speaking your answer…")
                    : micSupported
                      ? t("Ask by voice or type a message")
                      : t("Mic unavailable · type instead")}
            </p>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
