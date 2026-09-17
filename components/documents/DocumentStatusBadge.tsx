import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { DocumentStatus } from "@/types";
import { getDocumentStatusMeta } from "./document-format";

interface DocumentStatusBadgeProps {
  status: DocumentStatus;
  className?: string;
}

/** Renders a document's status as a labeled, iconed pill — mirrors StatusBadge for claims. */
export function DocumentStatusBadge({ status, className }: DocumentStatusBadgeProps) {
  const meta = getDocumentStatusMeta(status);
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
