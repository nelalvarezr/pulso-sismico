import { clsx } from "clsx";

import { getMagnitudeColor, getMagnitudeGradient } from "@/lib/utils/magnitude";

interface MagnitudeBadgeProps {
  magnitude: number;
  size?: "lg" | "md" | "sm";
}

export function MagnitudeBadge({ magnitude, size = "md" }: MagnitudeBadgeProps) {
  const [from, to] = getMagnitudeGradient(magnitude);
  const accent = getMagnitudeColor(magnitude);
  const sizeClass =
    size === "lg"
      ? "h-22 w-22 text-4xl font-extrabold sm:h-24 sm:w-24 sm:text-[2.6rem]"
      : size === "sm"
        ? "h-12 w-12 text-xl font-extrabold"
        : "h-13 w-13 text-[1.45rem] font-extrabold";

  return (
    <div
      className={clsx(
        "grid place-items-center rounded-full border text-white shadow-[0_12px_28px_rgba(0,0,0,0.28)]",
        sizeClass,
      )}
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
        borderColor: "rgba(255,255,255,0.45)",
        boxShadow: `0 0 0 2px rgba(255,255,255,0.12), 0 12px 28px ${accent}3d`,
      }}
    >
      <span>{magnitude.toFixed(1)}</span>
    </div>
  );
}
