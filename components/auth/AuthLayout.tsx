import type { ReactNode } from "react";
import Link from "next/link";

interface AuthLayoutProps {
  children: ReactNode;
  /** Short headline shown on the brand panel (desktop only). */
  panelTitle: string;
  /** Supporting copy shown under the panel title. */
  panelDescription: string;
}

/**
 * Shared calm/premium layout for the public auth pages (login, signup,
 * forgot password): a deep-navy brand panel on desktop, stacked on mobile,
 * with the form centered in a generous whitespace column.
 */
export function AuthLayout({ children, panelTitle, panelDescription }: AuthLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-background lg:flex-row">
      <div className="hidden bg-primary px-10 py-12 lg:flex lg:w-[42%] lg:flex-col lg:justify-between">
        <Link href="/" className="font-heading text-lg font-medium tracking-tight text-primary-foreground">
          ClaimFlow
        </Link>

        <div className="flex flex-col gap-3">
          <h2 className="max-w-sm text-balance font-heading text-2xl font-medium text-primary-foreground">
            {panelTitle}
          </h2>
          <p className="max-w-sm text-sm text-primary-foreground/70">{panelDescription}</p>
        </div>

        <p className="text-xs text-primary-foreground/50">
          ClaimFlow is a fictional portfolio project. All data shown is simulated.
        </p>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-center px-6 py-6 lg:hidden">
          <Link href="/" className="font-heading text-base font-medium tracking-tight text-foreground">
            ClaimFlow
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
