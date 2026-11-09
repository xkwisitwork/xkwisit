/** Browser speech helpers for Voice Guide (STT + African-preferring TTS + live levels). */

export type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<{
    isFinal: boolean;
    0: { transcript: string; confidence?: number };
    length: number;
  }>;
};

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

export function getSpeechRecognitionCtor(): SpeechRecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function speechRecognitionSupported() {
  return Boolean(getSpeechRecognitionCtor());
}

export type MicAccessResult = "granted" | "denied" | "unsupported";

export type LiveMicSession = {
  stream: MediaStream;
  context: AudioContext;
  analyser: AnalyserNode;
  /** 0–1 voice level from time-domain RMS */
  getLevel: () => number;
  /** Normalized frequency bars for waveform UI (length = count) */
  getBars: (count: number) => number[];
  stop: () => void;
};

const AudioCtx =
  typeof window !== "undefined"
    ? window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    : undefined;

/**
 * Open a live mic stream wired to an AnalyserNode for waveform + level metering.
 * Keep this open while listening; call session.stop() when done.
 */
export async function openLiveMicSession(): Promise<
  { ok: true; session: LiveMicSession } | { ok: false; reason: MicAccessResult }
> {
  if (typeof window === "undefined" || !AudioCtx) {
    return { ok: false, reason: "unsupported" };
  }
  if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
    return { ok: false, reason: "unsupported" };
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
      video: false,
    });

    const context = new AudioCtx();
    if (context.state === "suspended") {
      await context.resume();
    }

    const source = context.createMediaStreamSource(stream);
    const analyser = context.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.72;
    source.connect(analyser);
    // Do not connect to destination — avoid feedback loop

    const timeBuf = new Uint8Array(analyser.fftSize);
    const freqBuf = new Uint8Array(analyser.frequencyBinCount);

    const getLevel = () => {
      analyser.getByteTimeDomainData(timeBuf);
      let sum = 0;
      for (let i = 0; i < timeBuf.length; i += 1) {
        const v = (timeBuf[i]! - 128) / 128;
        sum += v * v;
      }
      const rms = Math.sqrt(sum / timeBuf.length);
      // Boost speech range into a usable 0–1 UI scale
      return Math.min(1, rms * 3.4);
    };

    const getBars = (count: number) => {
      analyser.getByteFrequencyData(freqBuf);
      const bars: number[] = [];
      const slice = Math.max(1, Math.floor(freqBuf.length / count));
      for (let i = 0; i < count; i += 1) {
        let peak = 0;
        const start = i * slice;
        const end = Math.min(freqBuf.length, start + slice);
        for (let j = start; j < end; j += 1) {
          peak = Math.max(peak, freqBuf[j]!);
        }
        bars.push(peak / 255);
      }
      return bars;
    };

    const stop = () => {
      for (const track of stream.getTracks()) track.stop();
      void context.close().catch(() => undefined);
    };

    return {
      ok: true,
      session: { stream, context, analyser, getLevel, getBars, stop },
    };
  } catch (err) {
    const name = err instanceof DOMException ? err.name : "";
    if (name === "NotAllowedError" || name === "PermissionDeniedError") {
      return { ok: false, reason: "denied" };
    }
    if (name === "NotFoundError" || name === "DevicesNotFoundError") {
      return { ok: false, reason: "unsupported" };
    }
    return { ok: false, reason: "unsupported" };
  }
}

/** Lightweight permission probe used by the navbar click gesture. */
export async function ensureMicrophoneAccess(): Promise<MicAccessResult> {
  const opened = await openLiveMicSession();
  if (!opened.ok) return opened.reason;
  opened.session.stop();
  return "granted";
}

export function preferredRecognitionLang() {
  if (typeof navigator === "undefined") return "en-NG";
  const langs = navigator.languages?.length
    ? [...navigator.languages]
    : [navigator.language];
  const joined = langs.join(" ").toLowerCase();
  if (/en-ng|nigeria/.test(joined)) return "en-NG";
  if (/en-gh|ghana/.test(joined)) return "en-GH";
  if (/en-ke|kenya/.test(joined)) return "en-KE";
  if (/en-za|south africa/.test(joined)) return "en-ZA";
  if (/en-gb|en-uk/.test(joined)) return "en-GB";
  return "en-NG";
}

const FEMALE_VOICE_RE =
  /\b(female|woman|girl|samantha|victoria|karen|moira|tessa|fiona|zira|susan|martha|serena|kate|linda|heather|allison|ava|veena|google us english female|google uk english female)\b/;

const MALE_VOICE_RE =
  /\b(male|man|boy|daniel|david|thomas|fred|alex|james|mark|oliver|arthur|ravi|google uk english male|google us english male|microsoft david|microsoft mark|microsoft george|microsoft ryan)\b/;

function voiceGender(voice: SpeechSynthesisVoice): "male" | "female" | "unknown" {
  const hay = `${voice.name} ${voice.lang}`.toLowerCase();
  if (MALE_VOICE_RE.test(hay)) return "male";
  if (FEMALE_VOICE_RE.test(hay)) return "female";
  // Chromium sometimes exposes gender only via name suffixes
  if (/\bfemale\b/.test(hay)) return "female";
  if (/\bmale\b/.test(hay)) return "male";
  return "unknown";
}

/**
 * Prefer a male Nigerian English voice.
 * Falls back to male African → male British → any male English → Nigerian any gender.
 */
export function pickAfricanVoice(
  voices: SpeechSynthesisVoice[],
): SpeechSynthesisVoice | null {
  if (!voices.length) return null;

  const rank = (voice: SpeechSynthesisVoice) => {
    const hay = `${voice.lang} ${voice.name}`.toLowerCase();
    const gender = voiceGender(voice);

    let locale = 0;
    if (/en-ng|nigeria|lagos/.test(hay)) locale = 100;
    else if (/en-gh|ghana|en-ke|kenya|en-za|south africa|africa|yoruba|igbo|hausa/.test(hay))
      locale = 85;
    else if (/en-gb|uk english|british/.test(hay)) locale = 70;
    else if (/^en/.test(voice.lang.toLowerCase()) || hay.includes("english")) locale = 45;
    else return -1;

    // Hard preference: male Nigerian / male African / male English
    let genderBonus = 0;
    if (gender === "male") genderBonus = 40;
    else if (gender === "unknown") genderBonus = 8;
    else genderBonus = -50; // demote clearly female voices

    return locale + genderBonus;
  };

  return [...voices].sort((a, b) => rank(b) - rank(a))[0] ?? null;
}

let activeAudio: HTMLAudioElement | null = null;
let activeObjectUrl: string | null = null;
let speakGeneration = 0;

function clearActiveAudio() {
  if (activeAudio) {
    activeAudio.onended = null;
    activeAudio.onerror = null;
    activeAudio.pause();
    activeAudio.src = "";
    activeAudio = null;
  }
  if (activeObjectUrl) {
    URL.revokeObjectURL(activeObjectUrl);
    activeObjectUrl = null;
  }
}

function speakBrowserFallback(
  text: string,
  opts?: { muted?: boolean; onEnd?: () => void },
) {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    opts?.onEnd?.();
    return;
  }

  window.speechSynthesis.cancel();
  if (opts?.muted || !text.trim()) {
    opts?.onEnd?.();
    return;
  }

  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.98;
  utter.pitch = 0.9;
  utter.lang = "en-NG";

  const applyVoice = () => {
    const voice = pickAfricanVoice(window.speechSynthesis.getVoices());
    if (voice) {
      utter.voice = voice;
      utter.lang = voice.lang || "en-NG";
      utter.pitch = voiceGender(voice) === "male" ? 0.92 : 0.82;
    }
  };

  applyVoice();
  if (!window.speechSynthesis.getVoices().length) {
    window.speechSynthesis.onvoiceschanged = () => {
      applyVoice();
    };
  }

  utter.onend = () => opts?.onEnd?.();
  utter.onerror = () => opts?.onEnd?.();
  window.speechSynthesis.speak(utter);
}

/**
 * Speak with a real male Nigerian neural voice (Abeo) via /api/voice-guide/speak.
 * Falls back to browser speechSynthesis only if the neural voice request fails.
 */
export function speakText(
  text: string,
  opts?: { muted?: boolean; onEnd?: () => void },
) {
  if (typeof window === "undefined") {
    opts?.onEnd?.();
    return;
  }

  stopSpeaking();
  if (opts?.muted || !text.trim()) {
    opts?.onEnd?.();
    return;
  }

  const generation = ++speakGeneration;

  void (async () => {
    try {
      const res = await fetch("/api/voice-guide/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (generation !== speakGeneration) return;

      if (!res.ok) {
        throw new Error(`TTS HTTP ${res.status}`);
      }

      const blob = await res.blob();
      if (generation !== speakGeneration) return;
      if (!blob.size) throw new Error("Empty TTS audio");

      clearActiveAudio();
      const url = URL.createObjectURL(blob);
      activeObjectUrl = url;
      const audio = new Audio(url);
      activeAudio = audio;
      audio.onended = () => {
        if (generation !== speakGeneration) return;
        clearActiveAudio();
        opts?.onEnd?.();
      };
      audio.onerror = () => {
        if (generation !== speakGeneration) return;
        clearActiveAudio();
        speakBrowserFallback(text, opts);
      };
      await audio.play();
    } catch {
      if (generation !== speakGeneration) return;
      speakBrowserFallback(text, opts);
    }
  })();
}

export function stopSpeaking() {
  speakGeneration += 1;
  clearActiveAudio();
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
