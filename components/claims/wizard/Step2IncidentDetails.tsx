"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { claimStep2Schema, type ClaimStep2Values } from "@/lib/validations/claim-new";
import { getClaimTypeMeta } from "@/components/claims/claim-type-meta";
import type { ClaimType } from "@/types";

interface Step2IncidentDetailsProps {
  claimType: ClaimType;
  defaultValues: ClaimStep2Values;
  onNext: (values: ClaimStep2Values) => void;
  onBack: () => void;
}

const todayISODate = new Date().toISOString().slice(0, 10);

/** Step 2 — Incident details: date, time, location, category context, description. */
export function Step2IncidentDetails({
  claimType,
  defaultValues,
  onNext,
  onBack,
}: Step2IncidentDetailsProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimStep2Values>({
    resolver: zodResolver(claimStep2Schema),
    defaultValues,
  });

  const typeMeta = getClaimTypeMeta(claimType);
  const TypeIcon = typeMeta.icon;

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onNext)} noValidate>
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-lg font-semibold text-foreground">Incident details</h2>
        <p className="text-sm text-muted-foreground">Tell us when and where this happened.</p>
        <Badge variant="secondary" className="mt-1 w-fit gap-1.5">
          <TypeIcon className="size-3" aria-hidden="true" />
          {typeMeta.label}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="incidentDate">Date of incident</Label>
          <Input
            id="incidentDate"
            type="date"
            max={todayISODate}
            aria-invalid={!!errors.incidentDate}
            aria-describedby={errors.incidentDate ? "incidentDate-error" : undefined}
            {...register("incidentDate")}
          />
          {errors.incidentDate ? (
            <p id="incidentDate-error" className="text-xs text-destructive">
              {errors.incidentDate.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="incidentTime">Approximate time (optional)</Label>
          <Input id="incidentTime" type="time" {...register("incidentTime")} />
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="e.g. Rue de la Loi 42, 1000 Brussels"
            aria-invalid={!!errors.location}
            aria-describedby={errors.location ? "location-error" : undefined}
            {...register("location")}
          />
          {errors.location ? (
            <p id="location-error" className="text-xs text-destructive">
              {errors.location.message}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="description">What happened?</Label>
          <Textarea
            id="description"
            rows={5}
            placeholder="Describe what happened in a few sentences…"
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? "description-error" : undefined}
            {...register("description")}
          />
          {errors.description ? (
            <p id="description-error" className="text-xs text-destructive">
              {errors.description.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex justify-between border-t border-border pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
