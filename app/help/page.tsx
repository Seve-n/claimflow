"use client";

import * as React from "react";
import { AlertTriangle, HelpCircle, Search } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ContactSupportCard } from "@/components/help/ContactSupportCard";
import { FaqAccordion } from "@/components/help/FaqAccordion";
import { mockFaq } from "@/lib/mock-data";
import type { FaqItem } from "@/types";

export default function HelpPage() {
  const [search, setSearch] = React.useState("");

  const groupedFaq = React.useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = query
      ? mockFaq.filter(
          (item) =>
            item.question.toLowerCase().includes(query) ||
            item.answer.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        )
      : mockFaq;

    return filtered.reduce<Record<string, FaqItem[]>>((groups, item) => {
      const list = groups[item.category] ?? [];
      list.push(item);
      groups[item.category] = list;
      return groups;
    }, {});
  }, [search]);

  const categories = Object.keys(groupedFaq);
  const hasResults = categories.length > 0;

  return (
    <AppShell title="Help & support">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Help & support"
          subtitle="Find answers to common questions or get in touch with our team."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-4 lg:col-span-2">
            <div className="relative">
              <Label htmlFor="help-search" className="sr-only">
                Search help articles
              </Label>
              <Search
                className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="help-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search help articles…"
                className="pl-8"
              />
            </div>

            {hasResults ? (
              <div className="flex flex-col gap-6">
                {categories.map((category) => (
                  <div key={category} className="flex flex-col gap-2">
                    <h2 className="text-sm font-semibold text-foreground">{category}</h2>
                    <FaqAccordion items={groupedFaq[category]} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={HelpCircle}
                title="No matching articles"
                description="Try a different search term, or contact support for help."
                action={{ label: "Clear search", onClick: () => setSearch("") }}
              />
            )}
          </div>

          <div className="flex flex-col gap-4">
            <ContactSupportCard />
            <div className="flex items-start gap-2 rounded-xl border border-warning-border bg-warning-bg px-4 py-3 text-sm text-warning">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <p>
                For life-threatening emergencies, always contact local emergency services first —
                ClaimFlow is a fictional demo and is not a monitored emergency service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
