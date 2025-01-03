import { z } from "zod";

export const createCampaignSchema = z.object({
  title: z.string().trim().min(1, "Required"),
  description: z.string().trim().min(1, "Required"),
  target: z
    .bigint()
    .refine((value) => value > 0, "Target must be greater than zero"), // Ensure positive value
  deadline: z
    .date()
    .refine(
      (date) => (date ? date > new Date() : true),
      "Deadline must be in the future"
    ),
  image: z.string().url().optional(),
});
