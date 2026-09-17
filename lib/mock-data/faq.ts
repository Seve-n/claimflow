import type { FaqItem } from "@/types";

/**
 * Generic fictional help content for the Help & support page.
 * No real insurance or legal advice — see PROJECT_BRIEF_FULL.md section 15.
 */
export const mockFaq: FaqItem[] = [
  {
    id: "faq-report-claim",
    category: "Claims",
    question: "How do I report a claim?",
    answer:
      "From your dashboard or the My claims page, select \"Report a claim\" and follow the guided steps: choose what happened, add the incident details, describe the damage, attach supporting documents, then review and submit. You'll receive a claim reference right away.",
  },
  {
    id: "faq-documents",
    category: "Documents",
    question: "What documents should I provide?",
    answer:
      "It depends on the type of claim, but common examples include photos of the damage, a repair estimate, a police report for theft or burglary, and any relevant purchase invoices. You can always add more documents later from your claim's detail page.",
  },
  {
    id: "faq-track-claim",
    category: "Claims",
    question: "How can I track my claim?",
    answer:
      "Open the claim from My claims to see its progress timeline, current status, assigned handler, and any messages from our claims team. You'll also see a summary on your dashboard under Recent claims.",
  },
  {
    id: "faq-review-time",
    category: "Claims",
    question: "How long does a claim review take?",
    answer:
      "Most claims move from submission to an initial review within a few business days. More complex claims that require an assessment may take longer. You'll be notified as soon as there's an update, and you can always check the current status on your claim's page.",
  },
  {
    id: "faq-update-contact",
    category: "Account",
    question: "How do I update my contact information?",
    answer:
      "Go to Settings and update your personal information, including your email, phone number, and address. Changes are saved immediately.",
  },
];

export function getFaqByCategory(): Record<string, FaqItem[]> {
  return mockFaq.reduce<Record<string, FaqItem[]>>((groups, item) => {
    const key = item.category;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {});
}
