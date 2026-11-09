export function stripModelSeparators(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, (block) => block)
    .replace(/^\s*#{1,6}\s*SYSTEM\s*$/gim, "")
    .trim();
}
