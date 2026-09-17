"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { WizardStepper } from "./WizardStepper";
import { Step1ClaimType } from "./Step1ClaimType";
import { Step2IncidentDetails } from "./Step2IncidentDetails";
import { Step3DamageInfo } from "./Step3DamageInfo";
import { Step4Documents } from "./Step4Documents";
import { Step5Review } from "./Step5Review";
import { SuccessScreen } from "./SuccessScreen";
import { INITIAL_WIZARD_DATA, type ClaimWizardData, type WizardFile } from "./wizard-types";
import type { ClaimStep2Values, ClaimStep3Values } from "@/lib/validations/claim-new";
import type { ClaimType } from "@/types";

const SUBMIT_DELAY_MS = 900;
const REFERENCE_RANGE_START = 140;
const REFERENCE_RANGE_SIZE = 850;

/**
 * There's no backend, so the newly submitted claim isn't persisted anywhere — this just
 * generates a fake reference in the same CLM-2026-00xxx shape as the mock claims.
 */
function generateClaimReference(): string {
  const num = REFERENCE_RANGE_START + Math.floor(Math.random() * REFERENCE_RANGE_SIZE);
  return `CLM-2026-${String(num).padStart(5, "0")}`;
}

/** Orchestrates the 5-step new-claim wizard: step state, wizard-wide data, and submission. */
export function NewClaimWizard() {
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState<ClaimWizardData>(INITIAL_WIZARD_DATA);
  const [files, setFiles] = React.useState<WizardFile[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [reference, setReference] = React.useState<string | null>(null);

  function goToStep(next: number) {
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleStep1Next(claimType: ClaimType) {
    setData((prev) => ({ ...prev, claimType }));
    goToStep(2);
  }

  function handleStep2Next(values: ClaimStep2Values) {
    setData((prev) => ({ ...prev, ...values, incidentTime: values.incidentTime ?? "" }));
    goToStep(3);
  }

  function handleStep3Next(values: ClaimStep3Values) {
    setData((prev) => ({
      ...prev,
      whatWasDamaged: values.whatWasDamaged,
      estimatedAmount: String(values.estimatedAmount),
      isPropertySafe: values.isPropertySafe,
      emergencyActionTaken: values.emergencyActionTaken,
      additionalComments: values.additionalComments ?? "",
      vehicleMake: values.vehicleMake ?? "",
      vehicleModel: values.vehicleModel ?? "",
      vehicleRegistration: values.vehicleRegistration ?? "",
      otherVehicleInvolved: values.otherVehicleInvolved ?? false,
    }));
    goToStep(4);
  }

  function handleSubmit() {
    setIsSubmitting(true);
    // No real backend — simulate a short processing delay before "succeeding".
    setTimeout(() => {
      setReference(generateClaimReference());
      setIsSubmitting(false);
    }, SUBMIT_DELAY_MS);
  }

  if (reference) {
    return (
      <Card>
        <CardContent>
          <SuccessScreen reference={reference} />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent>
          <WizardStepper currentStep={step} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {step === 1 ? (
                <Step1ClaimType value={data.claimType} onNext={handleStep1Next} />
              ) : null}

              {step === 2 && data.claimType ? (
                <Step2IncidentDetails
                  claimType={data.claimType}
                  defaultValues={{
                    incidentDate: data.incidentDate,
                    incidentTime: data.incidentTime,
                    location: data.location,
                    description: data.description,
                  }}
                  onNext={handleStep2Next}
                  onBack={() => goToStep(1)}
                />
              ) : null}

              {step === 3 && data.claimType ? (
                <Step3DamageInfo
                  claimType={data.claimType}
                  defaultValues={{
                    whatWasDamaged: data.whatWasDamaged,
                    estimatedAmount: data.estimatedAmount || "",
                    isPropertySafe: data.isPropertySafe,
                    emergencyActionTaken: data.emergencyActionTaken,
                    additionalComments: data.additionalComments,
                    vehicleMake: data.vehicleMake,
                    vehicleModel: data.vehicleModel,
                    vehicleRegistration: data.vehicleRegistration,
                    otherVehicleInvolved: data.otherVehicleInvolved,
                  }}
                  onNext={handleStep3Next}
                  onBack={() => goToStep(2)}
                />
              ) : null}

              {step === 4 ? (
                <Step4Documents
                  files={files}
                  onFilesChange={setFiles}
                  onNext={() => goToStep(5)}
                  onBack={() => goToStep(3)}
                />
              ) : null}

              {step === 5 && data.claimType ? (
                <Step5Review
                  data={data}
                  files={files}
                  isSubmitting={isSubmitting}
                  onSubmit={handleSubmit}
                  onBack={() => goToStep(4)}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
