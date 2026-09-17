"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth";
import { personalInfoSchema, type PersonalInfoValues } from "@/lib/validations/settings";

const STORAGE_KEY = "claimflow.settings.personalInfo";

function readStoredValues(base: PersonalInfoValues): PersonalInfoValues {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    return { ...base, ...(JSON.parse(raw) as Partial<PersonalInfoValues>) };
  } catch {
    return base;
  }
}

/** Personal information form, prefilled from the mock user and saved to localStorage (demo only). */
export function PersonalInfoSection() {
  const { user } = useAuth();

  const defaultValues = React.useMemo<PersonalInfoValues>(() => {
    const base: PersonalInfoValues = {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      address: user?.address ?? "",
    };
    if (typeof window === "undefined") return base;
    return readStoredValues(base);
  }, [user]);

  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues,
  });

  function onSubmit(values: PersonalInfoValues) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {
      // localStorage may be unavailable (e.g. private browsing) — the demo still works in-session.
    }
    toast.success("Personal information updated");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal information</CardTitle>
        <CardDescription>
          Update your contact details. Changes are saved locally for this demo, not to a real backend.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" aria-invalid={!!form.formState.errors.firstName} {...form.register("firstName")} />
              {form.formState.errors.firstName ? (
                <p className="text-sm text-critical">{form.formState.errors.firstName.message}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" aria-invalid={!!form.formState.errors.lastName} {...form.register("lastName")} />
              {form.formState.errors.lastName ? (
                <p className="text-sm text-critical">{form.formState.errors.lastName.message}</p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" aria-invalid={!!form.formState.errors.email} {...form.register("email")} />
            {form.formState.errors.email ? (
              <p className="text-sm text-critical">{form.formState.errors.email.message}</p>
            ) : null}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" aria-invalid={!!form.formState.errors.phone} {...form.register("phone")} />
            {form.formState.errors.phone ? (
              <p className="text-sm text-critical">{form.formState.errors.phone.message}</p>
            ) : null}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="address">Address</Label>
            <Input id="address" aria-invalid={!!form.formState.errors.address} {...form.register("address")} />
            {form.formState.errors.address ? (
              <p className="text-sm text-critical">{form.formState.errors.address.message}</p>
            ) : null}
          </div>

          <div>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              Save changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
