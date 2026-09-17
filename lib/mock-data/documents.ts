import type { Document } from "@/types";

/**
 * 8 documents across claims, matching the dashboard's "Documents" summary card
 * and the examples in PROJECT_BRIEF_FULL.md section 10.
 */
export const mockDocuments: Document[] = [
  // CLM-2026-00124 — water damage, under_review
  {
    id: "doc-001",
    claimId: "clm-2026-00124",
    name: "Incident_photos.zip",
    type: "zip",
    size: 8_400_000,
    uploadedAt: "2026-09-12T08:50:00.000Z",
    status: "verified",
    url: "/mock-files/Incident_photos.zip",
  },
  {
    id: "doc-002",
    claimId: "clm-2026-00124",
    name: "Purchase_invoice.pdf",
    type: "pdf",
    size: 412_000,
    uploadedAt: "2026-09-12T09:05:00.000Z",
    status: "uploaded",
    url: "/mock-files/Purchase_invoice.pdf",
  },

  // CLM-2026-00118 — home burglary, awaiting_documents (repair estimate still requested)
  {
    id: "doc-003",
    claimId: "clm-2026-00118",
    name: "Police_report.pdf",
    type: "pdf",
    size: 265_000,
    uploadedAt: "2026-09-05T10:30:00.000Z",
    status: "verified",
    url: "/mock-files/Police_report.pdf",
  },
  {
    id: "doc-004",
    claimId: "clm-2026-00118",
    name: "Incident_photos.zip",
    type: "zip",
    size: 5_100_000,
    uploadedAt: "2026-09-05T10:35:00.000Z",
    status: "uploaded",
    url: "/mock-files/Incident_photos.zip",
  },

  // CLM-2026-00097 — vehicle damage, resolved
  {
    id: "doc-005",
    claimId: "clm-2026-00097",
    name: "Repair_estimate.pdf",
    type: "pdf",
    size: 190_000,
    uploadedAt: "2026-08-22T09:00:00.000Z",
    status: "verified",
    url: "/mock-files/Repair_estimate.pdf",
  },
  {
    id: "doc-006",
    claimId: "clm-2026-00097",
    name: "Incident_photos.zip",
    type: "zip",
    size: 3_700_000,
    uploadedAt: "2026-08-21T11:10:00.000Z",
    status: "verified",
    url: "/mock-files/Incident_photos.zip",
  },

  // CLM-2026-00131 — glass breakage, assessment
  {
    id: "doc-007",
    claimId: "clm-2026-00131",
    name: "Incident_photos.zip",
    type: "zip",
    size: 2_200_000,
    uploadedAt: "2026-09-15T13:20:00.000Z",
    status: "uploaded",
    url: "/mock-files/Incident_photos.zip",
  },

  // CLM-2026-00080 — fire damage, resolved
  {
    id: "doc-008",
    claimId: "clm-2026-00080",
    name: "Repair_estimate.pdf",
    type: "pdf",
    size: 224_000,
    uploadedAt: "2026-07-04T08:30:00.000Z",
    status: "verified",
    url: "/mock-files/Repair_estimate.pdf",
  },
];

export function getDocumentsByClaimId(claimId: string): Document[] {
  return mockDocuments.filter((doc) => doc.claimId === claimId);
}
