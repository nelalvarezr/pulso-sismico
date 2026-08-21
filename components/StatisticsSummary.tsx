import Link from "next/link";

import type {
  StatisticsPeriod,
  StatisticsSummary as StatisticsSummaryType,
} from "@/lib/api/statistics";

interface StatisticsSummaryProps {
  stats: StatisticsSummaryType;
  period: StatisticsPeriod;
}

function formatMagnitude(
  magnitude: number | null,
) {
  if (magnitude === null) {
    return "—";
  }

  return magnitude
    .toFixed(1)
    .replace(".", ",");
}

function formatDepth(
  depth: number | null,
) {
  if (depth === null) {
    return "—";
  }

  return depth
    .toFixed(1)
    .replace(".", ",");
}

function buildMaxMagnitudeHref(
  eventId: string,
  period: StatisticsPeriod,
) {
  const returnTo =
    period === "30d"
      ? "/estadisticas"
      : `/estadisticas?periodo=${period}`;

  const params = new URLSearchParams({
    volver: returnTo,
  });

  return `/sismo/${eventId}?${params.toString()}`;
}

export function StatisticsSummary({
  stats,
  period,
}: StatisticsSummaryProps) {
  const baseCardClass =
    "rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface)] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.16)] md:rounded-[24px] md:p-5";

  return (
    <section
      aria-label="Resumen estadístico"
      className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
    >
      <article className={baseCardClass}>
        <p className="text-[10px] font-bold tracking-[0.12em] text-[#93A4B8] md:text-xs md:tracking-[0.16em]">
          SISMOS
        </p>

        <p className="mt-2 text-2xl font-extrabold tracking-tight text-[#F7FAFC] md:text-3xl">
          {stats.total.toLocaleString("es-CL")}
        </p>

        <p className="mt-1 text-xs text-[#72849A]">
          Eventos registrados
        </p>
      </article>

      {stats.maxMagnitudeId ? (
        <Link
          aria-label={`Ver el sismo de mayor magnitud del período: ${formatMagnitude(stats.maxMagnitude)}`}
          className={`${baseCardClass} group transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[#55C2FF]/40 hover:bg-[var(--surface-elevated)] active:translate-y-0 active:scale-[0.98] active:border-[#55C2FF]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55C2FF]/60`}
          href={buildMaxMagnitudeHref(
            stats.maxMagnitudeId,
            period,
            )}
        >
          <p className="text-[10px] font-bold tracking-[0.12em] text-[#93A4B8] md:text-xs md:tracking-[0.16em]">
            MAYOR MAGNITUD
          </p>

          <div className="mt-2 flex items-center gap-2">
            <p className="text-2xl font-extrabold tracking-tight text-[#F7FAFC] transition-colors duration-200 group-hover:text-[#55C2FF] md:text-3xl">
              {formatMagnitude(
                stats.maxMagnitude,
              )}
            </p>

            <span
              aria-hidden="true"
              className="text-lg text-[#55C2FF] transition-transform duration-200 group-hover:translate-x-1"
            >
              ›
            </span>
          </div>

          <p className="mt-1 text-xs text-[#72849A]">
            Ver evento
          </p>
        </Link>
      ) : (
        <article className={baseCardClass}>
          <p className="text-[10px] font-bold tracking-[0.12em] text-[#93A4B8] md:text-xs md:tracking-[0.16em]">
            MAYOR MAGNITUD
          </p>

          <p className="mt-2 text-2xl font-extrabold tracking-tight text-[#F7FAFC] md:text-3xl">
            —
          </p>

          <p className="mt-1 text-xs text-[#72849A]">
            Sin eventos
          </p>
        </article>
      )}

      <article className={baseCardClass}>
        <p className="text-[10px] font-bold tracking-[0.12em] text-[#93A4B8] md:text-xs md:tracking-[0.16em]">
          PERCIBIDOS
        </p>

        <p className="mt-2 text-2xl font-extrabold tracking-tight text-[#F7FAFC] md:text-3xl">
          {stats.feltCount.toLocaleString(
            "es-CL",
          )}
        </p>

        <p className="mt-1 text-xs text-[#72849A]">
          Reportados como percibidos
        </p>
      </article>

      <article className={baseCardClass}>
        <p className="text-[10px] font-bold tracking-[0.12em] text-[#93A4B8] md:text-xs md:tracking-[0.16em]">
          PROFUNDIDAD MEDIA
        </p>

        <div className="mt-2 flex items-baseline gap-1">
          <p className="text-2xl font-extrabold tracking-tight text-[#F7FAFC] md:text-3xl">
            {formatDepth(
              stats.averageDepth,
            )}
          </p>

          {stats.averageDepth !== null && (
            <span className="text-sm font-semibold text-[#93A4B8]">
              km
            </span>
          )}
        </div>

        <p className="mt-1 text-xs text-[#72849A]">
          Promedio del período
        </p>
      </article>
    </section>
  );
}
