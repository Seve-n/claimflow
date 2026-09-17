"use client";

import * as React from "react";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface MessageComposerProps {
  onSend: (content: string) => void;
}

/** Textarea + send button. Submits on button click or Enter (Shift+Enter for a newline). */
export function MessageComposer({ onSend }: MessageComposerProps) {
  const [value, setValue] = React.useState("");
  const textareaId = React.useId();

  function submit() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  }

  return (
    <form
      className="flex items-end gap-2 border-t border-border p-3"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <div className="flex-1">
        <Label htmlFor={textareaId} className="sr-only">
          Write a message
        </Label>
        <Textarea
          id={textareaId}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Write a message…"
          className="max-h-32 min-h-10 resize-none"
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submit();
            }
          }}
        />
      </div>
      <Button type="submit" size="icon" aria-label="Send message" disabled={!value.trim()}>
        <SendHorizonal className="size-4" aria-hidden="true" />
      </Button>
    </form>
  );
}
