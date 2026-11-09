/**
 * Random ISO time string within the last `withinHours` hours (demo/UI).
 */
export function getRandomTime(withinHours = 24): string {
  const ms = Date.now() - Math.floor(Math.random() * withinHours * 60 * 60 * 1000);
  return new Date(ms).toISOString();
}
