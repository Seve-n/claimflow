import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { WIZARD_STEP_LABELS } from "./wizard-types";

interface WizardStepperProps {
  currentStep: number;
}

/** Horizontal 5-step indicator for the new-claim wizard. */
export function WizardStepper({ currentStep }: WizardStepperProps) {
  return (
    <ol className="flex items-start justify-between gap-1" aria-label="Claim submission progress">
      {WIZARD_STEP_LABELS.map((label, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <li key={label} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex w-full items-center">
              <div
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors",
                  isCompleted && "border-primary bg-primary text-primary-foreground",
                  isCurrent && "border-primary bg-background text-primary ring-4 ring-accent",
                  !isCompleted && !isCurrent && "border-border bg-muted text-muted-foreground"
                )}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isCompleted ? <Check className="size-3.5" aria-hidden="true" /> : stepNumber}
              </div>
              {index < WIZARD_STEP_LABELS.length - 1 ? (
                <div
                  className={cn("mx-1 h-px flex-1", isCompleted ? "bg-primary" : "bg-border")}
                  aria-hidden="true"
                />
              ) : null}
            </div>
            <span
              className={cn(
                "hidden text-center text-xs leading-tight sm:block",
                isCurrent ? "font-medium text-foreground" : "text-muted-foreground"
              )}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
