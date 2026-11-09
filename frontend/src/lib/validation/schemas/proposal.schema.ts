import { z } from "zod";

export const proposalSchema = z.object({
  name: z.string().min(1),
  status: z.string().optional(),
  description: z.string().nullable().optional(),
});

export type ProposalInput = z.infer<typeof proposalSchema>;
