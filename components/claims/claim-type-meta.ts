import {
  Droplets,
  Flame,
  DoorOpen,
  GlassWater,
  CarFront,
  HeartPulse,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import type { ClaimType } from "@/types";

/**
 * Local presentation metadata for each claim type (icon/label/description).
 * Not part of the shared foundation — scoped to the claims feature (list, detail,
 * and new-claim wizard) since it's only needed there.
 */
export interface ClaimTypeMeta {
  type: ClaimType;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const CLAIM_TYPE_META: Record<ClaimType, ClaimTypeMeta> = {
  water_damage: {
    type: "water_damage",
    label: "Water damage",
    description: "Leaks, burst pipes, flooding or water infiltration.",
    icon: Droplets,
  },
  fire_damage: {
    type: "fire_damage",
    label: "Fire damage",
    description: "Fire, smoke or scorch damage to your property.",
    icon: Flame,
  },
  theft_burglary: {
    type: "theft_burglary",
    label: "Theft / burglary",
    description: "Break-ins, stolen belongings or vandalism.",
    icon: DoorOpen,
  },
  glass_breakage: {
    type: "glass_breakage",
    label: "Glass breakage",
    description: "Cracked or shattered windows, doors or mirrors.",
    icon: GlassWater,
  },
  vehicle_damage: {
    type: "vehicle_damage",
    label: "Vehicle damage",
    description: "Collisions, accidents or damage to your vehicle.",
    icon: CarFront,
  },
  personal_injury: {
    type: "personal_injury",
    label: "Personal injury",
    description: "Injuries sustained in an accident or incident.",
    icon: HeartPulse,
  },
  other: {
    type: "other",
    label: "Other",
    description: "Something else that isn't listed here.",
    icon: HelpCircle,
  },
};

export const CLAIM_TYPE_ORDER: ClaimType[] = [
  "water_damage",
  "fire_damage",
  "theft_burglary",
  "glass_breakage",
  "vehicle_damage",
  "personal_injury",
  "other",
];

export function getClaimTypeMeta(type: ClaimType): ClaimTypeMeta {
  return CLAIM_TYPE_META[type];
}
