"use client";

import { motion } from "framer-motion";

/** Simple trust statement — no fake certifications, partners, or customer counts. */
export function TrustSection() {
  return (
    <section className="border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mx-auto max-w-2xl px-4 py-16 text-center md:px-6 md:py-20"
      >
        <h2 className="font-[family-name:var(--font-editorial)] text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          Designed for clarity, built for confidence.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Every claim, document and message lives in one place — so you always know exactly where
          things stand.
        </p>
      </motion.div>
    </section>
  );
}
