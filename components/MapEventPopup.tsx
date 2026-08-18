import Link from "next/link";

import type { Earthquake } from "@/lib/types/earthquake";
import { formatRelativeEarthquakeTime } from "@/lib/utils/earthquake-formatters";

import { MagnitudeBadge } from "./MagnitudeBadge";

interface MapEventPopupProps {
  earthquake: Earthquake;
}

export function MapEventPopup({ earthquake }: MapEventPopupProps) {
  return (
    <div className="min-w-[250px] rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-3 text-white">
      <div className="flex gap-4">
        <MagnitudeBadge magnitude={earthquake.magnitude} size="sm" />
        <div className="flex-1">
          <h3 className="text-lg font-extrabold leading-tight text-[#F7FAFC]">{earthquake.place}</h3>
          <div className="mt-2 space-y-1 text-sm text-[#93A4B8]">
            <p className="flex items-center gap-1">🕒 {formatRelativeEarthquakeTime(earthquake)}</p>
            <p className="flex items-center gap-1">📏 Profundidad {earthquake.depthKm} km</p>
          </div>
          <Link className="mt-3 inline-flex text-sm font-semibold text-[#55C2FF]" href={`/sismo/${earthquake.id}`}>
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
}
