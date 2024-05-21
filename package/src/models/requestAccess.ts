import { z } from "zod";

export const requestAccessRequestSchema = z.object({
  userId: z.string(),

  requestCredits: z.number(),

  accessType: z.union([
    z.object({
      type: z.literal("reoccurring"),
      dayFrequency: z.number(),
    }),
    z.object({
      type: z.literal("one-time"),
    }),
  ]),

});

export type RequestAccessRequest = z.infer<typeof requestAccessRequestSchema>;

export const requestAccessResponseSchema = z.object({
  url: z.string(),
});

export type RequestAccessResponse = z.infer<typeof requestAccessResponseSchema>;
