import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Source_Serif_4 } from "next/font/google";
import { AuthProvider } from "@/lib/auth";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Kept so the --font-geist-mono variable referenced by app/globals.css stays defined.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Editorial serif, used only for the public landing page's display headings.
const sourceSerif = Source_Serif_4({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "ClaimFlow — Insurance claims, made simple",
  description:
    "ClaimFlow is a fictional insurance claims portfolio project. Report, track and manage your claims from one clear, secure workspace.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${geistMono.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AuthProvider>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
