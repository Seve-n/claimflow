"use client";

import * as React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import type { Message, MessageSender } from "@/types";
import { ConversationDetailPanel } from "@/components/messages/ConversationDetailPanel";
import { ConversationListPanel } from "@/components/messages/ConversationListPanel";
import { buildInitialConversations, type Conversation } from "@/components/messages/conversation-utils";

export default function MessagesPage() {
  const { user } = useAuth();
  // The first conversation is selected by default, so it starts pre-marked as read —
  // this avoids needing a mount effect just to mark it read a moment after render.
  const [conversations, setConversations] = React.useState<Conversation[]>(() => {
    const initial = buildInitialConversations();
    const [first, ...rest] = initial;
    if (!first) return initial;
    return [{ ...first, messages: first.messages.map((message) => ({ ...message, read: true })) }, ...rest];
  });
  const [selectedId, setSelectedId] = React.useState<string | null>(() => conversations[0]?.id ?? null);
  const [mobileDetailOpen, setMobileDetailOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  function markConversationRead(id: string) {
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === id
          ? { ...conversation, messages: conversation.messages.map((message) => ({ ...message, read: true })) }
          : conversation
      )
    );
  }

  function handleSelect(id: string) {
    setSelectedId(id);
    setMobileDetailOpen(true);
    markConversationRead(id);
  }

  function handleSend(content: string) {
    if (!selectedId) return;
    const sender: MessageSender = {
      id: user?.id ?? "usr-current",
      name: user ? `${user.firstName} ${user.lastName}` : "You",
      role: "customer",
    };
    const newMessage: Message = {
      id: `msg-local-${Date.now()}`,
      claimId: conversations.find((conversation) => conversation.id === selectedId)?.claimId ?? null,
      sender,
      content,
      timestamp: new Date().toISOString(),
      read: true,
    };
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === selectedId
          ? { ...conversation, messages: [...conversation.messages, newMessage] }
          : conversation
      )
    );
  }

  const selectedConversation = conversations.find((conversation) => conversation.id === selectedId) ?? null;

  return (
    <AppShell title="Messages">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Messages"
          subtitle="Chat with our claims team about any of your claims, or reach general support."
        />

        <div className="flex h-[70vh] min-h-[420px] max-h-[720px] overflow-hidden rounded-xl border border-border bg-card">
          <div className={cn("flex w-full flex-col md:w-80 md:shrink-0 md:border-r md:border-border", mobileDetailOpen && "hidden md:flex")}>
            <ConversationListPanel
              conversations={conversations}
              selectedId={selectedId}
              search={search}
              onSearchChange={setSearch}
              onSelect={handleSelect}
            />
          </div>
          <div className={cn("flex w-full flex-1 flex-col", !mobileDetailOpen && "hidden md:flex")}>
            <ConversationDetailPanel
              conversation={selectedConversation}
              onBack={() => setMobileDetailOpen(false)}
              onSend={handleSend}
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
