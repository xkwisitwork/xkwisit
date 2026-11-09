import { analyzeWebsite } from "./xray.analyzer.js";
import type { XrayScanResult } from "./xray.types.js";

const recentByKey = new Map<string, number>();
const COOLDOWN_MS = 4_000;

function cooldownKey(url: string) {
  return url.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
}

export async function runScan(url: string): Promise<XrayScanResult> {
  const key = cooldownKey(url);
  const last = recentByKey.get(key) ?? 0;
  const now = Date.now();
  if (now - last < COOLDOWN_MS) {
    // Still allow - just soft-delay duplicate hammering from the same domain.
    await new Promise((r) => setTimeout(r, COOLDOWN_MS - (now - last)));
  }
  recentByKey.set(key, Date.now());

  const result = await analyzeWebsite(url);
  console.log(
    `[xray] scanned ${result.domain} overall=${result.overall} constraint=${result.constraint} ${result.timingMs}ms`,
  );
  return result;
}
