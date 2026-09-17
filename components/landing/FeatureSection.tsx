"use client";

import { motion } from "framer-motion";
import { Activity, ClipboardList, FolderLock, MessageSquare, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: ClipboardList,
    title: "Simple claim reporting",
    description: "Report an incident in minutes with a clear, guided step-by-step form.",
  },
  {
    icon: Activity,
    title: "Transparent claim tracking",
    description: "Follow every claim's progress on a visual timeline, from submission to resolution.",
  },
  {
    icon: FolderLock,
    title: "Secure document management",
    description: "Upload, organize and retrieve the documents tied to each of your claims in one place.",
  },
  {
    icon: MessageSquare,
    title: "Clear communication",
    description: "Message your claims team directly and keep every conversation on record.",
  },
];

/** Four-feature grid: icon + title + short copy, fading in as the section enters the viewport. */
export function FeatureSection() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Everything you need to manage a claim
        </h2>
        <p className="mt-3 text-muted-foreground">
          From first report to final resolution — clear at every step.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.25, delay: i * 0.06, ease: "easeOut" }}
          >
            <Card className="h-full">
              <CardContent className="flex flex-col gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <feature.icon className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
