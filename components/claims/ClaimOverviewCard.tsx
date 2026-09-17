import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateFR, formatEUR } from "@/lib/utils";
import { getClaimTypeMeta } from "@/components/claims/claim-type-meta";
import type { Claim } from "@/types";

interface ClaimOverviewCardProps {
  claim: Claim;
}

interface OverviewFieldProps {
  label: string;
  value: string;
}

function OverviewField({ label, value }: OverviewFieldProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

/** Claim overview: type, incident date, reported date, location, policy reference, amount, description. */
export function ClaimOverviewCard({ claim }: ClaimOverviewCardProps) {
  const typeMeta = getClaimTypeMeta(claim.type);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Claim overview</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <OverviewField label="Claim type" value={typeMeta.label} />
          <OverviewField label="Incident date" value={formatDateFR(claim.incidentDate)} />
          <OverviewField label="Reported date" value={formatDateFR(claim.reportedDate)} />
          <OverviewField label="Location" value={claim.location} />
          <OverviewField label="Policy reference" value={claim.policyReference} />
          {claim.estimatedAmount > 0 ? (
            <OverviewField label="Estimated amount" value={formatEUR(claim.estimatedAmount)} />
          ) : null}
        </div>
        <div className="flex flex-col gap-1 border-t border-border pt-4">
          <span className="text-xs text-muted-foreground">Description</span>
          <p className="text-sm leading-relaxed text-foreground">{claim.description}</p>
        </div>
        {claim.vehicleDetails ? (
          <div className="flex flex-col gap-2 border-t border-border pt-4">
            <span className="text-xs text-muted-foreground">Vehicle details</span>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <OverviewField label="Make" value={claim.vehicleDetails.make} />
              <OverviewField label="Model" value={claim.vehicleDetails.model} />
              <OverviewField label="Registration" value={claim.vehicleDetails.registration} />
              <OverviewField
                label="Other vehicle involved"
                value={claim.vehicleDetails.otherVehicleInvolved ? "Yes" : "No"}
              />
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
