export { cn } from "cn";

import {
  CheckCircle2,
  Clock,
  FileClock,
  type LucideIcon,
} from "lucide-react";
import type { ClaimStatus } from "@/types";

/** Formats a number as EUR currency using Belgian French conventions, e.g. "2 450,00 €". */
export function formatEUR(amount: number): string {
  return new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

/** Formats a date using Belgian French conventions, e.g. "12 septembre 2026". */
export function formatDateFR(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  }
): string {
  const parsed = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("fr-BE", options).format(parsed);
}

/** Short numeric date, e.g. "12/09/2026". */
export function formatDateShortFR(date: string | Date): string {
  return formatDateFR(date, { day: "2-digit", month: "2-digit", year: "numeric" });
}

export interface StatusMeta {
  label: string;
  /** Background + text + border classes, built from the design system's status tokens. */
  colorClasses: string;
  /** Solid-fill classes for a small status dot. */
  dotClasses: string;
  icon: LucideIcon;
}

const STATUS_META: Record<ClaimStatus, StatusMeta> = {
  submitted: {
    label: "Submitted",
    colorClasses: "bg-info-bg text-info border-info-border",
    dotClasses: "bg-info",
    icon: Clock,
  },
  under_review: {
    label: "Under review",
    colorClasses: "bg-info-bg text-info border-info-border",
    dotClasses: "bg-info",
    icon: Clock,
  },
  assessment: {
    label: "Assessment",
    colorClasses: "bg-info-bg text-info border-info-border",
    dotClasses: "bg-info",
    icon: FileClock,
  },
  decision_pending: {
    label: "Decision pending",
    colorClasses: "bg-info-bg text-info border-info-border",
    dotClasses: "bg-info",
    icon: FileClock,
  },
  awaiting_documents: {
    label: "Awaiting documents",
    colorClasses: "bg-warning-bg text-warning border-warning-border",
    dotClasses: "bg-warning",
    icon: Clock,
  },
  resolved: {
    label: "Resolved",
    colorClasses: "bg-success-bg text-success border-success-border",
    dotClasses: "bg-success",
    icon: CheckCircle2,
  },
  closed: {
    label: "Closed",
    colorClasses: "bg-muted text-muted-foreground border-border",
    dotClasses: "bg-muted-foreground",
    icon: CheckCircle2,
  },
};

/** Returns the label, color classes and icon used to render a claim status consistently everywhere. */
export function getStatusMeta(status: ClaimStatus): StatusMeta {
  return STATUS_META[status];
}

/** Returns up to 2 uppercase initials from a person's first and last name, for avatar fallbacks. */
export function getInitials(firstName: string, lastName: string): string {
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
}
