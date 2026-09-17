"use client";

import * as React from "react";
import { ClaimHeader } from "./ClaimHeader";
import { ClaimStepper } from "./ClaimStepper";
import { ClaimOverviewCard } from "./ClaimOverviewCard";
import { ClaimDocumentsSection } from "./ClaimDocumentsSection";
import { ClaimMessagesPanel } from "./ClaimMessagesPanel";
import { ClaimActivitySection } from "./ClaimActivitySection";
import { ClaimSidebar } from "./ClaimSidebar";
import { UploadDocumentDialog } from "./UploadDocumentDialog";
import { mockUser } from "@/lib/mock-data";
import type { Activity, Claim, Document, Message, MessageSender } from "@/types";

interface ClaimDetailClientProps {
  claim: Claim;
  initialDocuments: Document[];
  initialMessages: Message[];
  activity: Activity[];
}

const CUSTOMER_SENDER: MessageSender = {
  id: mockUser.id,
  name: `${mockUser.firstName} ${mockUser.lastName}`,
  role: "customer",
};

/**
 * Client-side orchestrator for the claim detail page. Holds the local (non-persisted)
 * state for documents and messages, since this portfolio project has no real backend.
 */
export function ClaimDetailClient({
  claim,
  initialDocuments,
  initialMessages,
  activity,
}: ClaimDetailClientProps) {
  const [documents, setDocuments] = React.useState(initialDocuments);
  const [messages, setMessages] = React.useState(initialMessages);
  const [isUploadOpen, setIsUploadOpen] = React.useState(false);

  function handleDocumentUploaded(document: Document) {
    setDocuments((prev) => [document, ...prev]);
  }

  function handleSendMessage(content: string) {
    const message: Message = {
      id: `msg-local-${Date.now()}`,
      claimId: claim.id,
      sender: CUSTOMER_SENDER,
      content,
      timestamp: new Date().toISOString(),
      read: true,
    };
    setMessages((prev) => [...prev, message]);
  }

  return (
    <div className="flex flex-col gap-6">
      <ClaimHeader claim={claim} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <ClaimStepper claim={claim} activity={activity} />
          <ClaimOverviewCard claim={claim} />
          <ClaimDocumentsSection
            documents={documents}
            isAwaitingDocuments={claim.status === "awaiting_documents"}
            onRequestUpload={() => setIsUploadOpen(true)}
          />
          <ClaimMessagesPanel messages={messages} onSend={handleSendMessage} />
          <ClaimActivitySection activity={activity} />
        </div>

        <ClaimSidebar claim={claim} />
      </div>

      <UploadDocumentDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        claimId={claim.id}
        onUploaded={handleDocumentUploaded}
      />
    </div>
  );
}
