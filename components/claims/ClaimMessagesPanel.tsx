"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, formatDateFR, getInitials } from "@/lib/utils";
import type { Message } from "@/types";

interface ClaimMessagesPanelProps {
  messages: Message[];
  onSend: (content: string) => void;
}

/** Conversation-style messages panel between the customer and the claims team, for a single claim. */
export function ClaimMessagesPanel({ messages, onSend }: ClaimMessagesPanelProps) {
  const [draft, setDraft] = React.useState("");
  const endRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages.length]);

  function handleSend() {
    const trimmed = draft.trim();
    if (trimmed === "") return;
    onSend(trimmed);
    setDraft("");
    toast.success("Message sent");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex max-h-96 flex-col gap-3 overflow-y-auto">
          {messages.map((message) => {
            const isCustomer = message.sender.role === "customer";
            return (
              <div
                key={message.id}
                className={cn("flex items-end gap-2", isCustomer && "flex-row-reverse")}
              >
                <Avatar size="sm" className="shrink-0">
                  <AvatarFallback>
                    {getInitials(
                      message.sender.name.split(" ")[0] ?? "",
                      message.sender.name.split(" ")[1] ?? ""
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "flex max-w-[80%] flex-col gap-1 rounded-xl px-3 py-2",
                    isCustomer
                      ? "rounded-br-sm bg-primary text-primary-foreground"
                      : "rounded-bl-sm bg-muted text-foreground"
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <span
                    className={cn(
                      "text-[11px]",
                      isCustomer ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}
                  >
                    {message.sender.name} · {formatDateFR(message.timestamp)}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>

        <div className="flex flex-col gap-2 border-t border-border pt-3 sm:flex-row sm:items-end">
          <Textarea
            aria-label="Write a message"
            placeholder="Write a message to the claims team…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-10 flex-1 resize-none"
          />
          <Button type="button" onClick={handleSend} disabled={draft.trim() === ""} className="shrink-0">
            <Send className="size-3.5" aria-hidden="true" />
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
