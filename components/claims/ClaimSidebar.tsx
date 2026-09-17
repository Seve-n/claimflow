import Link from "next/link";
import { CalendarDays, Mail, Phone, ShieldAlert } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDateFR, formatEUR, getInitials } from "@/lib/utils";
import { FraudRiskCard } from "./FraudRiskCard";
import type { Claim } from "@/types";

interface ClaimSidebarProps {
  claim: Claim;
}

function SummaryCard({ claim }: { claim: Claim }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Claim summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between gap-3">
          <span className="text-muted-foreground">Reference</span>
          <span className="font-medium text-foreground">{claim.reference}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span className="text-muted-foreground">Policy</span>
          <span className="font-medium text-foreground">{claim.policyReference}</span>
        </div>
        {claim.estimatedAmount > 0 ? (
          <div className="flex justify-between gap-3">
            <span className="text-muted-foreground">Estimated amount</span>
            <span className="font-medium text-foreground">{formatEUR(claim.estimatedAmount)}</span>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function HandlerCard({ handler }: { handler: string }) {
  const [name] = handler.split(",");
  const [firstName, lastName = ""] = name.trim().split(" ");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assigned handler</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>{getInitials(firstName, lastName)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{name.trim()}</span>
          <span className="text-xs text-muted-foreground">Claims Support Team</span>
        </div>
      </CardContent>
    </Card>
  );
}

function ContactSupportCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact support</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button
          variant="outline"
          size="sm"
          className="justify-start"
          render={<Link href="/messages" />}
          nativeButton={false}
        >
          <Mail className="size-3.5" aria-hidden="true" />
          Message the claims team
        </Button>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Phone className="size-3 shrink-0" aria-hidden="true" />
          +32 2 000 00 00 (fictional, demo only)
        </p>
      </CardContent>
    </Card>
  );
}

function ImportantDatesCard({ claim }: { claim: Claim }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Important dates</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-sm">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <span className="text-muted-foreground">Incident</span>
          <span className="ml-auto font-medium text-foreground">
            {formatDateFR(claim.incidentDate)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <span className="text-muted-foreground">Reported</span>
          <span className="ml-auto font-medium text-foreground">
            {formatDateFR(claim.reportedDate)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <span className="text-muted-foreground">Last updated</span>
          <span className="ml-auto font-medium text-foreground">
            {formatDateFR(claim.updatedAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function RequiredActionsCard({ claim }: { claim: Claim }) {
  if (claim.status !== "awaiting_documents") return null;

  return (
    <Card className="border-warning-border bg-warning-bg">
      <CardHeader>
        <CardTitle className="flex items-center gap-1.5 text-warning">
          <ShieldAlert className="size-4" aria-hidden="true" />
          Required action
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">
          Please upload a repair estimate so we can continue reviewing your claim.
        </p>
      </CardContent>
    </Card>
  );
}

/** Side column: summary, assigned handler, contact support, important dates, required actions. */
export function ClaimSidebar({ claim }: ClaimSidebarProps) {
  return (
    <div className="flex flex-col gap-4">
      <RequiredActionsCard claim={claim} />
      <SummaryCard claim={claim} />
      <FraudRiskCard claimId={claim.id} />
      <HandlerCard handler={claim.assignedHandler} />
      <ContactSupportCard />
      <ImportantDatesCard claim={claim} />
    </div>
  );
}
