import Link from "next/link";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/** Fictional support channels for the ClaimFlow portfolio demo — no real contact endpoint. */
export function ContactSupportCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact support</CardTitle>
        <CardDescription>
          Can&apos;t find what you&apos;re looking for? Reach our fictional claims support team.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-3 rounded-lg border border-border px-3 py-3">
          <Mail className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <div className="flex flex-col">
            <p className="text-sm font-medium text-foreground">Email</p>
            <p className="text-sm text-muted-foreground">support@claimflow.app</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border px-3 py-3">
          <Phone className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <div className="flex flex-col">
            <p className="text-sm font-medium text-foreground">Phone</p>
            <p className="text-sm text-muted-foreground">+32 2 000 00 00 (Mon–Fri, 9:00–17:00)</p>
          </div>
        </div>
        <Button render={<Link href="/messages" />} className="justify-center">
          <MessageSquare className="size-4" aria-hidden="true" />
          Message the claims team
        </Button>
        <p className="text-xs text-muted-foreground">
          Fictional contact details for this portfolio demo — not a real support line.
        </p>
      </CardContent>
    </Card>
  );
}
