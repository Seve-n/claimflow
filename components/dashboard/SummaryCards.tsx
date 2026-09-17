import { FileClock, AlertTriangle, FolderOpen, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Claim } from "@/types";

interface SummaryCardsProps {
  claims: Claim[];
  documentsCount: number;
}

const ACTIVE_STATUSES = new Set(["submitted", "under_review", "assessment", "decision_pending"]);

/** The 4 KPI cards at the top of the dashboard: active, awaiting action, documents, resolved. */
export function SummaryCards({ claims, documentsCount }: SummaryCardsProps) {
  const active = claims.filter((c) => ACTIVE_STATUSES.has(c.status)).length;
  const awaiting = claims.filter((c) => c.status === "awaiting_documents").length;
  const resolved = claims.filter((c) => c.status === "resolved").length;

  const cards = [
    {
      icon: FileClock,
      value: active,
      label: "Active claims",
      hint: active === 1 ? "1 claim being processed" : `${active} claims being processed`,
      tone: "text-info",
    },
    {
      icon: AlertTriangle,
      value: awaiting,
      label: "Awaiting action",
      hint: awaiting > 0 ? "Needs something from you" : "Nothing needed right now",
      tone: "text-warning",
    },
    {
      icon: FolderOpen,
      value: documentsCount,
      label: "Documents",
      hint: "Uploaded across all claims",
      tone: "text-foreground",
    },
    {
      icon: CheckCircle2,
      value: resolved,
      label: "Resolved claims",
      hint: "Closed out successfully",
      tone: "text-success",
    },
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{card.label}</span>
              <card.icon className={`size-4 ${card.tone}`} aria-hidden="true" />
            </div>
            <span className="font-heading text-2xl font-semibold text-foreground">
              {card.value}
            </span>
            <span className="text-xs text-muted-foreground">{card.hint}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
