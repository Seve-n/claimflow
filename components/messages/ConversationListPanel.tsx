"use client";

import { FileText, LifeBuoy, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmptyState } from "@/components/shared/EmptyState";
import { cn, formatDateShortFR } from "@/lib/utils";
import type { Conversation } from "./conversation-utils";
import { getLastMessage, getUnreadCount } from "./conversation-utils";

interface ConversationListPanelProps {
  conversations: Conversation[];
  selectedId: string | null;
  search: string;
  onSearchChange: (value: string) => void;
  onSelect: (id: string) => void;
}

export function ConversationListPanel({
  conversations,
  selectedId,
  search,
  onSearchChange,
  onSelect,
}: ConversationListPanelProps) {
  const query = search.trim().toLowerCase();
  const filtered = conversations.filter((conversation) => {
    if (!query) return true;
    return (
      conversation.title.toLowerCase().includes(query) ||
      conversation.subtitle.toLowerCase().includes(query) ||
      conversation.messages.some((message) => message.content.toLowerCase().includes(query))
    );
  });

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border p-3">
        <Label htmlFor="conversation-search" className="sr-only">
          Search conversations
        </Label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="conversation-search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search conversations"
            className="pl-8"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No conversations found"
            description="Try a different search term."
            className="border-0"
          />
        ) : (
          filtered.map((conversation) => {
            const lastMessage = getLastMessage(conversation);
            const unreadCount = getUnreadCount(conversation);
            const Icon = conversation.claimId ? FileText : LifeBuoy;
            const isSelected = conversation.id === selectedId;

            return (
              <button
                key={conversation.id}
                type="button"
                onClick={() => onSelect(conversation.id)}
                aria-current={isSelected}
                className={cn(
                  "flex w-full items-start gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                  isSelected && "bg-accent"
                )}
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <Icon className="size-4" aria-hidden="true" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-foreground">{conversation.title}</p>
                    {lastMessage ? (
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {formatDateShortFR(lastMessage.timestamp)}
                      </span>
                    ) : null}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {lastMessage?.content ?? "No messages yet"}
                  </p>
                </div>
                {unreadCount > 0 ? (
                  <span
                    className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground"
                    aria-label={`${unreadCount} unread messages`}
                  >
                    {unreadCount}
                  </span>
                ) : null}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
