import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Public top nav for the landing page — distinct from the authenticated app Sidebar. */
export function LandingNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <ShieldCheck className="size-4" aria-hidden="true" />
          </span>
          <span className="font-heading text-base font-semibold text-foreground">ClaimFlow</span>
        </Link>

        <nav className="flex items-center gap-2" aria-label="Primary">
          <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/login" />}>
            Login
          </Button>
          <Button size="sm" nativeButton={false} render={<Link href="/signup" />}>
            Get started
          </Button>
        </nav>
      </div>
    </header>
  );
}
