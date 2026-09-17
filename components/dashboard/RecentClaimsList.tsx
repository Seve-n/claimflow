import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatDateFR } from "@/lib/utils";
import { getClaimTypeMeta } from "@/components/claims/claim-type-meta";
import type { Claim } from "@/types";

interface RecentClaimsListProps {
  claims: Claim[];
}

/** A compact list of the most recently reported claims, linking into each claim's detail page. */
export function RecentClaimsList({ claims }: RecentClaimsListProps) {
  const recent = [...claims]
    .sort((a, b) => new Date(b.reportedDate).getTime() - new Date(a.reportedDate).getTime())
    .slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Recent claims</CardTitle>
        <Button size="sm" variant="ghost" render={<Link href="/claims" />} nativeButton={false}>
          View all
          <ChevronRight className="size-3.5" aria-hidden="true" />
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col divide-y divide-border">
        {recent.map((claim) => {
          const typeMeta = getClaimTypeMeta(claim.type);
          const Icon = typeMeta.icon;
          return (
            <Link
              key={claim.id}
              href={`/claims/${claim.id}`}
              className="flex items-center gap-3 py-3 text-sm transition-colors first:pt-1 last:pb-1 hover:bg-muted/50 -mx-2 px-2 rounded-lg"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Icon className="size-4" aria-hidden="true" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate font-medium text-foreground">{typeMeta.label}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {claim.reference} · Reported {formatDateFR(claim.reportedDate)}
                </span>
              </div>
              <StatusBadge status={claim.status} className="hidden shrink-0 sm:flex" />
              <ChevronRight
                className="size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
