"use client";

import * as React from "react";
import { FolderOpen, Search, SlidersHorizontal } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UploadDocumentDialog } from "@/components/documents/UploadDocumentDialog";
import { DocumentsList } from "@/components/documents/DocumentsList";
import { getFileTypeMeta } from "@/components/documents/document-format";
import { mockDocuments, mockClaims, getClaimById } from "@/lib/mock-data";
import type { Document, DocumentFileType } from "@/types";

const FILE_TYPES: DocumentFileType[] = ["pdf", "zip", "jpg", "png", "docx"];

type SortOrder = "newest" | "oldest";

export default function DocumentsPage() {
  const [documents, setDocuments] = React.useState<Document[]>(() =>
    mockDocuments.map((doc) => ({ ...doc }))
  );
  const [search, setSearch] = React.useState("");
  const [claimFilter, setClaimFilter] = React.useState<string>("all");
  const [typeFilter, setTypeFilter] = React.useState<string>("all");
  const [sortOrder, setSortOrder] = React.useState<SortOrder>("newest");

  const claimsWithDocuments = React.useMemo(() => {
    const ids = new Set(documents.map((doc) => doc.claimId));
    return mockClaims.filter((claim) => ids.has(claim.id));
  }, [documents]);

  const hasActiveFilters = search.trim() !== "" || claimFilter !== "all" || typeFilter !== "all";

  const filteredDocuments = React.useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = documents.filter((doc) => {
      const matchesSearch =
        query.length === 0 ||
        doc.name.toLowerCase().includes(query) ||
        (getClaimById(doc.claimId)?.reference.toLowerCase().includes(query) ?? false);
      const matchesClaim = claimFilter === "all" || doc.claimId === claimFilter;
      const matchesType = typeFilter === "all" || doc.type === typeFilter;
      return matchesSearch && matchesClaim && matchesType;
    });

    return [...filtered].sort((a, b) => {
      const diff = new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
      return sortOrder === "newest" ? -diff : diff;
    });
  }, [documents, search, claimFilter, typeFilter, sortOrder]);

  function resetFilters() {
    setSearch("");
    setClaimFilter("all");
    setTypeFilter("all");
    setSortOrder("newest");
  }

  function handleUpload(newDocument: Document) {
    setDocuments((prev) => [newDocument, ...prev]);
  }

  return (
    <AppShell title="Documents">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Documents"
          subtitle="Access the documents related to your claims."
          action={<UploadDocumentDialog claims={mockClaims} onUpload={handleUpload} />}
        />

        <Card>
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
            <div className="flex min-w-[200px] flex-1 flex-col gap-1.5">
              <Label htmlFor="document-search">Search</Label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <Input
                  id="document-search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by file name or claim"
                  className="pl-8"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="claim-filter">Claim</Label>
              <Select value={claimFilter} onValueChange={(value) => setClaimFilter(value as string)}>
                <SelectTrigger id="claim-filter" className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All claims</SelectItem>
                  {claimsWithDocuments.map((claim) => (
                    <SelectItem key={claim.id} value={claim.id}>
                      {claim.reference}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="type-filter">Type</Label>
              <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as string)}>
                <SelectTrigger id="type-filter" className="w-full sm:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  {FILE_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {getFileTypeMeta(type).label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="sort-order">Sort by upload date</Label>
              <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
                <SelectTrigger id="sort-order" className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {hasActiveFilters ? (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                <SlidersHorizontal className="size-4" aria-hidden="true" />
                Reset filters
              </Button>
            ) : null}
          </CardContent>
        </Card>

        {filteredDocuments.length === 0 ? (
          <EmptyState
            icon={FolderOpen}
            title="No documents found"
            description={
              hasActiveFilters
                ? "No documents match your current filters. Try adjusting your search or filters."
                : "You haven't uploaded any documents yet."
            }
            action={hasActiveFilters ? { label: "Reset filters", onClick: resetFilters } : undefined}
          />
        ) : (
          <DocumentsList documents={filteredDocuments} />
        )}
      </div>
    </AppShell>
  );
}
