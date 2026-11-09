import { z } from "zod";

export const campaignSchema = z.object({
  name: z.string().min(1),
  status: z.string().optional(),
  description: z.string().nullable().optional(),
});

export type CampaignInput = z.infer<typeof campaignSchema>;
