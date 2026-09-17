import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Get started", href: "/signup" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help & support", href: "/help" },
      { label: "Login", href: "/login" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

/** Public footer: product/support/legal link columns plus the mandatory fictional-project disclaimer. */
export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-2 sm:col-span-1">
            <Link
              href="/"
              className="font-[family-name:var(--font-editorial)] text-base font-medium tracking-tight text-foreground"
            >
              ClaimFlow
            </Link>
            <p className="text-sm text-muted-foreground">Insurance claims, made simple.</p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-2.5">
              <p className="text-sm font-medium text-foreground">{column.title}</p>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <p className="text-xs text-muted-foreground">
          ClaimFlow is a fictional portfolio project. All data shown is simulated.
        </p>
      </div>
    </footer>
  );
}
