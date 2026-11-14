import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  edgeVoiceForLocale,
  googleTtsLang,
} from "@/lib/i18n/speechLocales";
import type { AppLocale } from "@/lib/i18n/locales";

/** Microsoft neural male Nigerian English voice (default). */
export const NIGERIAN_MALE_VOICE = "en-NG-AbeoNeural";

const SCRIPT_DIR = path.join(process.cwd(), "scripts", "nigerian-tts");
const VENV_PYTHON = path.join(SCRIPT_DIR, ".venv", "bin", "python3");
const SPEAK_SCRIPT = path.join(SCRIPT_DIR, "speak.py");

function run(
  command: string,
  args: string[],
  opts?: { timeoutMs?: number },
): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env,
    });

    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error("TTS timed out."));
    }, opts?.timeoutMs ?? 25_000);

    child.stdout.on("data", (chunk: Buffer) => {
      stdout += chunk.toString("utf8");
    });
    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString("utf8");
    });
    child.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code: code ?? 1, stdout, stderr });
    });
  });
}

async function resolvePython(): Promise<string> {
  try {
    await fs.access(VENV_PYTHON);
    return VENV_PYTHON;
  } catch {
    // Fall through to system python if the project venv is missing
  }
  return "python3";
}

async function synthesizeEdge(
  text: string,
  voice: string,
): Promise<{ audio: Buffer; voice: string }> {
  const python = await resolvePython();
  const outPath = path.join(os.tmpdir(), `xkwisit-tts-${randomUUID()}.mp3`);

  try {
    const result = await run(
      python,
      [SPEAK_SCRIPT, "--text", text, "--out", outPath, "--voice", voice],
      { timeoutMs: 30_000 },
    );

    if (result.code !== 0) {
      const detail =
        result.stderr.trim() || result.stdout.trim() || `exit ${result.code}`;
      throw new Error(`Edge TTS failed (${detail}).`);
    }

    const audio = await fs.readFile(outPath);
    if (!audio.length) {
      throw new Error("Edge TTS returned empty audio.");
    }
    return { audio, voice };
  } finally {
    await fs.unlink(outPath).catch(() => undefined);
  }
}

/** Chunk long text for Google Translate TTS (~180 char soft limit). */
function chunkForGoogle(text: string, max = 180): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];
  let buf = "";
  for (const word of words) {
    const next = buf ? `${buf} ${word}` : word;
    if (next.length > max && buf) {
      chunks.push(buf);
      buf = word;
    } else {
      buf = next;
    }
  }
  if (buf) chunks.push(buf);
  return chunks;
}

async function synthesizeGoogle(
  text: string,
  locale: AppLocale,
): Promise<Buffer> {
  const tl = googleTtsLang(locale);
  const chunks = chunkForGoogle(text);
  const parts: Buffer[] = [];

  for (const chunk of chunks) {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodeURIComponent(chunk)}&tl=${encodeURIComponent(tl)}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; XkwisitVoiceGuide/1.0; +https://xkwisit.com)",
        Accept: "audio/mpeg,audio/*;q=0.9,*/*;q=0.8",
        Referer: "https://translate.google.com/",
      },
    });
    if (!res.ok) {
      throw new Error(`Google TTS HTTP ${res.status}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (!buf.length) throw new Error("Google TTS empty audio");
    parts.push(buf);
  }

  return Buffer.concat(parts);
}

/**
 * Synthesize speech with a male Nigerian English voice (Abeo).
 */
export async function synthesizeNigerianMale(text: string): Promise<Buffer> {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) throw new Error("Nothing to speak.");
  if (cleaned.length > 1200) throw new Error("Text is too long to speak.");
  const { audio } = await synthesizeEdge(cleaned, NIGERIAN_MALE_VOICE);
  return audio;
}

/**
 * Synthesize fluent speech for the selected site language.
 * Edge neural voices first; Google TTS fallback for broader language coverage.
 */
export async function synthesizeLocaleSpeech(
  text: string,
  locale: AppLocale = "en",
): Promise<{ audio: Buffer; voice: string }> {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) throw new Error("Nothing to speak.");
  if (cleaned.length > 1200) throw new Error("Text is too long to speak.");

  const preferred = edgeVoiceForLocale(locale);
  const preferGoogleFirst =
    locale === "ig" || locale === "yo" || locale === "ha" || locale === "zh";

  if (preferGoogleFirst) {
    try {
      const audio = await synthesizeGoogle(cleaned, locale);
      return { audio, voice: `google:${googleTtsLang(locale)}` };
    } catch {
      // Fall through to Edge / Google English carrier
    }
  }

  try {
    return await synthesizeEdge(cleaned, preferred);
  } catch {
    if (locale !== "en" && locale !== "pcm") {
      const audio = await synthesizeGoogle(cleaned, locale);
      return { audio, voice: `google:${googleTtsLang(locale)}` };
    }
    const audio = await synthesizeGoogle(cleaned, "en");
    return { audio, voice: "google:en" };
  }
}
