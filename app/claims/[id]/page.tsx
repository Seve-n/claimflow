import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ClaimDetailClient } from "@/components/claims/ClaimDetailClient";
import {
  getClaimById,
  getDocumentsByClaimId,
  getMessagesByClaimId,
  getActivityByClaimId,
} from "@/lib/mock-data";

interface ClaimDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ClaimDetailPage({ params }: ClaimDetailPageProps) {
  const { id } = await params;
  const claim = getClaimById(id);

  if (!claim) {
    notFound();
  }

  const documents = getDocumentsByClaimId(claim.id);
  const messages = getMessagesByClaimId(claim.id);
  const activity = getActivityByClaimId(claim.id);

  return (
    <AppShell title={claim.reference}>
      <ClaimDetailClient
        claim={claim}
        initialDocuments={documents}
        initialMessages={messages}
        activity={activity}
      />
    </AppShell>
  );
}
