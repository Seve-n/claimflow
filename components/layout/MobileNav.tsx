"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn, getInitials } from "@/lib/utils";
import { NAV_ITEMS } from "./nav-items";

/**
 * Hamburger button + slide-in nav sheet, rendered inside Header's sticky mobile header row.
 * Hidden at the md breakpoint and up, where the desktop Sidebar takes over.
 */
export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Open navigation"
            className="md:hidden"
          />
        }
      >
        <Menu className="size-5" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex w-64 flex-col gap-0 bg-sidebar p-0 text-sidebar-foreground"
      >
        <SheetHeader className="border-b border-sidebar-border">
          <SheetTitle className="flex items-center gap-2 text-sidebar-foreground">
            <span className="flex size-7 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
              <ShieldCheck className="size-4" aria-hidden="true" />
            </span>
            ClaimFlow
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-1 flex-col gap-1 px-3 py-2" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
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
                <span className="truncate text-xs text-sidebar-foreground/60">
                  {user.email}
                </span>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="justify-start gap-2 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              onClick={() => {
                setOpen(false);
                logout();
              }}
            >
              <LogOut className="size-4" aria-hidden="true" />
              Logout
            </Button>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
