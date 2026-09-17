import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatDateFR } from "@/lib/utils";
import { getClaimTypeMeta } from "@/components/claims/claim-type-meta";
import type { Claim } from "@/types";

interface ClaimHeaderProps {
  claim: Claim;
}

/** Claim detail page header: back link, reference, category, status, date submitted. */
export function ClaimHeader({ claim }: ClaimHeaderProps) {
  const typeMeta = getClaimTypeMeta(claim.type);

  return (
    <div className="flex flex-col gap-3">
      <Link
        href="/claims"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" aria-hidden="true" />
        Back to claims
      </Link>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {claim.reference}
            </h1>
            <StatusBadge status={claim.status} />
          </div>
          <p className="text-sm text-muted-foreground">
            {typeMeta.label} · Submitted {formatDateFR(claim.reportedDate)}
          </p>
        </div>
      </div>
    </div>
  );
}
