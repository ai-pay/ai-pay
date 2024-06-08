import { ApiErrorWrapper } from "./common/apiErrorWrapper";
import { z } from "zod";

export const checkAccessRequestSchema = z.object({
  userId: z.string(),
  waitForUsageUsed: z.boolean({
    description: "If true, the response will include the creditsUsed field. This will introduce marginal latency and would be unnecessary if not displaying the credits used to the user.",
  }),
});

export type CheckAccessRequest = z.infer<typeof checkAccessRequestSchema>;

export type CheckAccessResponse = ApiErrorWrapper<{
  access: false;
} | {
  access: true;
  creditLimit: number;
  creditsUsed?: number;
}>
