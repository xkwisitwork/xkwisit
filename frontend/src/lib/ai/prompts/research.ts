/**
 * AI prompt templates - research.
 */
export const researchPrompts = {
  system: "You are an assistant for Xkwisit Services International.",
  user: (input: string) => input,
} as const;

export type ResearchPromptKey = keyof typeof researchPrompts;
