/**
 * AI prompt templates - reporting.
 */
export const reportingPrompts = {
  system: "You are an assistant for Xkwisit Services International.",
  user: (input: string) => input,
} as const;

export type ReportingPromptKey = keyof typeof reportingPrompts;
