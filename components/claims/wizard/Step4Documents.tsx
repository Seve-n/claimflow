"use client";

import * as React from "react";
import { ArrowLeft, FileImage, FileText, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  ACCEPTED_FILE_TYPES,
  MAX_FILE_SIZE_BYTES,
  claimFileSchema,
} from "@/lib/validations/claim-new";
import type { WizardFile } from "./wizard-types";

interface Step4DocumentsProps {
  files: WizardFile[];
  onFilesChange: (files: WizardFile[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const PROGRESS_TICK_MS = 180;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png"]);

function isImageFile(file: File): boolean {
  return IMAGE_TYPES.has(file.type);
}

function formatFileSize(bytes: number): string {
  if (bytes < 1_000_000) return `${(bytes / 1000).toFixed(0)} KB`;
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}

/** Step 4 — mock file upload: drag/drop or click-to-browse, previews, simulated progress, validation. */
export function Step4Documents({ files, onFilesChange, onNext, onBack }: Step4DocumentsProps) {
  const [isDraggingOver, setIsDraggingOver] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function simulateProgress(fileId: string) {
    const interval = setInterval(() => {
      onFilesChange(
        filesRef.current.map((entry) => {
          if (entry.id !== fileId || entry.status !== "uploading") return entry;
          const nextProgress = Math.min(entry.progress + Math.random() * 30 + 15, 100);
          return {
            ...entry,
            progress: nextProgress,
            status: nextProgress >= 100 ? "done" : "uploading",
          };
        })
      );
    }, PROGRESS_TICK_MS);

    setTimeout(() => clearInterval(interval), PROGRESS_TICK_MS * 8);
  }

  // Keep a ref mirror of the latest files so the setInterval callback above always
  // reads current state instead of a stale closure.
  const filesRef = React.useRef(files);
  React.useEffect(() => {
    filesRef.current = files;
  }, [files]);

  function addFiles(fileList: FileList | File[]) {
    const incoming = Array.from(fileList);
    const accepted: WizardFile[] = [];

    for (const file of incoming) {
      const result = claimFileSchema.safeParse({
        name: file.name,
        size: file.size,
        type: file.type,
      });

      if (!result.success) {
        const message = result.error.issues[0]?.message ?? "This file can't be uploaded.";
        toast.error(`${file.name} was not added`, { description: message });
        continue;
      }

      const wizardFile: WizardFile = {
        id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        file,
        previewUrl: isImageFile(file) ? URL.createObjectURL(file) : null,
        progress: 0,
        status: "uploading",
      };
      accepted.push(wizardFile);
    }

    if (accepted.length > 0) {
      onFilesChange([...files, ...accepted]);
      accepted.forEach((f) => simulateProgress(f.id));
    }
  }

  function handleRemove(id: string) {
    const target = files.find((f) => f.id === id);
    if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
    onFilesChange(files.filter((f) => f.id !== id));
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDraggingOver(false);
    if (event.dataTransfer.files.length > 0) addFiles(event.dataTransfer.files);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-lg font-semibold text-foreground">Upload documents</h2>
        <p className="text-sm text-muted-foreground">
          Add photos, receipts, repair estimates or other supporting files. JPG, PNG, PDF or
          DOCX, up to 10 MB each.
        </p>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-10 text-center transition-colors",
          isDraggingOver ? "border-ring bg-accent" : "border-border bg-muted/30"
        )}
      >
        <Upload className="size-6 text-muted-foreground" aria-hidden="true" />
        <p className="text-sm font-medium text-foreground">
          Drag and drop files here, or{" "}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-primary underline underline-offset-2"
          >
            browse
          </button>
        </p>
        <p className="text-xs text-muted-foreground">
          Accepted: JPG, PNG, PDF, DOCX · Max {MAX_FILE_SIZE_BYTES / (1024 * 1024)} MB per file
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED_FILE_TYPES.join(",")}
          onChange={(e) => {
            if (e.target.files) addFiles(e.target.files);
            e.target.value = "";
          }}
          className="sr-only"
          aria-label="Choose files to upload"
        />
      </div>

      {files.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {files.map((wizardFile) => {
            const Icon = isImageFile(wizardFile.file) ? FileImage : FileText;
            return (
              <li
                key={wizardFile.id}
                className="flex items-center gap-3 rounded-lg border border-border p-3"
              >
                {wizardFile.previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- local object URL preview, not an optimizable remote asset
                  <img
                    src={wizardFile.previewUrl}
                    alt=""
                    className="size-10 shrink-0 rounded-md object-cover"
                  />
                ) : (
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <Icon className="size-4.5" aria-hidden="true" />
                  </div>
                )}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-foreground">
                      {wizardFile.file.name}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatFileSize(wizardFile.file.size)}
                    </span>
                  </div>
                  {wizardFile.status === "uploading" ? (
                    <Progress value={wizardFile.progress} className="h-1.5" />
                  ) : (
                    <span className="text-xs text-success">Uploaded</span>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Remove ${wizardFile.file.name}`}
                  onClick={() => handleRemove(wizardFile.id)}
                >
                  <X className="size-3.5" aria-hidden="true" />
                </Button>
              </li>
            );
          })}
        </ul>
      ) : null}

      <div className="flex justify-between border-t border-border pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back
        </Button>
        <Button type="button" onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
