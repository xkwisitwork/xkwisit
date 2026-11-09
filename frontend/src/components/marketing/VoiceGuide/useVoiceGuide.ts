"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { VoiceGuideCta } from "@/lib/voice-guide/knowledge";

import {
  getSpeechRecognitionCtor,
  openLiveMicSession,
  preferredRecognitionLang,
  speakText,
  speechRecognitionSupported,
  stopSpeaking,
  type LiveMicSession,
  type SpeechRecognitionLike,
} from "./speech";

export type VoiceGuideMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  cta?: VoiceGuideCta;
};

export type VoiceGuideStatus =
  | "idle"
  | "requesting"
  | "listening"
  | "heard"
  | "thinking"
  | "speaking"
  | "silence";

type AskResponse = {
  success: boolean;
  data?: { reply: string; cta?: VoiceGuideCta };
  error?: { message?: string };
};

const FINAL_SETTLE_MS = 900;
const SILENCE_HINT_MS = 3800;
const MIN_FINAL_CHARS = 2;

export function useVoiceGuide(open: boolean, autoListen = false) {
  const [messages, setMessages] = useState<VoiceGuideMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [interim, setInterim] = useState("");
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [level, setLevel] = useState(0);
  const [status, setStatus] = useState<VoiceGuideStatus>("idle");
  const [micSupported] = useState(() => speechRecognitionSupported());

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const micSessionRef = useRef<LiveMicSession | null>(null);
  const wantListenRef = useRef(false);
  const mutedRef = useRef(muted);
  const busyRef = useRef(busy);
  const autoListenUsedRef = useRef(false);
  const finalBufferRef = useRef("");
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const levelRafRef = useRef<number | null>(null);
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  mutedRef.current = muted;
  busyRef.current = busy;

  const clearSettleTimer = useCallback(() => {
    if (settleTimerRef.current) {
      clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }
  }, []);

  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  const stopLevelLoop = useCallback(() => {
    if (levelRafRef.current != null) {
      cancelAnimationFrame(levelRafRef.current);
      levelRafRef.current = null;
    }
    setLevel(0);
  }, []);

  const stopMicSession = useCallback(() => {
    stopLevelLoop();
    micSessionRef.current?.stop();
    micSessionRef.current = null;
  }, [stopLevelLoop]);

  const startLevelLoop = useCallback(() => {
    stopLevelLoop();
    let lastUi = 0;
    const tick = (t: number) => {
      const session = micSessionRef.current;
      if (!session) return;
      // Throttle React level updates (~20fps) so the modal doesn’t re-render every frame
      if (t - lastUi > 50) {
        lastUi = t;
        setLevel(session.getLevel());
      }
      levelRafRef.current = requestAnimationFrame(tick);
    };
    levelRafRef.current = requestAnimationFrame(tick);
  }, [stopLevelLoop]);

  const getBars = useCallback((count: number) => {
    return micSessionRef.current?.getBars(count) ?? Array.from({ length: count }, () => 0.08);
  }, []);

  const armSilenceHint = useCallback(() => {
    clearSilenceTimer();
    silenceTimerRef.current = setTimeout(() => {
      if (wantListenRef.current && !busyRef.current && !finalBufferRef.current.trim()) {
        setStatus("silence");
      }
    }, SILENCE_HINT_MS);
  }, [clearSilenceTimer]);

  const stopListening = useCallback(() => {
    wantListenRef.current = false;
    clearSettleTimer();
    clearSilenceTimer();
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    stopMicSession();
    setListening(false);
    setInterim("");
    finalBufferRef.current = "";
    setStatus((s) => (s === "speaking" || s === "thinking" ? s : "idle"));
  }, [clearSettleTimer, clearSilenceTimer, stopMicSession]);

  const ask = useCallback(async (raw: string) => {
    const message = raw.trim();
    if (!message || busyRef.current) return;
    if (message.length < MIN_FINAL_CHARS) return;

    setError(null);
    setBusy(true);
    setStatus("thinking");
    setDraft("");
    setInterim("");
    finalBufferRef.current = "";
    clearSettleTimer();
    clearSilenceTimer();
    stopSpeaking();
    setSpeaking(false);

    // Pause recognition while we answer (avoid capturing TTS)
    wantListenRef.current = false;
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    setListening(false);
    stopMicSession();

    const userMsg: VoiceGuideMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: message,
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("/api/voice-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const json = (await res.json()) as AskResponse;
      if (!res.ok || !json.success || !json.data?.reply) {
        throw new Error(json.error?.message || "Could not get an answer.");
      }

      const assistantMsg: VoiceGuideMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        text: json.data.reply,
        cta: json.data.cta,
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setSpeaking(true);
      setStatus("speaking");
      speakText(json.data.reply, {
        muted: mutedRef.current,
        onEnd: () => {
          setSpeaking(false);
          setStatus("idle");
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    } finally {
      setBusy(false);
    }
  }, [clearSettleTimer, clearSilenceTimer, stopMicSession]);

  const queueFinal = useCallback(
    (chunk: string) => {
      const cleaned = chunk.trim();
      if (!cleaned) return;
      finalBufferRef.current = `${finalBufferRef.current} ${cleaned}`.trim();
      setStatus("heard");
      setInterim(finalBufferRef.current);
      clearSettleTimer();
      clearSilenceTimer();
      settleTimerRef.current = setTimeout(() => {
        const text = finalBufferRef.current.trim();
        finalBufferRef.current = "";
        if (text) void ask(text);
      }, FINAL_SETTLE_MS);
    },
    [ask, clearSettleTimer, clearSilenceTimer],
  );

  const startListening = useCallback(async () => {
    setError(null);
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) {
      setError("Voice input is not supported in this browser. Type your question instead.");
      return;
    }

    setStatus("requesting");
    stopSpeaking();
    setSpeaking(false);

    // Tear down any previous session
    wantListenRef.current = false;
    recognitionRef.current?.abort();
    recognitionRef.current = null;
    stopMicSession();

    const opened = await openLiveMicSession();
    if (!opened.ok) {
      if (opened.reason === "denied") {
        setError(
          "Microphone is blocked for this site. Click the lock icon in the address bar → allow Microphone, then try again — or type your question.",
        );
      } else {
        setError("No microphone available here. Type your question instead.");
      }
      setStatus("idle");
      return;
    }

    micSessionRef.current = opened.session;
    startLevelLoop();
    wantListenRef.current = true;
    setListening(true);
    setStatus("listening");
    armSilenceHint();

    const beginRecognition = () => {
      if (!wantListenRef.current || busyRef.current) return;

      const recognition = new Ctor();
      recognition.lang = preferredRecognitionLang();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        let interimText = "";
        let finalText = "";
        for (let i = event.resultIndex; i < event.results.length; i += 1) {
          const result = event.results[i]!;
          const piece = result[0]?.transcript ?? "";
          if (result.isFinal) finalText += piece;
          else interimText += piece;
        }

        if (interimText.trim()) {
          setInterim(
            finalBufferRef.current
              ? `${finalBufferRef.current} ${interimText}`.trim()
              : interimText.trim(),
          );
          setStatus("listening");
          armSilenceHint();
        }

        if (finalText.trim()) {
          queueFinal(finalText);
        }
      };

      recognition.onerror = (event) => {
        if (event.error === "not-allowed") {
          wantListenRef.current = false;
          setListening(false);
          stopMicSession();
          setStatus("idle");
          setError(
            "Microphone is blocked for this site. Click the lock icon in the address bar → allow Microphone, then try again — or type your question.",
          );
          return;
        }
        // no-speech / aborted are normal in continuous mode — restart below via onend
        if (event.error !== "aborted" && event.error !== "no-speech") {
          setError("Could not hear you clearly. Try again or type.");
        }
      };

      recognition.onend = () => {
        recognitionRef.current = null;
        if (!wantListenRef.current || busyRef.current) {
          setListening(false);
          return;
        }
        // Chrome ends continuous sessions periodically — restart quickly
        restartTimerRef.current = setTimeout(() => {
          if (wantListenRef.current && !busyRef.current) beginRecognition();
        }, 120);
      };

      recognitionRef.current = recognition;
      try {
        recognition.start();
      } catch {
        // Already started — ignore
      }
    };

    beginRecognition();
  }, [armSilenceHint, queueFinal, startLevelLoop, stopMicSession]);

  const toggleListening = useCallback(() => {
    if (listening) stopListening();
    else void startListening();
  }, [listening, startListening, stopListening]);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      if (next) {
        stopSpeaking();
        setSpeaking(false);
        setStatus((s) => (s === "speaking" ? "idle" : s));
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!open) {
      stopListening();
      stopSpeaking();
      setSpeaking(false);
      setInterim("");
      setError(null);
      setStatus("idle");
      autoListenUsedRef.current = false;
      return;
    }

    if (autoListen && micSupported && !autoListenUsedRef.current) {
      autoListenUsedRef.current = true;
      void startListening();
    }
  }, [open, autoListen, micSupported, startListening, stopListening]);

  useEffect(
    () => () => {
      wantListenRef.current = false;
      recognitionRef.current?.abort();
      if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
      clearSettleTimer();
      clearSilenceTimer();
      stopMicSession();
      stopSpeaking();
    },
    [clearSettleTimer, clearSilenceTimer, stopMicSession],
  );

  return {
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
  };
}
