"use client";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { NewClaimWizard } from "@/components/claims/wizard/NewClaimWizard";

export default function NewClaimPage() {
  return (
    <AppShell title="Report a claim">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Report a claim"
          subtitle="Tell us what happened — this takes about 5 minutes."
        />
        <NewClaimWizard />
      </div>
    </AppShell>
  );
}
