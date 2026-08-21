import Link from "next/link";

import type { Earthquake } from "@/lib/types/earthquake";
import { formatRelativeEarthquakeTime } from "@/lib/utils/earthquake-formatters";

import { MagnitudeBadge } from "./MagnitudeBadge";

interface EarthquakeListItemProps {
  earthquake: Earthquake;
}

export function EarthquakeListItem({
  earthquake,
}: EarthquakeListItemProps) {
  return (
    <li>
      <Link
        className="group flex items-center gap-3 rounded-[18px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-4 py-3 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#55C2FF]/30 hover:bg-[#223B5D] active:translate-y-0 active:scale-[0.99] active:border-[#55C2FF]/45 active:bg-[#274463] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55C2FF]/60"
        href={`/sismo/${earthquake.id}`}
      >
        <MagnitudeBadge
          magnitude={earthquake.magnitude}
          size="xs"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-[#F7FAFC] transition-colors duration-200 group-hover:text-white">
            {earthquake.place}
          </p>

          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-[#93A4B8]">
            <span className="flex items-center gap-1">
              🕒 {formatRelativeEarthquakeTime(earthquake)}
            </span>

            <span className="flex items-center gap-1">
              📏 {earthquake.depthKm} km
            </span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {earthquake.felt && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#55C2FF]/25 bg-[#55C2FF]/10 px-2 py-1 text-[10px] font-bold tracking-[0.08em] text-[#55C2FF]">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#55C2FF]"
              />
              <span className="hidden sm:inline">
                PERCIBIDO
              </span>
            </span>
          )}

          <span
            aria-hidden="true"
            className="text-xl text-[#93A4B8] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#55C2FF]"
          >
            ›
          </span>
        </div>
      </Link>
    </li>
  );
}
