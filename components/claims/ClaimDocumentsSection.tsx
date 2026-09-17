"use client";

import { FileArchive, FileImage, FileText, ShieldAlert, Upload } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/EmptyState";
import { formatDateFR } from "@/lib/utils";
import type { Document, DocumentFileType, DocumentStatus } from "@/types";

const FILE_ICON: Record<DocumentFileType, typeof FileText> = {
  zip: FileArchive,
  pdf: FileText,
  jpg: FileImage,
  png: FileImage,
  docx: FileText,
};

const DOCUMENT_STATUS_LABEL: Record<DocumentStatus, string> = {
  uploaded: "Uploaded",
  pending_review: "Pending review",
  verified: "Verified",
};

interface ClaimDocumentsSectionProps {
  documents: Document[];
  isAwaitingDocuments: boolean;
  onRequestUpload: () => void;
}

/** Documents list for a claim, plus the highlighted "Documents requested" banner when applicable. */
export function ClaimDocumentsSection({
  documents,
  isAwaitingDocuments,
  onRequestUpload,
}: ClaimDocumentsSectionProps) {
  function handleDownload(name: string) {
    toast("Demo document — download simulated", {
      description: `${name} isn't a real file in this portfolio project.`,
    });
  }

  return (
    <Card id="documents">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Documents</CardTitle>
        <Button size="sm" variant="outline" onClick={onRequestUpload}>
          <Upload className="size-3.5" aria-hidden="true" />
          Upload document
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {isAwaitingDocuments ? (
          <div className="flex flex-col gap-3 rounded-lg border border-warning-border bg-warning-bg p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium text-foreground">Documents requested</p>
                <p className="text-sm text-muted-foreground">
                  Please provide a repair estimate to help us continue reviewing your claim.
                </p>
              </div>
            </div>
            <Button size="sm" onClick={onRequestUpload} className="shrink-0">
              Upload requested document
            </Button>
          </div>
        ) : null}

        {documents.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No documents yet"
            description="Documents you upload for this claim will appear here."
          />
        ) : (
          <ul className="flex flex-col divide-y divide-border">
            {documents.map((document) => {
              const Icon = FILE_ICON[document.type];
              return (
                <li key={document.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Icon className="size-4" aria-hidden="true" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium text-foreground">
                      {document.name}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      Uploaded {formatDateFR(document.uploadedAt)} ·{" "}
                      {(document.size / 1_000_000).toFixed(1)} MB
                    </span>
                  </div>
                  <Badge variant="outline" className="hidden shrink-0 sm:flex">
                    {DOCUMENT_STATUS_LABEL[document.status]}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="shrink-0"
                    onClick={() => handleDownload(document.name)}
                  >
                    View
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
