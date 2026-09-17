import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";

interface SuccessScreenProps {
  reference: string;
}

/**
 * Shown after a successful (simulated) claim submission. There is no backend, so the new
 * claim isn't persisted into the mock dataset — "View claim" opens an existing example
 * claim (CLM-2026-00124) to demonstrate what the detail page looks like for a real claim.
 */
export function SuccessScreen({ reference }: SuccessScreenProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-success-bg text-success">
        <CheckCircle2 className="size-7" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1.5">
        <h2 className="font-heading text-xl font-semibold text-foreground">
          Your claim has been submitted
        </h2>
        <p className="max-w-md text-sm text-muted-foreground">
          We&apos;ve received your claim. You can follow its progress from your claims
          dashboard.
        </p>
      </div>

      <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-muted/30 px-6 py-4">
        <span className="text-xs text-muted-foreground">Claim reference</span>
        <span className="font-heading text-lg font-semibold text-foreground">{reference}</span>
        <StatusBadge status="submitted" />
      </div>

      <p className="max-w-md text-sm text-muted-foreground">
        Next step: our claims team will review the information you provided and reach out
        if anything else is needed — usually within a few business days.
      </p>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          variant="outline"
          render={<Link href="/claims/clm-2026-00124" />}
          nativeButton={false}
        >
          View claim
        </Button>
        <Button render={<Link href="/dashboard" />} nativeButton={false}>
          Back to dashboard
        </Button>
      </div>
    </div>
  );
}
