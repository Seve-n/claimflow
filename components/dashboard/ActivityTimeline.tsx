import Link from "next/link";
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
import { getClaimById } from "@/lib/mock-data";
import type { Activity, ActivityType } from "@/types";

interface ActivityTimelineProps {
  activity: Activity[];
}

const ACTIVITY_ICON: Record<ActivityType, LucideIcon> = {
  claim_created: FilePlus2,
  document_uploaded: Upload,
  status_changed: RefreshCcw,
  message_sent: MessageSquare,
  review_started: ClipboardCheck,
  claim_assigned: UserCheck,
  claim_resolved: CheckCircle2,
};

/** Chronological feed of the most recent activity across all of the user's claims. */
export function ActivityTimeline({ activity }: ActivityTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="flex flex-col gap-4">
          {activity.map((entry, index) => {
            const Icon = ACTIVITY_ICON[entry.type];
            const claim = getClaimById(entry.claimId);
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
                  <p className="text-xs text-muted-foreground">
                    {formatDateFR(entry.timestamp, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                    {claim ? (
                      <>
                        {" · "}
                        <Link href={`/claims/${claim.id}`} className="hover:text-foreground hover:underline">
                          {claim.reference}
                        </Link>
                      </>
                    ) : null}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
