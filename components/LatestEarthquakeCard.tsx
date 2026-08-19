import Link from "next/link";

import type { Earthquake } from "@/lib/types/earthquake";
import { formatRelativeEarthquakeTime } from "@/lib/utils/earthquake-formatters";

import { EarthquakeMap } from "./EarthquakeMap";
import { MagnitudeBadge } from "./MagnitudeBadge";

interface LatestEarthquakeCardProps {
  earthquake: Earthquake;
}

export function LatestEarthquakeCard({ earthquake }: LatestEarthquakeCardProps) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] shadow-[0_24px_60px_rgba(0,0,0,0.30)]">
      <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:items-stretch">
        <div className="flex flex-col justify-between">
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.24em] text-[#93A4B8]">ÚLTIMO SISMO</p>
            <div className="flex items-start gap-4">
              <MagnitudeBadge magnitude={earthquake.magnitude} size="sm" />
              <div className="min-w-0 flex-1">
                <h2 className="text-[20px] font-extrabold leading-tight text-[#F7FAFC]">{earthquake.place}</h2>
                <div className="mt-4 flex flex-col gap-2 text-sm text-[#93A4B8]">
                  <p className="flex items-center gap-2">
                    <span>🕒</span>
                    <span>{formatRelativeEarthquakeTime(earthquake)}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span>📏</span>
                    <span>Profundidad {earthquake.depthKm} km</span>
                  </p>
                </div>
                <Link
                  className="mt-5 inline-flex w-fit rounded-full border border-[#55C2FF]/30 bg-[#55C2FF]/12 px-4 py-2 text-sm font-semibold text-[#55C2FF] transition hover:bg-[#55C2FF]/18"
                  href={`/sismo/${earthquake.id}`}
                >
                  Ver detalle
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0 overflow-hidden rounded-3xl">
          <EarthquakeMap
            earthquakes={[earthquake]}
            focusEarthquakeId={earthquake.id}
            height={240}
            interactive={false}
            showDetailLink={false}
            focusZoom={6}
            showPopup={false}
          />
        </div>
      </div>
    </article>
  );
}
