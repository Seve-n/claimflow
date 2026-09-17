"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut", delay: i * 0.08 },
  }),
};

/** Landing page hero: headline, subtitle, primary CTAs. Above-the-fold, so it animates in on mount. */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-accent/70 via-accent/10 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center md:px-6 md:py-28">
        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeUp}
          className="text-balance font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
        >
          Insurance claims, made simple.
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="max-w-xl text-balance text-lg text-muted-foreground"
        >
          Report, track and manage your claims from one clear, secure workspace.
        </motion.p>
        <motion.div
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Button
            size="lg"
            className="h-11 px-6"
            nativeButton={false}
            render={<Link href="/signup" />}
          >
            Get started
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-11 px-6"
            nativeButton={false}
            render={<Link href="/login" />}
          >
            <PlayCircle className="size-4" aria-hidden="true" />
            Explore demo
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
