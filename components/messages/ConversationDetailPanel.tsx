"use client";

import { ArrowLeft, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn, formatDateFR } from "@/lib/utils";
import type { Conversation } from "./conversation-utils";
import { MessageComposer } from "./MessageComposer";

interface ConversationDetailPanelProps {
  conversation: Conversation | null;
  onBack: () => void;
  onSend: (content: string) => void;
}

export function ConversationDetailPanel({ conversation, onBack, onSend }: ConversationDetailPanelProps) {
  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <EmptyState
          icon={MessageSquare}
          title="Select a conversation"
          description="Choose a conversation from the list to read and reply to messages."
          className="border-0"
        />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Button
          variant="ghost"
          size="icon-sm"
          className="md:hidden"
          aria-label="Back to conversations"
          onClick={onBack}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
        </Button>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-foreground">{conversation.title}</p>
          <p className="text-xs text-muted-foreground">{conversation.subtitle}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {conversation.messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">No messages yet — say hello.</p>
        ) : (
          <ol className="flex flex-col gap-4">
            {conversation.messages.map((message) => {
              const isCustomer = message.sender.role === "customer";
              return (
                <li key={message.id} className={cn("flex flex-col gap-1", isCustomer ? "items-end" : "items-start")}>
                  <span className="text-xs font-medium text-muted-foreground">{message.sender.name}</span>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-xl px-3 py-2 text-sm",
                      isCustomer ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    )}
                  >
                    {message.content}
                  </div>
                  <span className="text-[11px] text-muted-foreground">
                    {formatDateFR(message.timestamp, {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </li>
              );
            })}
          </ol>
        )}
      </div>

      <MessageComposer onSend={onSend} />
    </div>
  );
}
