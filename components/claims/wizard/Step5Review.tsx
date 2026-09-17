"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, FileImage, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { formatEUR } from "@/lib/utils";
import { claimStep5Schema, type ClaimStep5Values } from "@/lib/validations/claim-new";
import { getClaimTypeMeta } from "@/components/claims/claim-type-meta";
import type { ClaimWizardData, WizardFile } from "./wizard-types";

interface Step5ReviewProps {
  data: ClaimWizardData;
  files: WizardFile[];
  isSubmitting: boolean;
  onSubmit: () => void;
  onBack: () => void;
}

interface ReviewRowProps {
  label: string;
  value: string;
}

function ReviewRow({ label, value }: ReviewRowProps) {
  return (
    <div className="flex justify-between gap-4 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}

/** Step 5 — Review everything entered, confirm accuracy, and submit. */
export function Step5Review({ data, files, isSubmitting, onSubmit, onBack }: Step5ReviewProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimStep5Values>({
    resolver: zodResolver(claimStep5Schema),
    defaultValues: { confirmAccurate: undefined },
  });

  if (!data.claimType) return null;
  const typeMeta = getClaimTypeMeta(data.claimType);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-lg font-semibold text-foreground">Review and submit</h2>
        <p className="text-sm text-muted-foreground">
          Please check the details below before submitting your claim.
        </p>
      </div>

      <div className="flex flex-col divide-y divide-border rounded-lg border border-border px-4">
        <ReviewRow label="Claim type" value={typeMeta.label} />
        <ReviewRow
          label="Incident date"
          value={new Intl.DateTimeFormat("fr-BE", { dateStyle: "long" }).format(
            new Date(data.incidentDate)
          )}
        />
        {data.incidentTime ? <ReviewRow label="Approximate time" value={data.incidentTime} /> : null}
        <ReviewRow label="Location" value={data.location} />
        <ReviewRow label="What was damaged" value={data.whatWasDamaged} />
        {data.estimatedAmount ? (
          <ReviewRow label="Estimated amount" value={formatEUR(Number(data.estimatedAmount))} />
        ) : null}
        {data.claimType === "vehicle_damage" ? (
          <ReviewRow
            label="Vehicle"
            value={`${data.vehicleMake} ${data.vehicleModel} · ${data.vehicleRegistration}`}
          />
        ) : null}
        <div className="py-2">
          <span className="text-sm text-muted-foreground">Description</span>
          <p className="mt-1 text-sm text-foreground">{data.description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-foreground">
          Attached files {files.length > 0 ? `(${files.length})` : ""}
        </span>
        {files.length === 0 ? (
          <p className="text-sm text-muted-foreground">No files attached.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {files.map((f) => {
              const Icon = f.previewUrl ? FileImage : FileText;
              return (
                <Badge key={f.id} variant="outline" className="gap-1.5 py-1">
                  <Icon className="size-3" aria-hidden="true" />
                  {f.file.name}
                </Badge>
              );
            })}
          </div>
        )}
      </div>

      <Controller
        control={control}
        name="confirmAccurate"
        render={({ field }) => (
          <div className="flex flex-col gap-1.5">
            <label className="flex items-start gap-2.5">
              <Checkbox
                checked={field.value === true}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                aria-invalid={!!errors.confirmAccurate}
              />
              <span className="text-sm text-foreground">
                I confirm that the information provided is accurate.
              </span>
            </label>
            {errors.confirmAccurate ? (
              <p className="text-xs text-destructive">{errors.confirmAccurate.message}</p>
            ) : null}
          </div>
        )}
      />

      <div className="flex justify-between border-t border-border pt-4">
        <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
              Submitting…
            </>
          ) : (
            "Submit claim"
          )}
        </Button>
      </div>
    </form>
  );
}
