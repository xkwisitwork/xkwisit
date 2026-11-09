import { classifyPromptRisk } from "./classifier";

export function validateAiPrompt(prompt: string): {
  ok: boolean;
  message?: string;
} {
  const trimmed = prompt.trim();
  if (!trimmed) return { ok: false, message: "Prompt is required." };
  if (trimmed.length > 8000) {
    return { ok: false, message: "Prompt is too long." };
  }
  if (classifyPromptRisk(trimmed) === "risky") {
    return { ok: false, message: "Prompt blocked by guardrails." };
  }
  return { ok: true };
}
