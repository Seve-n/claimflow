import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatDateFR } from "@/lib/utils";
import type { Activity, Claim, ClaimStatus } from "@/types";

/** Which step (1-5) each claim status currently sits at. */
const STATUS_STEP_INDEX: Record<ClaimStatus, number> = {
  submitted: 1,
  under_review: 2,
  awaiting_documents: 2,
  assessment: 3,
  decision_pending: 4,
  resolved: 5,
  closed: 5,
};

interface StepDefinition {
  id: number;
  title: string;
  completedDescription: string;
  currentDescription: string;
  futureDescription: string;
  /** Keywords matched against this claim's activity titles to find a date for this step. */
  dateKeywords: string[];
}

const STEP_DEFINITIONS: StepDefinition[] = [
  {
    id: 1,
    title: "Claim submitted",
    completedDescription: "Your claim was successfully submitted.",
    currentDescription: "Your claim was successfully submitted.",
    futureDescription: "Your claim has not been submitted yet.",
    dateKeywords: ["submitted"],
  },
  {
    id: 2,
    title: "Initial review",
    completedDescription: "Our claims team reviewed the information you provided.",
    currentDescription: "Our claims team is reviewing the information provided.",
    futureDescription: "This step hasn't started yet.",
    dateKeywords: ["initial review"],
  },
  {
    id: 3,
    title: "Assessment",
    completedDescription: "The damage assessment for your claim was completed.",
    currentDescription: "An assessment may be required before the claim can proceed.",
    futureDescription: "This step hasn't started yet.",
    dateKeywords: ["assessment"],
  },
  {
    id: 4,
    title: "Decision",
    completedDescription: "A decision was reached on your claim.",
    currentDescription: "We're finalizing a decision on your claim.",
    futureDescription: "This step hasn't started yet.",
    dateKeywords: ["decision"],
  },
  {
    id: 5,
    title: "Payment / closure",
    completedDescription: "Your claim was resolved and any payment was processed.",
    currentDescription: "Finalizing payment and closing out your claim.",
    futureDescription: "This step hasn't started yet.",
    dateKeywords: ["resolved", "closed"],
  },
];

function findStepDate(activity: Activity[], keywords: string[]): string | null {
  const match = activity.find((entry) =>
    keywords.some((keyword) => entry.title.toLowerCase().includes(keyword))
  );
  return match ? match.timestamp : null;
}

interface ClaimStepperProps {
  claim: Claim;
  activity: Activity[];
}

/** Visual 5-step progress stepper derived from the claim's status and activity log. */
export function ClaimStepper({ claim, activity }: ClaimStepperProps) {
  const currentStep = STATUS_STEP_INDEX[claim.status];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Claim progress</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="flex flex-col gap-0">
          {STEP_DEFINITIONS.map((step, index) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isFuture = step.id > currentStep;
            const date = findStepDate(activity, step.dateKeywords);
            const isAwaitingDocsBlocker = isCurrent && claim.status === "awaiting_documents" && step.id === 2;

            const description = isAwaitingDocsBlocker
              ? "We're waiting on a document from you before we can continue the review."
              : isCompleted
                ? step.completedDescription
                : isCurrent
                  ? step.currentDescription
                  : step.futureDescription;

            return (
              <li key={step.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                      isCompleted && "border-success bg-success text-success-foreground",
                      isCurrent &&
                        !isAwaitingDocsBlocker &&
                        "border-info bg-info-bg text-info ring-4 ring-info-bg",
                      isAwaitingDocsBlocker &&
                        "border-warning bg-warning-bg text-warning ring-4 ring-warning-bg",
                      isFuture && "border-border bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? <Check className="size-3.5" aria-hidden="true" /> : step.id}
                  </div>
                  {index < STEP_DEFINITIONS.length - 1 ? (
                    <div
                      className={cn(
                        "mt-1 w-px flex-1",
                        isCompleted ? "bg-success" : "bg-border"
                      )}
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
                <div className={cn("flex flex-col gap-0.5 pb-6", isFuture && "opacity-60")}>
                  <p className="text-sm font-medium text-foreground">{step.title}</p>
                  <p className="text-sm text-muted-foreground">{description}</p>
                  {date ? (
                    <p className="text-xs text-muted-foreground">{formatDateFR(date)}</p>
                  ) : isCurrent ? (
                    <p className="text-xs font-medium text-info">In progress</p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
