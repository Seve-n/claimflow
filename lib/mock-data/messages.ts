import type { Message, MessageSender } from "@/types";
import { MOCK_USER_ID } from "./user";

const SOPHIE: MessageSender = {
  id: "agent-sophie-laurent",
  name: "Sophie Laurent",
  role: "agent",
};

const THOMAS: MessageSender = {
  id: MOCK_USER_ID,
  name: "Thomas Martin",
  role: "customer",
};

/**
 * 3 conversations, matching the examples in PROJECT_BRIEF_FULL.md sections 10 and 13:
 * claim CLM-2026-00124, claim CLM-2026-00118, and general support.
 */
export const mockMessages: Message[] = [
  // Conversation 1 — CLM-2026-00124 (water damage, under_review)
  {
    id: "msg-001",
    claimId: "clm-2026-00124",
    sender: SOPHIE,
    content:
      "Hello Thomas, we have received your claim and are currently reviewing the submitted information.",
    timestamp: "2026-09-12T15:00:00.000Z",
    read: true,
  },
  {
    id: "msg-002",
    claimId: "clm-2026-00124",
    sender: THOMAS,
    content: "Thank you. Please let me know if you need anything else.",
    timestamp: "2026-09-12T15:22:00.000Z",
    read: true,
  },
  {
    id: "msg-003",
    claimId: "clm-2026-00124",
    sender: SOPHIE,
    content:
      "We've assigned your claim to our assessment team. We'll be in touch as soon as there's an update — usually within a few business days.",
    timestamp: "2026-09-13T14:05:00.000Z",
    read: false,
  },

  // Conversation 2 — CLM-2026-00118 (home burglary, awaiting_documents)
  {
    id: "msg-004",
    claimId: "clm-2026-00118",
    sender: SOPHIE,
    content:
      "Hello Thomas, thank you for reporting the burglary and for the police report. To continue processing your claim, could you please upload a repair estimate for the forced door?",
    timestamp: "2026-09-08T09:30:00.000Z",
    read: false,
  },
  {
    id: "msg-005",
    claimId: "clm-2026-00118",
    sender: THOMAS,
    content: "Of course, I'll get an estimate from a locksmith this week and upload it here.",
    timestamp: "2026-09-08T18:47:00.000Z",
    read: true,
  },

  // Conversation 3 — General support (not tied to a claim)
  {
    id: "msg-006",
    claimId: null,
    sender: SOPHIE,
    content:
      "Welcome to ClaimFlow, Thomas! If you ever have a general question that isn't about a specific claim, you can reach us here.",
    timestamp: "2026-09-01T10:00:00.000Z",
    read: true,
  },
  {
    id: "msg-007",
    claimId: null,
    sender: THOMAS,
    content: "Thanks — quick question, can I update my address from my account settings?",
    timestamp: "2026-09-01T10:12:00.000Z",
    read: true,
  },
  {
    id: "msg-008",
    claimId: null,
    sender: SOPHIE,
    content: "Yes, you can update it any time from the Settings page under Personal information.",
    timestamp: "2026-09-01T10:20:00.000Z",
    read: true,
  },
];

export function getMessagesByClaimId(claimId: string): Message[] {
  return mockMessages.filter((message) => message.claimId === claimId);
}

export function getGeneralSupportMessages(): Message[] {
  return mockMessages.filter((message) => message.claimId === null);
}
