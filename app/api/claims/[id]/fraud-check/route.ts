import { NextResponse } from "next/server";
import { getClaimById } from "@/lib/mock-data";
import { fraudRiskResultSchema } from "@/lib/validations/fraud-check";
import { formatEUR } from "@/lib/utils";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    riskScore: {
      type: "NUMBER",
      description: "An INTEGER from 0 (no risk) to 100 (high risk) — never a 0-1 fraction.",
    },
    riskLevel: { type: "STRING", enum: ["low", "medium", "high"] },
    signals: {
      type: "ARRAY",
      items: { type: "STRING" },
      description: "1 to 6 short, specific observations that informed the score",
    },
    summary: { type: "STRING", description: "One or two plain-language sentences" },
  },
  required: ["riskScore", "riskLevel", "signals", "summary"],
};

function buildPrompt(claim: NonNullable<ReturnType<typeof getClaimById>>): string {
  const daysToReport = Math.round(
    (new Date(claim.reportedDate).getTime() - new Date(claim.incidentDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return `You are a claims triage assistant for ClaimFlow, a FICTIONAL insurance portfolio demo. All data below is simulated, not real. Give an illustrative fraud-risk assessment based only on the fields provided — do not invent external facts or claim to have checked real records.

Claim type: ${claim.type}
Title: ${claim.title}
Description: ${claim.description}
Incident date: ${claim.incidentDate}
Reported date: ${claim.reportedDate} (${daysToReport} day(s) after the incident)
Estimated amount: ${formatEUR(claim.estimatedAmount)}
Status: ${claim.status}

Consider things like: reporting delay, description specificity/consistency, amount plausibility for the described damage, and any other pattern visible in this text. riskScore must be a whole number from 0 to 100 (not a 0-1 fraction). Respond with the requested JSON only.`;
}

export async function POST(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const claim = getClaimById(id);

  if (!claim) {
    return NextResponse.json({ ok: false, reason: "Claim not found." }, { status: 404 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        reason:
          "AI risk analysis is not configured. Add a free GEMINI_API_KEY (see README) to enable it.",
      },
      { status: 503 }
    );
  }

  let upstreamResponse: Response;
  try {
    upstreamResponse = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: buildPrompt(claim) }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: RESPONSE_SCHEMA,
          temperature: 0.4,
          thinkingConfig: { thinkingBudget: 0 },
        },
      }),
    });
  } catch {
    return NextResponse.json(
      { ok: false, reason: "Could not reach the AI service. Try again in a moment." },
      { status: 502 }
    );
  }

  if (!upstreamResponse.ok) {
    const status = upstreamResponse.status === 429 ? 429 : 502;
    const reason =
      status === 429
        ? "The free AI quota was hit. Try again shortly."
        : "The AI service returned an error.";
    return NextResponse.json({ ok: false, reason }, { status });
  }

  const payload = await upstreamResponse.json();
  const text: unknown = payload?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (typeof text !== "string") {
    return NextResponse.json(
      { ok: false, reason: "The AI response was empty or malformed." },
      { status: 502 }
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { ok: false, reason: "The AI response was not valid JSON." },
      { status: 502 }
    );
  }

  const result = fraudRiskResultSchema.safeParse(parsed);
  if (!result.success) {
    return NextResponse.json(
      { ok: false, reason: "The AI response did not match the expected shape." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, result: result.data });
}
