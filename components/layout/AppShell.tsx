"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { MotionConfig, motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { DashboardSkeleton } from "@/components/shared/LoadingSkeletons";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface AppShellProps {
  children: React.ReactNode;
  /** Page title shown in the header's title slot. */
  title?: string;
}

/**
 * Authenticated app shell: Sidebar + Header + main content.
 * Redirects to /login when there is no session, and shows a loading skeleton
 * while the mock auth state is still resolving from localStorage.
 */
export function AppShell({ children, title }: AppShellProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background p-6">
        <div className="w-full max-w-5xl">
          <DashboardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-dvh overflow-hidden bg-background">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header title={title} />
          <main className="flex-1 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </MotionConfig>
  );
}
