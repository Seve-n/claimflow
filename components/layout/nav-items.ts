import {
  FileText,
  FolderOpen,
  HelpCircle,
  LayoutDashboard,
  MessageSquare,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

/** Primary navigation, shared between the desktop Sidebar and MobileNav. */
export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My claims", href: "/claims", icon: FileText },
  { label: "Documents", href: "/documents", icon: FolderOpen },
  { label: "Messages", href: "/messages", icon: MessageSquare },
  { label: "Help & support", href: "/help", icon: HelpCircle },
  { label: "Settings", href: "/settings", icon: Settings },
];
