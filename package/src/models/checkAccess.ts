import { z } from "zod";

export const checkAccessRequestSchema = z.object({
  userId: z.string(),
});

export type CheckAccessRequest = z.infer<typeof checkAccessRequestSchema>;

export const checkAccessResponseSchema = z.object({
  access: z.boolean(),
  creditsRemaining: z.number(),
});

export type CheckAccessResponse = z.infer<typeof checkAccessResponseSchema>;
