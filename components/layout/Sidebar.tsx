"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn, getInitials } from "@/lib/utils";
import { NAV_ITEMS } from "./nav-items";

/** Desktop app sidebar: wordmark, primary nav, user mini-card + logout. Hidden below the md breakpoint. */
export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="hidden shrink-0 flex-col border-r border-sidebar-border bg-sidebar md:flex md:w-60">
      <div className="flex h-14 shrink-0 items-center px-5">
        <span className="font-heading text-lg font-medium tracking-tight text-sidebar-foreground">
          ClaimFlow
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-2" aria-label="Primary">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
                isActive && "bg-sidebar-accent text-sidebar-primary"
              )}
            >
              <Icon className="size-5" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {user ? (
        <div className="flex flex-col gap-1 border-t border-sidebar-border px-3 py-3">
          <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
            <Avatar size="sm">
              <AvatarFallback className="bg-sidebar-accent text-sidebar-foreground">
                {getInitials(user.firstName, user.lastName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium text-sidebar-foreground">
                {user.firstName} {user.lastName}
              </span>
              <span className="truncate text-xs text-sidebar-foreground/60">{user.email}</span>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="justify-start gap-2 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            onClick={logout}
          >
            <LogOut className="size-4" aria-hidden="true" />
            Logout
          </Button>
        </div>
      ) : null}
    </aside>
  );
}
