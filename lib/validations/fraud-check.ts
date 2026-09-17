import { z } from "zod";

/** Structured shape we ask Gemini to return, and validate before trusting it. */
export const fraudRiskResultSchema = z.object({
  riskScore: z.number().min(0).max(100),
  riskLevel: z.enum(["low", "medium", "high"]),
  signals: z.array(z.string()).min(1).max(6),
  summary: z.string().min(1).max(400),
});

export type FraudRiskResult = z.infer<typeof fraudRiskResultSchema>;
