"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Laptop, LogOut, ShieldCheck, Smartphone, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { changePasswordSchema, type ChangePasswordValues } from "@/lib/validations/settings";

interface MockSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current?: boolean;
  icon: LucideIcon;
}

const MOCK_SESSIONS: MockSession[] = [
  { id: "session-1", device: "Chrome on Windows", location: "Brussels, Belgium", lastActive: "Active now", current: true, icon: Laptop },
  { id: "session-2", device: "Safari on iPhone", location: "Brussels, Belgium", lastActive: "2 hours ago", icon: Smartphone },
  { id: "session-3", device: "Chrome on macOS", location: "Antwerp, Belgium", lastActive: "3 days ago", icon: Laptop },
];

/** Change password, a visual-only 2FA toggle, and a mock active-sessions list. All demo data. */
export function SecuritySection() {
  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmNewPassword: "" },
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);

  function onSubmit() {
    toast.success("Password updated", { description: "Demo only — no real password was changed." });
    form.reset();
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Change password</CardTitle>
          <CardDescription>Choose a new password for your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="currentPassword">Current password</Label>
              <Input
                id="currentPassword"
                type="password"
                autoComplete="current-password"
                aria-invalid={!!form.formState.errors.currentPassword}
                {...form.register("currentPassword")}
              />
              {form.formState.errors.currentPassword ? (
                <p className="text-sm text-critical">{form.formState.errors.currentPassword.message}</p>
              ) : null}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="newPassword">New password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={!!form.formState.errors.newPassword}
                  {...form.register("newPassword")}
                />
                {form.formState.errors.newPassword ? (
                  <p className="text-sm text-critical">{form.formState.errors.newPassword.message}</p>
                ) : null}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="confirmNewPassword">Confirm new password</Label>
                <Input
                  id="confirmNewPassword"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={!!form.formState.errors.confirmNewPassword}
                  {...form.register("confirmNewPassword")}
                />
                {form.formState.errors.confirmNewPassword ? (
                  <p className="text-sm text-critical">{form.formState.errors.confirmNewPassword.message}</p>
                ) : null}
              </div>
            </div>
            <div>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Update password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-factor authentication (demo preview)</CardTitle>
          <CardDescription>
            Visual preview only — this portfolio demo does not implement real two-factor authentication.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4 rounded-lg border border-border px-3 py-3">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-5 text-muted-foreground" aria-hidden="true" />
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-medium text-foreground">Authenticator app</p>
                <p className="text-xs text-muted-foreground">
                  {twoFactorEnabled ? "Enabled for this demo account." : "Not enabled."}
                </p>
              </div>
            </div>
            <Switch
              aria-label="Toggle two-factor authentication demo preview"
              checked={twoFactorEnabled}
              onCheckedChange={(checked) => {
                setTwoFactorEnabled(checked);
                toast.info(
                  checked
                    ? "Two-factor authentication enabled (demo preview)"
                    : "Two-factor authentication disabled (demo preview)"
                );
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active sessions</CardTitle>
          <CardDescription>Devices currently signed in to your account (mock data).</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {MOCK_SESSIONS.map((session) => {
            const Icon = session.icon;
            return (
              <div
                key={session.id}
                className="flex items-center justify-between gap-4 rounded-lg border border-border px-3 py-3"
              >
                <div className="flex items-start gap-3">
                  <Icon className="mt-0.5 size-5 text-muted-foreground" aria-hidden="true" />
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{session.device}</p>
                      {session.current ? <Badge variant="secondary">This device</Badge> : null}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {session.location} · {session.lastActive}
                    </p>
                  </div>
                </div>
                {!session.current ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      toast.success("Session signed out", {
                        description: `${session.device} was signed out (demo only).`,
                      })
                    }
                  >
                    <LogOut className="size-4" aria-hidden="true" />
                    Sign out
                  </Button>
                ) : null}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
