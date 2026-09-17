import Link from "next/link";
import { AlertTriangle, Upload } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Claim } from "@/types";

interface ActionRequiredCardProps {
  claims: Claim[];
}

/**
 * Visually distinct card surfaced only when at least one claim is awaiting documents
 * from the customer. Links into that claim's documents section.
 */
export function ActionRequiredCard({ claims }: ActionRequiredCardProps) {
  const claimsAwaitingDocs = claims.filter((c) => c.status === "awaiting_documents");
  if (claimsAwaitingDocs.length === 0) return null;

  const [first, ...rest] = claimsAwaitingDocs;

  return (
    <Card className="border-warning-border bg-warning-bg ring-warning-border">
      <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-warning/15 text-warning">
            <AlertTriangle className="size-4" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium text-foreground">Action required</p>
            <p className="text-sm text-muted-foreground">
              Please upload the repair estimate for claim {first.reference} to keep it
              moving.
              {rest.length > 0
                ? ` (${rest.length} more claim${rest.length > 1 ? "s" : ""} also need documents.)`
                : ""}
            </p>
          </div>
        </div>
        <Button
          size="sm"
          render={<Link href={`/claims/${first.id}#documents`} />}
          nativeButton={false}
        >
          <Upload className="size-3.5" aria-hidden="true" />
          Upload document
        </Button>
      </CardContent>
    </Card>
  );
}
