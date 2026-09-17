"use client";

import * as React from "react";
import { AlertTriangle, Loader2, ShieldQuestion, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { FraudRiskResult } from "@/lib/validations/fraud-check";

interface FraudRiskCardProps {
  claimId: string;
}

type LoadState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; reason: string }
  | { status: "success"; result: FraudRiskResult };

const RISK_LEVEL_CLASSES: Record<FraudRiskResult["riskLevel"], string> = {
  low: "bg-success-bg text-success border-success-border",
  medium: "bg-warning-bg text-warning border-warning-border",
  high: "bg-critical-bg text-critical border-critical-border",
};

const RISK_LEVEL_LABEL: Record<FraudRiskResult["riskLevel"], string> = {
  low: "Low risk",
  medium: "Medium risk",
  high: "High risk",
};

/**
 * On-demand AI risk assessment for a claim, backed by a real Gemini call on the server
 * (POST /api/claims/[id]/fraud-check). Nothing runs until the user clicks the button, to
 * keep usage of the free API quota intentional rather than automatic on every page view.
 */
export function FraudRiskCard({ claimId }: FraudRiskCardProps) {
  const [state, setState] = React.useState<LoadState>({ status: "idle" });

  async function runAnalysis() {
    setState({ status: "loading" });
    try {
      const response = await fetch(`/api/claims/${claimId}/fraud-check`, { method: "POST" });
      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        setState({
          status: "error",
          reason: payload?.reason ?? "The AI analysis could not be completed.",
        });
        return;
      }

      setState({ status: "success", result: payload.result });
    } catch {
      setState({ status: "error", reason: "Network error — could not reach the AI service." });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5">
          <Sparkles className="size-4 text-primary" aria-hidden="true" />
          AI risk analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {state.status === "idle" ? (
          <>
            <p className="text-sm text-muted-foreground">
              Run an AI-assisted fraud-risk read of this claim&apos;s details.
            </p>
            <Button type="button" size="sm" variant="outline" onClick={runAnalysis}>
              <Sparkles className="size-3.5" aria-hidden="true" />
              Run AI risk analysis
            </Button>
          </>
        ) : null}

        {state.status === "loading" ? (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Analyzing claim details…
          </p>
        ) : null}

        {state.status === "error" ? (
          <div className="flex flex-col gap-2">
            <p className="flex items-start gap-2 text-sm text-critical">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {state.reason}
            </p>
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="self-start"
              onClick={runAnalysis}
            >
              Try again
            </Button>
          </div>
        ) : null}

        {state.status === "success" ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={cn("gap-1.5 border px-2 py-0.5", RISK_LEVEL_CLASSES[state.result.riskLevel])}
              >
                <ShieldQuestion className="size-3" aria-hidden="true" />
                {RISK_LEVEL_LABEL[state.result.riskLevel]}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Score {Math.round(state.result.riskScore)}/100
              </span>
            </div>
            <p className="text-sm text-foreground">{state.result.summary}</p>
            <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
              {state.result.signals.map((signal) => (
                <li key={signal} className="flex items-start gap-1.5">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground" />
                  {signal}
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground/80">
              AI-generated, illustrative only — not a real fraud determination.
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
