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
        className="flex items-center gap-4 rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-4 py-4 transition hover:border-[#55C2FF]/25 hover:bg-[#223B5D]"
        href={`/sismo/${earthquake.id}`}
      >
        <MagnitudeBadge magnitude={earthquake.magnitude} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-1xl font-bold text-[#F7FAFC]">{earthquake.place}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[#93A4B8]">
            <span className="flex items-center gap-1">🕒 {formatRelativeEarthquakeTime(earthquake)}</span>
            <span className="flex items-center gap-1">📏 Profundidad {earthquake.depthKm} km</span>
          </div>
        </div>
        <span className="text-2xl text-[#93A4B8]">›</span>
      </Link>
    </li>
  );
}
