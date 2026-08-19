import Link from "next/link";

import type { Earthquake } from "@/lib/types/earthquake";
import { formatRelativeEarthquakeTime } from "@/lib/utils/earthquake-formatters";

import { MagnitudeBadge } from "./MagnitudeBadge";

interface EarthquakeListItemProps {
  earthquake: Earthquake;
}

export function EarthquakeListItem({ earthquake }: EarthquakeListItemProps) {
  return (
    <li>
      <Link
        className="flex items-center gap-3 rounded-[18px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-4 py-3 transition hover:border-[#55C2FF]/25 hover:bg-[#223B5D]"
        href={`/sismo/${earthquake.id}`}
      >
        <MagnitudeBadge magnitude={earthquake.magnitude} size="xs" />

        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-[#F7FAFC]">
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

        <span className="text-xl text-[#93A4B8]">›</span>
      </Link>
    </li>
  );
}
