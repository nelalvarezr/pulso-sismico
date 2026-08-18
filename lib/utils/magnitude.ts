import { COLORS } from "@/lib/config";

const MAGNITUDE_PALETTES = [
  {
    color: COLORS.accent,
    gradient: ["#2C6FAE", "#55C2FF"] as const,
    max: 3,
  },
  {
    color: COLORS.success,
    gradient: ["#1FAF8B", "#5DD6A2"] as const,
    max: 4,
  },
  {
    color: COLORS.warning,
    gradient: ["#D99A00", "#F6C85F"] as const,
    max: 5,
  },
  {
    color: COLORS.orange,
    gradient: ["#EF8E25", "#FDBA4D"] as const,
    max: 6,
  },
  {
    color: COLORS.danger,
    gradient: ["#D95C5C", "#F46B6B"] as const,
    max: Number.POSITIVE_INFINITY,
  },
] as const;

export function getMagnitudePalette(magnitude: number) {
  return MAGNITUDE_PALETTES.find((palette) => magnitude < palette.max) ?? MAGNITUDE_PALETTES[MAGNITUDE_PALETTES.length - 1];
}

export function getMagnitudeColor(magnitude: number) {
  return getMagnitudePalette(magnitude).color;
}

export function getMagnitudeGradient(magnitude: number) {
  return getMagnitudePalette(magnitude).gradient;
}
