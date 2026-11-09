const BLOCKED = [/ignore previous/i, /system prompt/i, /jailbreak/i];

export function classifyPromptRisk(prompt: string): "ok" | "risky" {
  if (BLOCKED.some((re) => re.test(prompt))) return "risky";
  return "ok";
}
