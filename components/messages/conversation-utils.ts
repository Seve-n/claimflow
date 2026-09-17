import type { Message } from "@/types";
import {
  getClaimById,
  getGeneralSupportMessages,
  getMessagesByClaimId,
} from "@/lib/mock-data";

export interface Conversation {
  id: string;
  title: string;
  subtitle: string;
  claimId: string | null;
  messages: Message[];
}

const CLAIM_CONVERSATION_IDS = ["clm-2026-00124", "clm-2026-00118"] as const;

/** Builds the 3 starting conversations (2 claim threads + general support) from mock data. */
export function buildInitialConversations(): Conversation[] {
  const claimConversations: Conversation[] = CLAIM_CONVERSATION_IDS.map((claimId) => {
    const claim = getClaimById(claimId);
    return {
      id: claimId,
      title: claim?.reference ?? claimId,
      subtitle: claim?.title ?? "Claim conversation",
      claimId,
      messages: getMessagesByClaimId(claimId).map((message) => ({ ...message })),
    };
  });

  return [
    ...claimConversations,
    {
      id: "general",
      title: "General support",
      subtitle: "Not linked to a specific claim",
      claimId: null,
      messages: getGeneralSupportMessages().map((message) => ({ ...message })),
    },
  ];
}

export function getUnreadCount(conversation: Conversation): number {
  return conversation.messages.filter((message) => !message.read).length;
}

export function getLastMessage(conversation: Conversation): Message | undefined {
  return conversation.messages[conversation.messages.length - 1];
}
