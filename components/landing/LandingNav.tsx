import Link from "next/link";
import { Button } from "@/components/ui/button";

/** Public top nav for the landing page — distinct from the authenticated app Sidebar. */
export function LandingNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-editorial)] text-lg font-medium tracking-tight text-foreground"
        >
          ClaimFlow
        </Link>

        <nav className="flex items-center gap-2" aria-label="Primary">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-none"
            nativeButton={false}
            render={<Link href="/login" />}
          >
            Login
          </Button>
          <Button
            size="sm"
            className="rounded-none"
            nativeButton={false}
            render={<Link href="/signup" />}
          >
            Get started
          </Button>
        </nav>
      </div>
    </header>
  );
}
