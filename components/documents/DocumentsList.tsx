"use client";

import Link from "next/link";
import { Download, Eye } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateFR } from "@/lib/utils";
import { getClaimById } from "@/lib/mock-data";
import type { Document } from "@/types";
import { DocumentStatusBadge } from "./DocumentStatusBadge";
import { formatFileSize, getFileTypeMeta } from "./document-format";

interface DocumentsListProps {
  documents: Document[];
}

function handleDownload(name: string) {
  toast.info("Demo document", {
    description: `"${name}" — download simulated. This portfolio project doesn't store real files.`,
  });
}

function ClaimLink({ claimId }: { claimId: string }) {
  const claim = getClaimById(claimId);
  if (!claim) return <span className="text-muted-foreground">—</span>;
  return (
    <Link href={`/claims/${claim.id}`} className="text-primary hover:underline">
      {claim.reference}
    </Link>
  );
}

function DocumentDetailsDialog({ doc }: { doc: Document }) {
  const claim = getClaimById(doc.claimId);
  const typeMeta = getFileTypeMeta(doc.type);
  const TypeIcon = typeMeta.icon;

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`View details for ${doc.name}`}
            title="View details"
          />
        }
      >
        <Eye className="size-4" aria-hidden="true" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <TypeIcon className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <DialogTitle className="truncate">{doc.name}</DialogTitle>
          </div>
          <DialogDescription>Document details — demo data only.</DialogDescription>
        </DialogHeader>
        <dl className="flex flex-col gap-2 text-sm">
          <div className="flex items-center justify-between gap-2">
            <dt className="text-muted-foreground">Type</dt>
            <dd className="font-medium text-foreground">{typeMeta.label}</dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-muted-foreground">Related claim</dt>
            <dd className="font-medium text-foreground">
              {claim ? (
                <Link href={`/claims/${claim.id}`} className="text-primary hover:underline">
                  {claim.reference}
                </Link>
              ) : (
                "—"
              )}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-muted-foreground">Uploaded</dt>
            <dd className="font-medium text-foreground">{formatDateFR(doc.uploadedAt)}</dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-muted-foreground">Size</dt>
            <dd className="font-medium text-foreground">{formatFileSize(doc.size)}</dd>
          </div>
          <div className="flex items-center justify-between gap-2">
            <dt className="text-muted-foreground">Status</dt>
            <dd>
              <DocumentStatusBadge status={doc.status} />
            </dd>
          </div>
        </dl>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleDownload(doc.name)}>
            <Download className="size-4" aria-hidden="true" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/** Documents list: a table on md+ viewports, a card list on mobile. Same data, two layouts. */
export function DocumentsList({ documents }: DocumentsListProps) {
  return (
    <>
      <Card className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File</TableHead>
              <TableHead>Claim</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => {
              const typeMeta = getFileTypeMeta(doc.type);
              const TypeIcon = typeMeta.icon;
              return (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <TypeIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                      <div className="flex flex-col">
                        <span className="font-medium text-foreground">{doc.name}</span>
                        <span className="text-xs text-muted-foreground">{typeMeta.label}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <ClaimLink claimId={doc.claimId} />
                  </TableCell>
                  <TableCell>{formatDateFR(doc.uploadedAt)}</TableCell>
                  <TableCell>{formatFileSize(doc.size)}</TableCell>
                  <TableCell>
                    <DocumentStatusBadge status={doc.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <DocumentDetailsDialog doc={doc} />
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Download ${doc.name}`}
                        title="Download"
                        onClick={() => handleDownload(doc.name)}
                      >
                        <Download className="size-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      <div className="flex flex-col gap-3 md:hidden">
        {documents.map((doc) => {
          const typeMeta = getFileTypeMeta(doc.type);
          const TypeIcon = typeMeta.icon;
          return (
            <Card key={doc.id}>
              <CardContent className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <TypeIcon className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{doc.name}</span>
                      <span className="text-xs text-muted-foreground">{typeMeta.label}</span>
                    </div>
                  </div>
                  <DocumentStatusBadge status={doc.status} />
                </div>
                <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
                  <dt className="text-muted-foreground">Claim</dt>
                  <dd className="text-right">
                    <ClaimLink claimId={doc.claimId} />
                  </dd>
                  <dt className="text-muted-foreground">Uploaded</dt>
                  <dd className="text-right text-foreground">{formatDateFR(doc.uploadedAt)}</dd>
                  <dt className="text-muted-foreground">Size</dt>
                  <dd className="text-right text-foreground">{formatFileSize(doc.size)}</dd>
                </dl>
                <div className="flex items-center justify-end gap-1 border-t border-border pt-2">
                  <DocumentDetailsDialog doc={doc} />
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Download ${doc.name}`}
                    title="Download"
                    onClick={() => handleDownload(doc.name)}
                  >
                    <Download className="size-4" aria-hidden="true" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
