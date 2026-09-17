"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CLAIM_TYPE_ORDER, getClaimTypeMeta } from "@/components/claims/claim-type-meta";
import type { ClaimType } from "@/types";

interface Step1ClaimTypeProps {
  value: ClaimType | null;
  onNext: (claimType: ClaimType) => void;
}

/** Step 1 — "What happened?": select the claim type from 7 illustrated cards. */
export function Step1ClaimType({ value, onNext }: Step1ClaimTypeProps) {
  const [selected, setSelected] = React.useState<ClaimType | null>(value);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-lg font-semibold text-foreground">What happened?</h2>
        <p className="text-sm text-muted-foreground">
          Choose the option that best describes your claim.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CLAIM_TYPE_ORDER.map((type) => {
          const meta = getClaimTypeMeta(type);
          const Icon = meta.icon;
          const isSelected = selected === type;

          return (
            <button
              key={type}
              type="button"
              onClick={() => setSelected(type)}
              aria-pressed={isSelected}
              className={cn(
                "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all hover:border-ring hover:bg-accent/50",
                isSelected
                  ? "border-primary bg-accent ring-1 ring-primary"
                  : "border-border bg-card"
              )}
            >
              <div
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                )}
              >
                <Icon className="size-4.5" aria-hidden="true" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-foreground">{meta.label}</span>
                <span className="text-xs text-muted-foreground">{meta.description}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end border-t border-border pt-4">
        <Button
          type="button"
          disabled={!selected}
          onClick={() => selected && onNext(selected)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
