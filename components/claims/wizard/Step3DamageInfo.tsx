"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { getClaimStep3Schema, type ClaimStep3Values } from "@/lib/validations/claim-new";
import type { ClaimType } from "@/types";

// z.coerce.number() on estimatedAmount means the schema's input type (what the <input>
// naturally produces) differs from its output type (a number) — form fields/defaultValues
// are typed against the input shape, while the validated submit handler sees the output.
type Step3Schema = ReturnType<typeof getClaimStep3Schema>;
type Step3FormInput = z.input<Step3Schema>;

interface Step3DamageInfoProps {
  claimType: ClaimType;
  defaultValues: Step3FormInput;
  onNext: (values: ClaimStep3Values) => void;
  onBack: () => void;
}

/** Step 3 — Damage information, with conditional vehicle fields for vehicle_damage claims. */
export function Step3DamageInfo({ claimType, defaultValues, onNext, onBack }: Step3DamageInfoProps) {
  const isVehicle = claimType === "vehicle_damage";
  const schema = getClaimStep3Schema(claimType);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step3FormInput, unknown, ClaimStep3Values>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onNext)} noValidate>
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-lg font-semibold text-foreground">Damage information</h2>
        <p className="text-sm text-muted-foreground">
          Help us understand the extent of the damage.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="whatWasDamaged">What was damaged?</Label>
          <Input
            id="whatWasDamaged"
            placeholder="e.g. Kitchen cabinets and flooring"
            aria-invalid={!!errors.whatWasDamaged}
            {...register("whatWasDamaged")}
          />
          {errors.whatWasDamaged ? (
            <p className="text-xs text-destructive">{errors.whatWasDamaged.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="estimatedAmount">Estimated damage amount (EUR)</Label>
          <Input
            id="estimatedAmount"
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g. 2450"
            aria-invalid={!!errors.estimatedAmount}
            {...register("estimatedAmount")}
          />
          {errors.estimatedAmount ? (
            <p className="text-xs text-destructive">{errors.estimatedAmount.message}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:col-span-2">
          <Controller
            control={control}
            name="isPropertySafe"
            render={({ field }) => (
              <label className="group flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2.5">
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    Is the property currently safe?
                  </span>
                  <span className="text-xs text-muted-foreground">
                    No immediate danger to occupants
                  </span>
                </span>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </label>
            )}
          />
          <Controller
            control={control}
            name="emergencyActionTaken"
            render={({ field }) => (
              <label className="group flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2.5">
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    Has emergency action been taken?
                  </span>
                  <span className="text-xs text-muted-foreground">
                    e.g. water shut off, area secured
                  </span>
                </span>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </label>
            )}
          />
        </div>

        {isVehicle ? (
          <div className="flex flex-col gap-4 rounded-lg border border-border bg-muted/30 p-4 sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="vehicleMake">Vehicle make</Label>
              <Input
                id="vehicleMake"
                placeholder="e.g. Volkswagen"
                aria-invalid={!!errors.vehicleMake}
                {...register("vehicleMake")}
              />
              {errors.vehicleMake ? (
                <p className="text-xs text-destructive">{errors.vehicleMake.message}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="vehicleModel">Vehicle model</Label>
              <Input
                id="vehicleModel"
                placeholder="e.g. Golf"
                aria-invalid={!!errors.vehicleModel}
                {...register("vehicleModel")}
              />
              {errors.vehicleModel ? (
                <p className="text-xs text-destructive">{errors.vehicleModel.message}</p>
              ) : null}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="vehicleRegistration">Registration</Label>
              <Input
                id="vehicleRegistration"
                placeholder="e.g. 1-ABC-123"
                aria-invalid={!!errors.vehicleRegistration}
                {...register("vehicleRegistration")}
              />
              {errors.vehicleRegistration ? (
                <p className="text-xs text-destructive">{errors.vehicleRegistration.message}</p>
              ) : null}
            </div>
            <Controller
              control={control}
              name="otherVehicleInvolved"
              render={({ field }) => (
                <label className="flex items-center justify-between gap-3 self-end rounded-lg border border-border bg-card px-3 py-2.5">
                  <span className="text-sm font-medium text-foreground">
                    Was another vehicle involved?
                  </span>
                  <Switch checked={!!field.value} onCheckedChange={field.onChange} />
                </label>
              )}
            />
          </div>
        ) : null}

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <Label htmlFor="additionalComments">Additional comments (optional)</Label>
          <Textarea
            id="additionalComments"
            rows={3}
            placeholder="Anything else we should know?"
            {...register("additionalComments")}
          />
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
