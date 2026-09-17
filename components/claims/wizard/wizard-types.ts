import type { ClaimType } from "@/types";

/** A file the customer has attached in step 4, with its simulated upload progress. */
export interface WizardFile {
  id: string;
  file: File;
  previewUrl: string | null;
  progress: number;
  status: "uploading" | "done" | "error";
  errorMessage?: string;
}

/** All the data collected across the 5 wizard steps, held in one place by the wizard. */
export interface ClaimWizardData {
  claimType: ClaimType | null;
  incidentDate: string;
  incidentTime: string;
  location: string;
  description: string;
  whatWasDamaged: string;
  estimatedAmount: string;
  isPropertySafe: boolean;
  emergencyActionTaken: boolean;
  additionalComments: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleRegistration: string;
  otherVehicleInvolved: boolean;
}

export const INITIAL_WIZARD_DATA: ClaimWizardData = {
  claimType: null,
  incidentDate: "",
  incidentTime: "",
  location: "",
  description: "",
  whatWasDamaged: "",
  estimatedAmount: "",
  isPropertySafe: true,
  emergencyActionTaken: false,
  additionalComments: "",
  vehicleMake: "",
  vehicleModel: "",
  vehicleRegistration: "",
  otherVehicleInvolved: false,
};

export const WIZARD_STEP_LABELS = [
  "What happened?",
  "Incident details",
  "Damage information",
  "Upload documents",
  "Review & submit",
];
