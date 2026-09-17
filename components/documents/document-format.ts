import {
  CheckCircle2,
  Clock,
  FileArchive,
  FileText,
  Image as ImageIcon,
  UploadCloud,
  type LucideIcon,
} from "lucide-react";
import type { DocumentFileType, DocumentStatus } from "@/types";

/** Formats a byte count as a short human-readable size, e.g. "412 KB" or "8.4 MB". */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[unitIndex]}`;
}

interface FileTypeMeta {
  label: string;
  icon: LucideIcon;
}

const FILE_TYPE_META: Record<DocumentFileType, FileTypeMeta> = {
  zip: { label: "ZIP archive", icon: FileArchive },
  pdf: { label: "PDF document", icon: FileText },
  jpg: { label: "JPG image", icon: ImageIcon },
  png: { label: "PNG image", icon: ImageIcon },
  docx: { label: "Word document", icon: FileText },
};

/** Returns the label + icon used to render a document's file type consistently. */
export function getFileTypeMeta(type: DocumentFileType): FileTypeMeta {
  return FILE_TYPE_META[type];
}

interface DocumentStatusMeta {
  label: string;
  colorClasses: string;
  icon: LucideIcon;
}

const DOCUMENT_STATUS_META: Record<DocumentStatus, DocumentStatusMeta> = {
  uploaded: {
    label: "Uploaded",
    colorClasses: "bg-info-bg text-info border-info-border",
    icon: UploadCloud,
  },
  pending_review: {
    label: "Pending review",
    colorClasses: "bg-warning-bg text-warning border-warning-border",
    icon: Clock,
  },
  verified: {
    label: "Verified",
    colorClasses: "bg-success-bg text-success border-success-border",
    icon: CheckCircle2,
  },
};

/** Returns the label + color classes + icon used to render a document status consistently. */
export function getDocumentStatusMeta(status: DocumentStatus): DocumentStatusMeta {
  return DOCUMENT_STATUS_META[status];
}

/** Best-effort file type guess from an uploaded file's name, for the mock upload dialog. */
export function guessFileType(fileName: string): DocumentFileType {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "zip":
      return "zip";
    case "pdf":
      return "pdf";
    case "jpg":
    case "jpeg":
      return "jpg";
    case "png":
      return "png";
    case "docx":
    case "doc":
      return "docx";
    default:
      return "pdf";
  }
}
