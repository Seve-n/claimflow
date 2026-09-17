"use client";

import Link from "next/link";
import { FilePlus2 } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { mockClaims, mockDocuments, getRecentActivity } from "@/lib/mock-data";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { RecentClaimsList } from "@/components/dashboard/RecentClaimsList";
import { ActionRequiredCard } from "@/components/dashboard/ActionRequiredCard";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { ClaimsStatusChart } from "@/components/dashboard/ClaimsStatusChart";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = user?.firstName ?? "there";
  const recentActivity = getRecentActivity(6);

  return (
    <AppShell title="Dashboard">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {getGreeting()}, {firstName}
            </h1>
            <p className="text-sm text-muted-foreground">
              Here&apos;s an overview of your insurance claims.
            </p>
          </div>
          <Button render={<Link href="/claims/new" />} nativeButton={false} className="shrink-0">
            <FilePlus2 className="size-4" aria-hidden="true" />
            Report a claim
          </Button>
        </div>

        <SummaryCards claims={mockClaims} documentsCount={mockDocuments.length} />

        <ActionRequiredCard claims={mockClaims} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <RecentClaimsList claims={mockClaims} />
            <ClaimsStatusChart claims={mockClaims} />
          </div>
          <ActivityTimeline activity={recentActivity} />
        </div>
      </div>
    </AppShell>
  );
}
