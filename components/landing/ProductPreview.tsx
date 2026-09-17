"use client";

import { motion } from "framer-motion";
import {
  FileText,
  FolderOpen,
  LayoutDashboard,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { mockClaims } from "@/lib/mock-data";
import { formatDateShortFR, formatEUR } from "@/lib/utils";

const PREVIEW_CLAIMS = mockClaims.slice(0, 3);

const SUMMARY = [
  { label: "Active claims", value: "2" },
  { label: "Awaiting action", value: "1" },
  { label: "Documents", value: "8" },
  { label: "Resolved", value: "5" },
];

/**
 * A polished, non-interactive static mockup of the authenticated dashboard,
 * built from the same design tokens — not a live embed of the real route.
 */
export function ProductPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-4 md:px-6 md:py-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          A clear view of every claim
        </h2>
        <p className="mt-3 text-muted-foreground">
          Your dashboard at a glance — active claims, what needs your attention, and what&apos;s resolved.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
        className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-foreground/5 ring-1 ring-foreground/10"
        aria-hidden="true"
      >
        {/* Fake browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-critical/50" />
          <span className="size-2.5 rounded-full bg-warning/50" />
          <span className="size-2.5 rounded-full bg-success/50" />
          <span className="ml-3 truncate rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">
            app.claimflow.app/dashboard
          </span>
        </div>

        <div className="flex">
          {/* Mini static sidebar */}
          <div className="hidden w-44 shrink-0 flex-col gap-1 border-r border-sidebar-border bg-sidebar p-3 sm:flex">
            <div className="mb-2 flex items-center gap-2 px-1">
              <span className="flex size-6 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <ShieldCheck className="size-3.5" />
              </span>
              <span className="text-sm font-semibold text-sidebar-foreground">ClaimFlow</span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-sidebar-accent px-2.5 py-1.5 text-xs font-medium text-sidebar-foreground">
              <LayoutDashboard className="size-3.5" />
              Dashboard
            </div>
            <div className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium text-sidebar-foreground/60">
              <FileText className="size-3.5" />
              My claims
            </div>
            <div className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium text-sidebar-foreground/60">
              <FolderOpen className="size-3.5" />
              Documents
            </div>
            <div className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium text-sidebar-foreground/60">
              <MessageSquare className="size-3.5" />
              Messages
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 p-4 sm:p-6">
            <div className="mb-4">
              <p className="text-xs text-muted-foreground sm:text-sm">Good morning, Thomas</p>
              <p className="text-sm font-semibold text-foreground sm:text-base">
                Here&apos;s an overview of your insurance claims.
              </p>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
              {SUMMARY.map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-card px-3 py-2.5">
                  <p className="text-[0.65rem] font-medium text-muted-foreground sm:text-xs">
                    {item.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-foreground sm:text-xl">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-lg border border-border">
              <div className="hidden grid-cols-[1fr_auto_auto] gap-3 border-b border-border bg-muted/40 px-3 py-2 text-[0.65rem] font-medium text-muted-foreground sm:grid">
                <span>Claim</span>
                <span>Amount</span>
                <span>Status</span>
              </div>
              <div className="divide-y divide-border">
                {PREVIEW_CLAIMS.map((claim) => (
                  <div
                    key={claim.id}
                    className="grid grid-cols-2 items-center gap-2 px-3 py-2.5 sm:grid-cols-[1fr_auto_auto] sm:gap-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-foreground sm:text-sm">
                        {claim.reference}
                      </p>
                      <p className="truncate text-[0.65rem] text-muted-foreground sm:text-xs">
                        {claim.title} · {formatDateShortFR(claim.reportedDate)}
                      </p>
                    </div>
                    <span className="hidden text-xs text-muted-foreground sm:block">
                      {formatEUR(claim.estimatedAmount)}
                    </span>
                    <div className="justify-self-end sm:justify-self-auto">
                      <StatusBadge status={claim.status} className="text-[0.65rem]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
