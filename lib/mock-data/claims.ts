import type { Claim } from "@/types";
import { MOCK_USER_ID } from "./user";

const HANDLER = "Sophie Laurent, Claims Support Team";

/**
 * 8 fictional claims for Thomas Martin.
 *
 * Distribution is chosen to match the dashboard summary cards in PROJECT_BRIEF.md:
 * - Active claims (submitted / under_review / assessment / decision_pending): 2
 * - Awaiting action (awaiting_documents): 1
 * - Resolved: 5
 */
export const mockClaims: Claim[] = [
  // --- The 3 canonical claims from the brief ---
  {
    id: "clm-2026-00124",
    reference: "CLM-2026-00124",
    userId: MOCK_USER_ID,
    type: "water_damage",
    title: "Burst pipe under kitchen sink",
    description:
      "A supply pipe under the kitchen sink burst overnight, flooding the kitchen and part of the adjoining hallway. Water was shut off the next morning and the affected cabinets and flooring were left to dry.",
    incidentDate: "2026-09-10",
    reportedDate: "2026-09-12",
    location: "Rue de la Loi 42, 1000 Brussels",
    status: "under_review",
    estimatedAmount: 2450,
    policyReference: "POL-BE-88213",
    assignedHandler: HANDLER,
    createdAt: "2026-09-12T08:41:00.000Z",
    updatedAt: "2026-09-13T14:05:00.000Z",
    isPropertySafe: true,
    emergencyActionTaken: true,
  },
  {
    id: "clm-2026-00118",
    reference: "CLM-2026-00118",
    userId: MOCK_USER_ID,
    type: "theft_burglary",
    title: "Home burglary, living room and study",
    description:
      "Forced entry through the rear door while the property was unoccupied. A laptop, a bicycle and a small amount of jewelry were taken from the living room and study. A police report was filed the same day.",
    incidentDate: "2026-09-03",
    reportedDate: "2026-09-05",
    location: "Rue de la Loi 42, 1000 Brussels",
    status: "awaiting_documents",
    estimatedAmount: 4800,
    policyReference: "POL-BE-88213",
    assignedHandler: HANDLER,
    createdAt: "2026-09-05T10:15:00.000Z",
    updatedAt: "2026-09-08T09:30:00.000Z",
    isPropertySafe: true,
    emergencyActionTaken: false,
  },
  {
    id: "clm-2026-00097",
    reference: "CLM-2026-00097",
    userId: MOCK_USER_ID,
    type: "vehicle_damage",
    title: "Rear-end collision, Rue Belliard",
    description:
      "Vehicle was struck from behind while stopped at a red light on Rue Belliard. Rear bumper and taillight were damaged. No injuries reported.",
    incidentDate: "2026-08-18",
    reportedDate: "2026-08-21",
    location: "Rue Belliard, 1040 Brussels",
    status: "resolved",
    estimatedAmount: 1200,
    policyReference: "POL-BE-88213",
    assignedHandler: HANDLER,
    createdAt: "2026-08-21T11:00:00.000Z",
    updatedAt: "2026-08-29T16:20:00.000Z",
    vehicleDetails: {
      make: "Volkswagen",
      model: "Golf",
      registration: "1-ABC-123",
      otherVehicleInvolved: true,
    },
  },

  // --- Second active claim, to bring "Active claims" to 2 ---
  {
    id: "clm-2026-00131",
    reference: "CLM-2026-00131",
    userId: MOCK_USER_ID,
    type: "glass_breakage",
    title: "Cracked living room window",
    description:
      "The large living room window cracked during a storm, likely from wind-blown debris. The glass is still in place but compromised and needs replacing.",
    incidentDate: "2026-09-14",
    reportedDate: "2026-09-15",
    location: "Rue de la Loi 42, 1000 Brussels",
    status: "assessment",
    estimatedAmount: 650,
    policyReference: "POL-BE-88213",
    assignedHandler: HANDLER,
    createdAt: "2026-09-15T13:10:00.000Z",
    updatedAt: "2026-09-16T09:00:00.000Z",
    isPropertySafe: true,
    emergencyActionTaken: true,
  },

  // --- 4 lightweight, already-resolved claims, to bring "Resolved" to 5 ---
  {
    id: "clm-2026-00080",
    reference: "CLM-2026-00080",
    userId: MOCK_USER_ID,
    type: "fire_damage",
    title: "Kitchen stove fire damage",
    description:
      "A small stovetop fire scorched the wall tiles and an overhead cabinet. Contained quickly with no structural damage.",
    incidentDate: "2026-07-02",
    reportedDate: "2026-07-03",
    location: "Rue de la Loi 42, 1000 Brussels",
    status: "resolved",
    estimatedAmount: 3200,
    policyReference: "POL-BE-88213",
    assignedHandler: HANDLER,
    createdAt: "2026-07-03T08:00:00.000Z",
    updatedAt: "2026-07-18T15:40:00.000Z",
  },
  {
    id: "clm-2026-00065",
    reference: "CLM-2026-00065",
    userId: MOCK_USER_ID,
    type: "theft_burglary",
    title: "Bicycle theft from storage room",
    description:
      "Bicycle was stolen from the building's shared storage room. The lock was cut. Building management was notified.",
    incidentDate: "2026-05-14",
    reportedDate: "2026-05-15",
    location: "Rue de la Loi 42, 1000 Brussels",
    status: "resolved",
    estimatedAmount: 1850,
    policyReference: "POL-BE-88213",
    assignedHandler: HANDLER,
    createdAt: "2026-05-15T09:20:00.000Z",
    updatedAt: "2026-05-27T11:00:00.000Z",
  },
  {
    id: "clm-2026-00052",
    reference: "CLM-2026-00052",
    userId: MOCK_USER_ID,
    type: "water_damage",
    title: "Dishwasher leak damage",
    description:
      "A slow leak from the dishwasher seal damaged the adjacent flooring before being noticed.",
    incidentDate: "2026-03-22",
    reportedDate: "2026-03-23",
    location: "Rue de la Loi 42, 1000 Brussels",
    status: "resolved",
    estimatedAmount: 980,
    policyReference: "POL-BE-88213",
    assignedHandler: HANDLER,
    createdAt: "2026-03-23T10:00:00.000Z",
    updatedAt: "2026-04-02T14:15:00.000Z",
  },
  {
    id: "clm-2026-00041",
    reference: "CLM-2026-00041",
    userId: MOCK_USER_ID,
    type: "personal_injury",
    title: "Slip and fall on icy front steps",
    description:
      "Slipped on the front steps during an icy morning, resulting in a sprained wrist. Treated at a local clinic.",
    incidentDate: "2026-02-08",
    reportedDate: "2026-02-09",
    location: "Rue de la Loi 42, 1000 Brussels",
    status: "resolved",
    estimatedAmount: 1500,
    policyReference: "POL-BE-88213",
    assignedHandler: HANDLER,
    createdAt: "2026-02-09T09:00:00.000Z",
    updatedAt: "2026-02-20T16:00:00.000Z",
  },
];

export function getClaimById(id: string): Claim | undefined {
  return mockClaims.find((claim) => claim.id === id || claim.reference === id);
}
