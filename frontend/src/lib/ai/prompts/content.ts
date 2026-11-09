/**
 * AI prompt templates - content.
 */
export const contentPrompts = {
  system: "You are an assistant for Xkwisit Services International.",
  user: (input: string) => input,
} as const;

export type ContentPromptKey = keyof typeof contentPrompts;
