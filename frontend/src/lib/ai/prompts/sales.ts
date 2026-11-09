/**
 * AI prompt templates - sales.
 */
export const salesPrompts = {
  system: "You are an assistant for Xkwisit Services International.",
  user: (input: string) => input,
} as const;

export type SalesPromptKey = keyof typeof salesPrompts;
