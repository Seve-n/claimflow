import {
  FilePlus2,
  Upload,
  RefreshCcw,
  MessageSquare,
  ClipboardCheck,
  UserCheck,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateFR } from "@/lib/utils";
import type { Activity, ActivityType } from "@/types";

const ACTIVITY_ICON: Record<ActivityType, LucideIcon> = {
  claim_created: FilePlus2,
  document_uploaded: Upload,
  status_changed: RefreshCcw,
  message_sent: MessageSquare,
  review_started: ClipboardCheck,
  claim_assigned: UserCheck,
  claim_resolved: CheckCircle2,
};

interface ClaimActivitySectionProps {
  activity: Activity[];
}

/** Chronological activity history for a single claim. */
export function ClaimActivitySection({ activity }: ClaimActivitySectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="flex flex-col gap-4">
          {activity.map((entry, index) => {
            const Icon = ACTIVITY_ICON[entry.type];
            return (
              <li key={entry.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Icon className="size-3.5" aria-hidden="true" />
                  </div>
                  {index < activity.length - 1 ? (
                    <div className="mt-1 w-px flex-1 bg-border" aria-hidden="true" />
                  ) : null}
                </div>
                <div className="flex flex-col gap-0.5 pb-4">
                  <p className="text-sm font-medium text-foreground">{entry.title}</p>
                  <p className="text-sm text-muted-foreground">{entry.description}</p>
                  <p className="text-xs text-muted-foreground">{formatDateFR(entry.timestamp)}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
