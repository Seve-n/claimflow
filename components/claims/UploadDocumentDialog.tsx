"use client";

import * as React from "react";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Document, DocumentFileType } from "@/types";

interface UploadDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  claimId: string;
  onUploaded: (document: Document) => void;
}

const SIMULATED_UPLOAD_DELAY_MS = 900;

function inferFileType(fileName: string): DocumentFileType {
  const extension = fileName.split(".").pop()?.toLowerCase();
  if (extension === "pdf") return "pdf";
  if (extension === "docx") return "docx";
  if (extension === "png") return "png";
  if (extension === "zip") return "zip";
  return "jpg";
}

/**
 * Mock "upload a requested document" dialog. There is no real backend or storage —
 * selecting a file simulates a short upload delay, then appends a document to the
 * claim's local (client-side) document list and shows a success toast.
 */
export function UploadDocumentDialog({
  open,
  onOpenChange,
  claimId,
  onUploaded,
}: UploadDocumentDialogProps) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setSelectedFile(file);
  }

  function handleClose(next: boolean) {
    if (!next) {
      setSelectedFile(null);
      setIsUploading(false);
    }
    onOpenChange(next);
  }

  function handleUpload() {
    if (!selectedFile) return;
    setIsUploading(true);
    // No real backend — this is a demo. Simulate a short network delay.
    setTimeout(() => {
      const document: Document = {
        id: `doc-local-${Date.now()}`,
        claimId,
        name: selectedFile.name,
        type: inferFileType(selectedFile.name),
        size: selectedFile.size,
        uploadedAt: new Date().toISOString(),
        status: "uploaded",
        url: "#",
      };
      onUploaded(document);
      toast.success("Document uploaded", {
        description: `${selectedFile.name} was added to your claim.`,
      });
      setIsUploading(false);
      setSelectedFile(null);
      onOpenChange(false);
    }, SIMULATED_UPLOAD_DELAY_MS);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload requested document</DialogTitle>
          <DialogDescription>
            Please provide a repair estimate to help us continue reviewing your claim.
            Accepted formats: JPG, PNG, PDF, DOCX (max 10 MB).
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Label htmlFor="requested-document">File</Label>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border px-4 py-8 text-center transition-colors hover:border-ring hover:bg-accent/50"
          >
            <Upload className="size-5 text-muted-foreground" aria-hidden="true" />
            <span className="text-sm text-muted-foreground">
              {selectedFile ? selectedFile.name : "Click to browse for a file"}
            </span>
          </button>
          <input
            id="requested-document"
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf,.docx"
            onChange={handleFileChange}
            className="sr-only"
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            disabled={!selectedFile || isUploading}
            onClick={handleUpload}
          >
            {isUploading ? (
              <>
                <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
                Uploading…
              </>
            ) : (
              "Upload document"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
