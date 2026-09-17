// Shared domain types for ClaimFlow. Field names follow PROJECT_BRIEF_FULL.md section 16 (DATA MODEL).

/** A ClaimFlow customer. Auth is mocked client-side — see lib/auth.ts. */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  phone: string;
  address: string;
  createdAt: string;
}

/** The lifecycle status of a claim. See PROJECT_BRIEF.md "Status → color mapping". */
export type ClaimStatus =
  | "submitted"
  | "under_review"
  | "awaiting_documents"
  | "assessment"
  | "decision_pending"
  | "resolved"
  | "closed";

/** The category of incident a claim was filed for. */
export type ClaimType =
  | "water_damage"
  | "fire_damage"
  | "theft_burglary"
  | "glass_breakage"
  | "vehicle_damage"
  | "personal_injury"
  | "other";

/** Vehicle-specific details, only present on vehicle_damage claims (see step 3 of the new-claim wizard). */
export interface VehicleDetails {
  make: string;
  model: string;
  registration: string;
  otherVehicleInvolved: boolean;
}

export interface Claim {
  id: string;
  reference: string;
  userId: string;
  type: ClaimType;
  title: string;
  description: string;
  incidentDate: string;
  reportedDate: string;
  location: string;
  status: ClaimStatus;
  estimatedAmount: number;
  policyReference: string;
  assignedHandler: string;
  createdAt: string;
  updatedAt: string;
  /** Optional extras used by the claim detail page; not part of the core data model. */
  vehicleDetails?: VehicleDetails;
  isPropertySafe?: boolean;
  emergencyActionTaken?: boolean;
}

export type DocumentFileType = "zip" | "pdf" | "jpg" | "png" | "docx";

export type DocumentStatus = "uploaded" | "pending_review" | "verified";

export interface Document {
  id: string;
  claimId: string;
  name: string;
  type: DocumentFileType;
  size: number;
  uploadedAt: string;
  status: DocumentStatus;
  url: string;
}

export type MessageSenderRole = "customer" | "agent";

export interface MessageSender {
  id: string;
  name: string;
  role: MessageSenderRole;
}

export interface Message {
  id: string;
  /** Null for the general-support conversation, which is not tied to a specific claim. */
  claimId: string | null;
  sender: MessageSender;
  content: string;
  timestamp: string;
  read: boolean;
}

export type ActivityType =
  | "claim_created"
  | "document_uploaded"
  | "status_changed"
  | "message_sent"
  | "review_started"
  | "claim_assigned"
  | "claim_resolved";

export interface Activity {
  id: string;
  claimId: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
