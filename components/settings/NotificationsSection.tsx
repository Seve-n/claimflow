"use client";

import * as React from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const STORAGE_KEY = "claimflow.settings.notifications";

interface NotificationPrefs {
  email: boolean;
  claimUpdates: boolean;
  documentReminders: boolean;
  marketing: boolean;
}

const DEFAULT_PREFS: NotificationPrefs = {
  email: true,
  claimUpdates: true,
  documentReminders: true,
  marketing: false,
};

function readPrefs(): NotificationPrefs {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_PREFS, ...(JSON.parse(raw) as Partial<NotificationPrefs>) } : DEFAULT_PREFS;
  } catch {
    return DEFAULT_PREFS;
  }
}

const TOGGLES: { key: keyof NotificationPrefs; label: string; description: string }[] = [
  { key: "email", label: "Email notifications", description: "General account emails from ClaimFlow." },
  { key: "claimUpdates", label: "Claim updates", description: "Get notified when a claim's status changes." },
  {
    key: "documentReminders",
    label: "Document reminders",
    description: "Reminders when a claim is awaiting documents.",
  },
  { key: "marketing", label: "Marketing communications", description: "Occasional product news and tips." },
];

/** 4 notification toggles, persisted to localStorage (demo only — no real notifications are sent). */
export function NotificationsSection() {
  const [prefs, setPrefs] = React.useState<NotificationPrefs>(() =>
    typeof window === "undefined" ? DEFAULT_PREFS : readPrefs()
  );

  function handleToggle(key: keyof NotificationPrefs, checked: boolean) {
    const next = { ...prefs, [key]: checked };
    setPrefs(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore — demo still works in-session
    }
    const toggle = TOGGLES.find((item) => item.key === key);
    toast.success(`${toggle?.label ?? "Preference"} ${checked ? "enabled" : "disabled"}`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification preferences</CardTitle>
        <CardDescription>Choose what ClaimFlow notifies you about.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {TOGGLES.map((toggle) => (
          <div
            key={toggle.key}
            className="flex items-center justify-between gap-4 rounded-lg border border-border px-3 py-3"
          >
            <div className="flex flex-col gap-0.5">
              <Label htmlFor={toggle.key}>{toggle.label}</Label>
              <p className="text-xs text-muted-foreground">{toggle.description}</p>
            </div>
            <Switch
              id={toggle.key}
              checked={prefs[toggle.key]}
              onCheckedChange={(checked) => handleToggle(toggle.key, checked)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
