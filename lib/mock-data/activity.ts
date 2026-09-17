import type { Activity } from "@/types";

/**
 * Chronological activity log entries per claim: claim created, document uploaded,
 * status changed, message sent, review started (see PROJECT_BRIEF_FULL.md section 10).
 */
export const mockActivity: Activity[] = [
  // CLM-2026-00124 — water damage, under_review
  {
    id: "act-001",
    claimId: "clm-2026-00124",
    type: "claim_created",
    title: "Claim submitted",
    description: "Your claim was successfully submitted.",
    timestamp: "2026-09-12T08:41:00.000Z",
  },
  {
    id: "act-002",
    claimId: "clm-2026-00124",
    type: "document_uploaded",
    title: "Document uploaded",
    description: "Incident_photos.zip was uploaded.",
    timestamp: "2026-09-12T08:50:00.000Z",
  },
  {
    id: "act-003",
    claimId: "clm-2026-00124",
    type: "document_uploaded",
    title: "Document uploaded",
    description: "Purchase_invoice.pdf was uploaded.",
    timestamp: "2026-09-12T09:05:00.000Z",
  },
  {
    id: "act-004",
    claimId: "clm-2026-00124",
    type: "message_sent",
    title: "Message received",
    description: "Sophie Laurent sent a message about your claim.",
    timestamp: "2026-09-12T15:00:00.000Z",
  },
  {
    id: "act-005",
    claimId: "clm-2026-00124",
    type: "review_started",
    title: "Initial review started",
    description: "Our claims team began reviewing the information provided.",
    timestamp: "2026-09-13T09:00:00.000Z",
  },
  {
    id: "act-006",
    claimId: "clm-2026-00124",
    type: "status_changed",
    title: "Status updated to Under review",
    description: "Your claim was assigned to an expert for further review.",
    timestamp: "2026-09-13T14:05:00.000Z",
  },

  // CLM-2026-00118 — home burglary, awaiting_documents
  {
    id: "act-007",
    claimId: "clm-2026-00118",
    type: "claim_created",
    title: "Claim submitted",
    description: "Your claim was successfully submitted.",
    timestamp: "2026-09-05T10:15:00.000Z",
  },
  {
    id: "act-008",
    claimId: "clm-2026-00118",
    type: "document_uploaded",
    title: "Document uploaded",
    description: "Police_report.pdf was uploaded.",
    timestamp: "2026-09-05T10:30:00.000Z",
  },
  {
    id: "act-009",
    claimId: "clm-2026-00118",
    type: "document_uploaded",
    title: "Document uploaded",
    description: "Incident_photos.zip was uploaded.",
    timestamp: "2026-09-05T10:35:00.000Z",
  },
  {
    id: "act-010",
    claimId: "clm-2026-00118",
    type: "claim_assigned",
    title: "Claim assigned to an expert",
    description: "Sophie Laurent was assigned as your claims handler.",
    timestamp: "2026-09-06T09:00:00.000Z",
  },
  {
    id: "act-011",
    claimId: "clm-2026-00118",
    type: "status_changed",
    title: "Status updated to Awaiting documents",
    description: "A repair estimate is needed to continue processing your claim.",
    timestamp: "2026-09-08T09:30:00.000Z",
  },
  {
    id: "act-012",
    claimId: "clm-2026-00118",
    type: "message_sent",
    title: "Message received",
    description: "Sophie Laurent requested a repair estimate.",
    timestamp: "2026-09-08T09:30:00.000Z",
  },

  // CLM-2026-00097 — vehicle damage, resolved
  {
    id: "act-013",
    claimId: "clm-2026-00097",
    type: "claim_created",
    title: "Claim submitted",
    description: "Your claim was successfully submitted.",
    timestamp: "2026-08-21T11:00:00.000Z",
  },
  {
    id: "act-014",
    claimId: "clm-2026-00097",
    type: "document_uploaded",
    title: "Document uploaded",
    description: "Incident_photos.zip was uploaded.",
    timestamp: "2026-08-21T11:10:00.000Z",
  },
  {
    id: "act-015",
    claimId: "clm-2026-00097",
    type: "review_started",
    title: "Initial review started",
    description: "Our claims team began reviewing the information provided.",
    timestamp: "2026-08-22T08:30:00.000Z",
  },
  {
    id: "act-016",
    claimId: "clm-2026-00097",
    type: "document_uploaded",
    title: "Document uploaded",
    description: "Repair_estimate.pdf was uploaded.",
    timestamp: "2026-08-22T09:00:00.000Z",
  },
  {
    id: "act-017",
    claimId: "clm-2026-00097",
    type: "status_changed",
    title: "Status updated to Decision pending",
    description: "The assessment is complete and a decision is being finalized.",
    timestamp: "2026-08-26T10:00:00.000Z",
  },
  {
    id: "act-018",
    claimId: "clm-2026-00097",
    type: "claim_resolved",
    title: "Claim resolved",
    description: "Your claim was approved and the payout was processed.",
    timestamp: "2026-08-29T16:20:00.000Z",
  },

  // CLM-2026-00131 — glass breakage, assessment
  {
    id: "act-019",
    claimId: "clm-2026-00131",
    type: "claim_created",
    title: "Claim submitted",
    description: "Your claim was successfully submitted.",
    timestamp: "2026-09-15T13:10:00.000Z",
  },
  {
    id: "act-020",
    claimId: "clm-2026-00131",
    type: "document_uploaded",
    title: "Document uploaded",
    description: "Incident_photos.zip was uploaded.",
    timestamp: "2026-09-15T13:20:00.000Z",
  },
  {
    id: "act-021",
    claimId: "clm-2026-00131",
    type: "review_started",
    title: "Assessment started",
    description: "An assessor is reviewing the damage to determine next steps.",
    timestamp: "2026-09-16T09:00:00.000Z",
  },

  // Lightweight trails for the older resolved claims
  {
    id: "act-022",
    claimId: "clm-2026-00080",
    type: "claim_created",
    title: "Claim submitted",
    description: "Your claim was successfully submitted.",
    timestamp: "2026-07-03T08:00:00.000Z",
  },
  {
    id: "act-023",
    claimId: "clm-2026-00080",
    type: "claim_resolved",
    title: "Claim resolved",
    description: "Your claim was approved and the payout was processed.",
    timestamp: "2026-07-18T15:40:00.000Z",
  },
  {
    id: "act-024",
    claimId: "clm-2026-00065",
    type: "claim_created",
    title: "Claim submitted",
    description: "Your claim was successfully submitted.",
    timestamp: "2026-05-15T09:20:00.000Z",
  },
  {
    id: "act-025",
    claimId: "clm-2026-00065",
    type: "claim_resolved",
    title: "Claim resolved",
    description: "Your claim was approved and the payout was processed.",
    timestamp: "2026-05-27T11:00:00.000Z",
  },
  {
    id: "act-026",
    claimId: "clm-2026-00052",
    type: "claim_created",
    title: "Claim submitted",
    description: "Your claim was successfully submitted.",
    timestamp: "2026-03-23T10:00:00.000Z",
  },
  {
    id: "act-027",
    claimId: "clm-2026-00052",
    type: "claim_resolved",
    title: "Claim resolved",
    description: "Your claim was approved and the payout was processed.",
    timestamp: "2026-04-02T14:15:00.000Z",
  },
  {
    id: "act-028",
    claimId: "clm-2026-00041",
    type: "claim_created",
    title: "Claim submitted",
    description: "Your claim was successfully submitted.",
    timestamp: "2026-02-09T09:00:00.000Z",
  },
  {
    id: "act-029",
    claimId: "clm-2026-00041",
    type: "claim_resolved",
    title: "Claim resolved",
    description: "Your claim was approved and the payout was processed.",
    timestamp: "2026-02-20T16:00:00.000Z",
  },
];

export function getActivityByClaimId(claimId: string): Activity[] {
  return mockActivity
    .filter((entry) => entry.claimId === claimId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function getRecentActivity(limit = 5): Activity[] {
  return [...mockActivity]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}
