import { Badge } from "@/components/ui/badge";
import { cn, getStatusMeta } from "@/lib/utils";
import type { ClaimStatus } from "@/types";

interface StatusBadgeProps {
  status: ClaimStatus;
  className?: string;
}

/**
 * Renders a claim status as a labeled, iconed pill using the design system's
 * status color tokens. Status is never conveyed by color alone.
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  const meta = getStatusMeta(status);
  const Icon = meta.icon;

  return (
    <Badge
      variant="outline"
      className={cn("gap-1.5 border px-2 py-0.5 font-medium", meta.colorClasses, className)}
    >
      <Icon className="size-3" aria-hidden="true" />
      {meta.label}
    </Badge>
  );
}
