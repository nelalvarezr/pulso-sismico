import Link from "next/link";

import type { Earthquake } from "@/lib/types/earthquake";
import { formatRelativeEarthquakeTime } from "@/lib/utils/earthquake-formatters";

import { MagnitudeBadge } from "./MagnitudeBadge";

interface MapEventPopupProps {
  earthquake: Earthquake;
}

export function MapEventPopup({ earthquake }: MapEventPopupProps) {
  return (
    <div className="min-w-[250px] rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface)] shadow-[0_24px_60px_rgba(0,0,0,0.30)] p-3 text-white">
      <div className="flex items-start gap-3">
        <MagnitudeBadge magnitude={earthquake.magnitude} size="sm" />

        <div className="min-w-0 flex-1">
          <h3 className="text-base font-extrabold leading-tight text-[#F7FAFC]">
            {earthquake.place}
          </h3>

          <div className="mt-2 flex flex-col text-sm leading-tight text-[#93A4B8]">
            <div className="flex items-center gap-1">
              <span>🕒</span>
              <span>{formatRelativeEarthquakeTime(earthquake)}</span>
            </div>

            <div className="mt-0.5 flex items-center gap-1">
              <span>📏</span>
              <span>Profundidad {earthquake.depthKm} km</span>
            </div>
          </div>

          <Link
            className="mt-4 inline-flex w-fit rounded-full border border-[#55C2FF]/30 bg-[#55C2FF]/12 px-4 py-2 text-sm font-semibold text-[#55C2FF] transition hover:bg-[#55C2FF]/18"
            href={`/sismo/${earthquake.id}`}
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </div>
  );
}
