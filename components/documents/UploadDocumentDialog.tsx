"use client";

import * as React from "react";
import { Paperclip, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Claim, Document } from "@/types";
import { guessFileType } from "./document-format";

interface UploadDocumentDialogProps {
  claims: Claim[];
  onUpload: (document: Document) => void;
}

/**
 * Mock document upload: picks a claim + a local file, then appends a Document to the
 * caller's client-side list. Nothing is actually sent anywhere — this is a portfolio demo.
 */
export function UploadDocumentDialog({ claims, onUpload }: UploadDocumentDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [claimId, setClaimId] = React.useState<string>(claims[0]?.id ?? "");
  const [file, setFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const inputId = React.useId();

  function resetForm() {
    setFile(null);
    setError(null);
    setClaimId(claims[0]?.id ?? "");
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!file) {
      setError("Choose a file to upload.");
      return;
    }
    if (!claimId) {
      setError("Select a claim to attach this document to.");
      return;
    }

    const newDocument: Document = {
      id: `doc-local-${Date.now()}`,
      claimId,
      name: file.name,
      type: guessFileType(file.name),
      size: file.size,
      uploadedAt: new Date().toISOString(),
      status: "uploaded",
      url: "#",
    };

    onUpload(newDocument);
    toast.success("Document uploaded", {
      description: "Demo upload — no file was actually stored.",
    });
    setOpen(false);
    resetForm();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) resetForm();
      }}
    >
      <DialogTrigger render={<Button size="sm" />}>
        <UploadCloud className="size-4" aria-hidden="true" />
        Upload document
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload a document</DialogTitle>
          <DialogDescription>
            Attach a supporting file to one of your claims. This is a demo — files are not
            actually stored or transmitted.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${inputId}-claim`}>Claim</Label>
            <Select value={claimId} onValueChange={(value) => setClaimId(value as string)}>
              <SelectTrigger id={`${inputId}-claim`} className="w-full">
                <SelectValue placeholder="Select a claim" />
              </SelectTrigger>
              <SelectContent>
                {claims.map((claim) => (
                  <SelectItem key={claim.id} value={claim.id}>
                    {claim.reference} — {claim.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${inputId}-file`}>File</Label>
            <div className="flex items-center gap-2 rounded-lg border border-dashed border-input px-3 py-2">
              <Paperclip className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                id={`${inputId}-file`}
                type="file"
                className="w-full text-sm text-foreground file:mr-2 file:rounded-md file:border-0 file:bg-secondary file:px-2 file:py-1 file:text-xs file:font-medium file:text-secondary-foreground"
                onChange={(event) => {
                  setFile(event.target.files?.[0] ?? null);
                  setError(null);
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Any file works for this demo — nothing is uploaded to a server.
            </p>
          </div>

          {error ? <p className="text-sm text-critical">{error}</p> : null}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Upload</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
