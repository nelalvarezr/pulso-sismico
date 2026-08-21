import Link from "next/link";

import type { Earthquake24HourStats } from "@/lib/api/earthquakes";

interface EarthquakeStatsProps {
  stats: Earthquake24HourStats;
}

function formatMagnitude(magnitude: number | null) {
  if (magnitude === null) {
    return "—";
  }

  return magnitude.toFixed(1).replace(".", ",");
}

export function EarthquakeStats({
  stats,
}: EarthquakeStatsProps) {
  return (
    <section
      aria-label="Actividad sísmica de las últimas 24 horas"
      className="space-y-3"
    >
      <p className="text-xs font-bold tracking-[0.18em] text-[#93A4B8]">
        ACTIVIDAD ÚLTIMAS 24 HORAS
      </p>

      <div className="grid grid-cols-3 gap-2.5 md:gap-4">
        <article className="rounded-[20px] border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-4 text-center shadow-[0_14px_35px_rgba(0,0,0,0.16)] md:rounded-[24px] md:px-5 md:py-5">
          <p className="text-[9px] font-bold tracking-[0.08em] text-[#93A4B8] sm:text-[10px] md:text-xs md:tracking-[0.14em]">
            SISMOS
          </p>

          <p className="mt-1.5 text-2xl font-extrabold tracking-tight text-[#F7FAFC] md:mt-2 md:text-3xl">
            {stats.total.toLocaleString("es-CL")}
          </p>
        </article>

        {stats.maxMagnitudeId ? (
          <Link
            aria-label={`Ver detalle del sismo de mayor magnitud de las últimas 24 horas: ${formatMagnitude(stats.maxMagnitude)}`}
            className="group rounded-[20px] border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-4 text-center shadow-[0_14px_35px_rgba(0,0,0,0.16)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[#55C2FF]/40 hover:bg-[var(--surface-elevated)] active:translate-y-0 active:scale-[0.98] active:border-[#55C2FF]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55C2FF]/60 md:rounded-[24px] md:px-5 md:py-5"
            href={`/sismo/${stats.maxMagnitudeId}`}
          >
            <p className="text-[9px] font-bold tracking-[0.08em] text-[#93A4B8] sm:text-[10px] md:text-xs md:tracking-[0.14em]">
              MAYOR MAGNITUD
            </p>

            <div className="mt-1.5 flex items-center justify-center gap-1.5 md:mt-2">
              <p className="text-2xl font-extrabold tracking-tight text-[#F7FAFC] transition-colors duration-200 group-hover:text-[#55C2FF] md:text-3xl">
                {formatMagnitude(stats.maxMagnitude)}
              </p>

              <span
                aria-hidden="true"
                className="text-sm text-[#55C2FF] opacity-70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
              >
                ›
              </span>
            </div>
          </Link>
        ) : (
          <article className="rounded-[20px] border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-4 text-center shadow-[0_14px_35px_rgba(0,0,0,0.16)] md:rounded-[24px] md:px-5 md:py-5">
            <p className="text-[9px] font-bold tracking-[0.08em] text-[#93A4B8] sm:text-[10px] md:text-xs md:tracking-[0.14em]">
              MAYOR MAGNITUD
            </p>

            <p className="mt-1.5 text-2xl font-extrabold tracking-tight text-[#F7FAFC] md:mt-2 md:text-3xl">
              —
            </p>
          </article>
        )}

        <article className="rounded-[20px] border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-4 text-center shadow-[0_14px_35px_rgba(0,0,0,0.16)] md:rounded-[24px] md:px-5 md:py-5">
          <p className="text-[9px] font-bold tracking-[0.08em] text-[#93A4B8] sm:text-[10px] md:text-xs md:tracking-[0.14em]">
            PERCIBIDOS
          </p>

          <p className="mt-1.5 text-2xl font-extrabold tracking-tight text-[#F7FAFC] md:mt-2 md:text-3xl">
            {stats.feltCount.toLocaleString("es-CL")}
          </p>
        </article>
      </div>
    </section>
  );
}
