import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";

/** Microsoft neural male Nigerian English voice. */
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
      reject(new Error("Nigerian TTS timed out."));
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

/**
 * Synthesize speech with a male Nigerian English neural voice (Abeo).
 * Uses Microsoft Edge neural TTS via the local Python helper.
 */
export async function synthesizeNigerianMale(text: string): Promise<Buffer> {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) {
    throw new Error("Nothing to speak.");
  }
  if (cleaned.length > 1200) {
    throw new Error("Text is too long to speak.");
  }

  const python = await resolvePython();
  const outPath = path.join(
    os.tmpdir(),
    `xkwisit-ng-tts-${randomUUID()}.mp3`,
  );

  try {
    const result = await run(
      python,
      [SPEAK_SCRIPT, "--text", cleaned, "--out", outPath],
      { timeoutMs: 30_000 },
    );

    if (result.code !== 0) {
      const detail = result.stderr.trim() || result.stdout.trim() || `exit ${result.code}`;
      throw new Error(
        `Nigerian TTS failed (${detail}). Run: npm run voice:tts:setup`,
      );
    }

    const audio = await fs.readFile(outPath);
    if (!audio.length) {
      throw new Error("Nigerian TTS returned empty audio.");
    }
    return audio;
  } finally {
    await fs.unlink(outPath).catch(() => undefined);
  }
}
