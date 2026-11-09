/**
 * AI prompt templates - strategy.
 */
export const strategyPrompts = {
  system: "You are an assistant for Xkwisit Services International.",
  user: (input: string) => input,
} as const;

export type StrategyPromptKey = keyof typeof strategyPrompts;
