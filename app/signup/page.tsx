"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, TriangleAlert } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { signupSchema, type SignupFormValues } from "@/lib/validations/signup";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// The shared schema types `terms` as the literal `true` (so a checked box is required to pass
// validation), which doesn't leave room for the unchecked (`false`) initial state a real checkbox
// needs. We widen it to `boolean` for the form itself and let zodResolver's runtime validation
// (not its static type) do the actual "must be true" enforcement.
type SignupFormShape = Omit<SignupFormValues, "terms"> & { terms: boolean };

export default function SignupPage() {
  const router = useRouter();
  const { signup, isAuthenticated, isLoading } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormShape>({
    resolver: zodResolver(signupSchema) as unknown as Resolver<SignupFormShape>,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  React.useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isLoading, isAuthenticated, router]);

  const onSubmit = async (values: SignupFormShape) => {
    setFormError(null);
    try {
      await signup({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
      toast.success("Welcome to ClaimFlow", {
        description: `Your account has been created, ${values.firstName}.`,
      });
      router.push("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong. Please try again.";
      setFormError(message);
      toast.error("Sign up failed", { description: message });
    }
  };

  return (
    <AuthLayout
      panelTitle="Create your ClaimFlow account."
      panelDescription="Set up a free account to report claims, track their progress and stay in touch with your claims team."
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <h1 className="font-heading text-2xl font-semibold text-foreground">Create an account</h1>
          <p className="text-sm text-muted-foreground">
            It only takes a minute — you can also{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              try the demo instead
            </Link>
            .
          </p>
        </div>

        {formError ? (
          <Alert variant="destructive">
            <TriangleAlert aria-hidden="true" />
            <AlertDescription>{formError}</AlertDescription>
          </Alert>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="Thomas"
                className="h-10"
                aria-invalid={!!errors.firstName}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
                {...register("firstName")}
              />
              {errors.firstName ? (
                <p id="firstName-error" className="text-xs text-destructive">
                  {errors.firstName.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Martin"
                className="h-10"
                aria-invalid={!!errors.lastName}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
                {...register("lastName")}
              />
              {errors.lastName ? (
                <p id="lastName-error" className="text-xs text-destructive">
                  {errors.lastName.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="h-10"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            {errors.email ? (
              <p id="email-error" className="text-xs text-destructive">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                className="h-10 pr-9"
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : "password-hint"}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 rounded-r-lg"
              >
                {showPassword ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.password ? (
              <p id="password-error" className="text-xs text-destructive">
                {errors.password.message}
              </p>
            ) : (
              <p id="password-hint" className="text-xs text-muted-foreground">
                At least 8 characters, with an uppercase letter, a lowercase letter and a number.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                className="h-10 pr-9"
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 rounded-r-lg"
              >
                {showConfirmPassword ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.confirmPassword ? (
              <p id="confirmPassword-error" className="text-xs text-destructive">
                {errors.confirmPassword.message}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-1.5">
            <Controller
              control={control}
              name="terms"
              render={({ field }) => (
                <label className="flex items-start gap-2.5 text-sm text-foreground">
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-invalid={!!errors.terms}
                    aria-describedby={errors.terms ? "terms-error" : undefined}
                    className="mt-0.5"
                  />
                  <span>
                    I agree to the{" "}
                    <Link href="#" className="font-medium text-primary hover:underline">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="font-medium text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              )}
            />
            {errors.terms ? (
              <p id="terms-error" className="text-xs text-destructive">
                {errors.terms.message}
              </p>
            ) : null}
          </div>

          <Button type="submit" className="h-10" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
            {isSubmitting ? "Creating account…" : "Create account"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>

        <p className="text-center text-xs text-muted-foreground">
          ClaimFlow is a fictional portfolio project. All data shown is simulated.
        </p>
      </div>
    </AuthLayout>
  );
}
