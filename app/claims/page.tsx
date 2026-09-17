"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpDown, FilePlus2, FileX2, Search } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateFR } from "@/lib/utils";
import { mockClaims } from "@/lib/mock-data";
import { CLAIM_TYPE_ORDER, getClaimTypeMeta } from "@/components/claims/claim-type-meta";
import type { Claim, ClaimStatus } from "@/types";

const STATUS_FILTERS: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "submitted", label: "Open" },
  { value: "under_review", label: "Under review" },
  { value: "awaiting_documents", label: "Awaiting documents" },
  { value: "in_progress", label: "In progress" },
  { value: "resolved", label: "Resolved" },
  { value: "closed", label: "Closed" },
];

function matchesStatusFilter(status: ClaimStatus, filter: string): boolean {
  if (filter === "all") return true;
  if (filter === "in_progress") return status === "assessment" || status === "decision_pending";
  return status === filter;
}

function matchesSearch(claim: Claim, query: string): boolean {
  if (query.trim() === "") return true;
  const haystack = `${claim.reference} ${claim.title} ${claim.location}`.toLowerCase();
  return haystack.includes(query.trim().toLowerCase());
}

export default function ClaimsPage() {
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [typeFilter, setTypeFilter] = React.useState("all");
  const [sortNewestFirst, setSortNewestFirst] = React.useState(true);

  const filtered = React.useMemo(() => {
    const result = mockClaims.filter(
      (claim) =>
        matchesStatusFilter(claim.status, statusFilter) &&
        (typeFilter === "all" || claim.type === typeFilter) &&
        matchesSearch(claim, search)
    );
    result.sort((a, b) => {
      const diff = new Date(a.reportedDate).getTime() - new Date(b.reportedDate).getTime();
      return sortNewestFirst ? -diff : diff;
    });
    return result;
  }, [search, statusFilter, typeFilter, sortNewestFirst]);

  const hasActiveFilters = search !== "" || statusFilter !== "all" || typeFilter !== "all";

  function resetFilters() {
    setSearch("");
    setStatusFilter("all");
    setTypeFilter("all");
  }

  return (
    <AppShell title="My claims">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="My claims"
          subtitle="Track and manage your insurance claims."
          action={
            <Button render={<Link href="/claims/new" />} nativeButton={false}>
              <FilePlus2 className="size-4" aria-hidden="true" />
              Report a claim
            </Button>
          }
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="relative flex-1 sm:min-w-56">
            <Search
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Search by reference, title or location"
              aria-label="Search claims"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value ?? "all")}
          >
            <SelectTrigger aria-label="Filter by status" className="w-full sm:w-44">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_FILTERS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value ?? "all")}>
            <SelectTrigger aria-label="Filter by claim type" className="w-full sm:w-48">
              <SelectValue placeholder="Claim type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {CLAIM_TYPE_ORDER.map((type) => (
                <SelectItem key={type} value={type}>
                  {getClaimTypeMeta(type).label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            type="button"
            variant="outline"
            onClick={() => setSortNewestFirst((v) => !v)}
            aria-label={`Sort by date, currently ${sortNewestFirst ? "newest first" : "oldest first"}`}
          >
            <ArrowUpDown className="size-3.5" aria-hidden="true" />
            {sortNewestFirst ? "Newest first" : "Oldest first"}
          </Button>

          {hasActiveFilters ? (
            <Button type="button" variant="ghost" onClick={resetFilters}>
              Clear filters
            </Button>
          ) : null}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={FileX2}
            title="No claims match your filters"
            description="Try adjusting or resetting your search and filters to see more results."
            action={{ label: "Reset filters", onClick: resetFilters }}
          />
        ) : (
          <>
            <Card className="hidden md:block">
              <CardContent className="px-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-4">Reference</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last updated</TableHead>
                      <TableHead className="pr-4 text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((claim) => {
                      const typeMeta = getClaimTypeMeta(claim.type);
                      return (
                        <TableRow key={claim.id}>
                          <TableCell className="pl-4 font-medium text-foreground">
                            <div className="flex flex-col">
                              <span>{claim.reference}</span>
                              <span className="font-normal text-xs text-muted-foreground">
                                {claim.title}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{typeMeta.label}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDateFR(claim.reportedDate)}
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={claim.status} />
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {formatDateFR(claim.updatedAt)}
                          </TableCell>
                          <TableCell className="pr-4 text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              render={<Link href={`/claims/${claim.id}`} />}
                              nativeButton={false}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3 md:hidden">
              {filtered.map((claim) => {
                const typeMeta = getClaimTypeMeta(claim.type);
                const Icon = typeMeta.icon;
                return (
                  <Card key={claim.id}>
                    <CardContent className="flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                            <Icon className="size-4" aria-hidden="true" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-foreground">
                              {claim.reference}
                            </span>
                            <span className="text-xs text-muted-foreground">{typeMeta.label}</span>
                          </div>
                        </div>
                        <StatusBadge status={claim.status} />
                      </div>
                      <p className="line-clamp-2 text-sm text-muted-foreground">{claim.title}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Submitted {formatDateFR(claim.reportedDate)}</span>
                        <span>Updated {formatDateFR(claim.updatedAt)}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        render={<Link href={`/claims/${claim.id}`} />}
                        nativeButton={false}
                      >
                        View details
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
