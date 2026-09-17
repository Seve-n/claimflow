"use client";

import { Bell, LogOut, Settings as SettingsIcon } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getInitials } from "@/lib/utils";
import { MobileNav } from "./MobileNav";

interface HeaderProps {
  /** Page title / breadcrumb slot shown at the left of the header. */
  title?: string;
}

/**
 * Sticky authenticated app header: hamburger nav (mobile only), title slot,
 * notification bell, user avatar menu.
 */
export function Header({ title = "ClaimFlow" }: HeaderProps) {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-background px-4 md:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <MobileNav />
        <span className="truncate text-sm font-medium text-foreground">{title}</span>
      </div>

      <div className="flex items-center gap-1.5">
        <Popover>
          <PopoverTrigger
            render={
              <Button variant="ghost" size="icon-sm" aria-label="Notifications">
                <Bell className="size-4" aria-hidden="true" />
              </Button>
            }
          />
          <PopoverContent align="end" className="w-64">
            <p className="text-sm font-medium text-foreground">Notifications</p>
            <p className="text-sm text-muted-foreground">You&apos;re all caught up.</p>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon-sm" aria-label="Account menu" className="rounded-full">
                <Avatar size="sm">
                  <AvatarFallback>{getInitials(user.firstName, user.lastName)}</AvatarFallback>
                </Avatar>
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col gap-0.5 px-1.5 py-1">
              <span className="text-sm font-medium text-foreground">
                {user.firstName} {user.lastName}
              </span>
              <span className="truncate text-xs font-normal text-muted-foreground">
                {user.email}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<Link href="/settings" />}>
              <SettingsIcon className="size-4" aria-hidden="true" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={logout}>
              <LogOut className="size-4" aria-hidden="true" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
