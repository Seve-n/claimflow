"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
});
type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

/** Simulated password-recovery flow: no real email is ever sent, this is fictional/local only. */
export default function ForgotPasswordPage() {
  const [submittedEmail, setSubmittedEmail] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    // Simulated latency only — nothing is sent anywhere.
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSubmittedEmail(values.email);
  };

  return (
    <AuthLayout
      panelTitle="We'll help you get back in."
      panelDescription="Password recovery is simulated for this portfolio project — no real email is ever sent."
    >
      {submittedEmail ? (
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-success-bg">
            <CheckCircle2 className="size-6 text-success" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h1 className="font-heading text-2xl font-semibold text-foreground">Check your email</h1>
            <p className="text-sm text-muted-foreground">
              If an account exists for{" "}
              <span className="font-medium text-foreground">{submittedEmail}</span>, you&apos;ll
              receive a link to reset your password shortly.
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            This is a simulated flow — ClaimFlow is a fictional portfolio project and no real email
            is sent.
          </p>
          <Button
            variant="outline"
            className="mt-2 h-10"
            nativeButton={false}
            render={<Link href="/login" />}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to login
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <h1 className="font-heading text-2xl font-semibold text-foreground">
              Forgot your password?
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter the email address linked to your account and we&apos;ll send you a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-10 pl-8"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email")}
                />
              </div>
              {errors.email ? (
                <p id="email-error" className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              ) : null}
            </div>

            <Button type="submit" className="h-10" disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
              {isSubmitting ? "Sending…" : "Send reset link"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            <Link
              href="/login"
              className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              Back to login
            </Link>
          </p>
        </div>
      )}
    </AuthLayout>
  );
}
