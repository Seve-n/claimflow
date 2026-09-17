import { z } from "zod";
import type { ClaimType } from "@/types";

const CLAIM_TYPES = [
  "water_damage",
  "fire_damage",
  "theft_burglary",
  "glass_breakage",
  "vehicle_damage",
  "personal_injury",
  "other",
] as const satisfies readonly ClaimType[];

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

// Step 1 — "What happened?"
export const claimStep1Schema = z.object({
  claimType: z.enum(CLAIM_TYPES, {
    message: "Select what happened",
  }),
});
export type ClaimStep1Values = z.infer<typeof claimStep1Schema>;

// Step 2 — Incident details
export const claimStep2Schema = z.object({
  incidentDate: z
    .string()
    .min(1, "Incident date is required")
    .refine((value) => {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return false;
      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);
      return date <= endOfToday;
    }, "Incident date cannot be in the future"),
  incidentTime: z.string().optional(),
  location: z.string().min(3, "Location is required"),
  description: z
    .string()
    .min(20, "Please describe what happened in at least 20 characters"),
});
export type ClaimStep2Values = z.infer<typeof claimStep2Schema>;

// Step 3 — Damage information (vehicle fields are conditional on claimType)
const claimStep3BaseSchema = z.object({
  whatWasDamaged: z.string().min(3, "Please describe what was damaged"),
  estimatedAmount: z.coerce
    .number({ message: "Enter a valid amount" })
    .positive("Estimated amount must be greater than 0"),
  isPropertySafe: z.boolean(),
  emergencyActionTaken: z.boolean(),
  additionalComments: z.string().optional(),
  vehicleMake: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehicleRegistration: z.string().optional(),
  otherVehicleInvolved: z.boolean().optional(),
});
export type ClaimStep3Values = z.infer<typeof claimStep3BaseSchema>;

/** Vehicle make/model/registration are required only when the claim type is vehicle_damage. */
export function getClaimStep3Schema(claimType: ClaimType) {
  if (claimType !== "vehicle_damage") {
    return claimStep3BaseSchema;
  }

  return claimStep3BaseSchema.extend({
    vehicleMake: z.string().min(1, "Vehicle make is required"),
    vehicleModel: z.string().min(1, "Vehicle model is required"),
    vehicleRegistration: z.string().min(1, "Vehicle registration is required"),
    otherVehicleInvolved: z.boolean({ message: "Please indicate if another vehicle was involved" }),
  });
}

// Step 4 — Upload documents
export const claimFileSchema = z.object({
  name: z.string().min(1),
  size: z
    .number()
    .max(MAX_FILE_SIZE_BYTES, "Each file must be 10 MB or smaller"),
  type: z.enum(ACCEPTED_FILE_TYPES, {
    message: "Only JPG, PNG, PDF and DOCX files are accepted",
  }),
});
export const claimStep4Schema = z.object({
  files: z.array(claimFileSchema).default([]),
});
export type ClaimStep4Values = z.infer<typeof claimStep4Schema>;

// Step 5 — Review and submit
export const claimStep5Schema = z.object({
  confirmAccurate: z.literal(true, {
    message: "Please confirm the information provided is accurate",
  }),
});
export type ClaimStep5Values = z.infer<typeof claimStep5Schema>;
