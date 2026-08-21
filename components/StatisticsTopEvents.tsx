import Link from "next/link";

import type {
  StatisticsPeriod,
  StatisticsTopEvent,
} from "@/lib/api/statistics";

import { MagnitudeBadge } from "./MagnitudeBadge";

interface StatisticsTopEventsProps {
  events: StatisticsTopEvent[];
  period: StatisticsPeriod;
}

const SPANISH_MONTHS_SHORT = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sept",
  "oct",
  "nov",
  "dic",
];

function formatEventDate(date: string) {
  const [year, month, day] =
    date.split("-").map(Number);

  const monthLabel =
    SPANISH_MONTHS_SHORT[month - 1] ?? "";

  return `${String(day).padStart(
    2,
    "0",
  )} ${monthLabel} ${year}`;
}

function buildEventHref(
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

export function StatisticsTopEvents({
  events,
  period,
}: StatisticsTopEventsProps) {
  return (
    <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.20)] md:p-7">
      <div className="max-w-3xl">
        <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
          EVENTOS DESTACADOS
        </p>

        <h2 className="mt-2 text-2xl font-extrabold text-[#F7FAFC]">
          Mayores sismos del período
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#93A4B8]">
          Los eventos de mayor magnitud registrados dentro del período
          seleccionado.
        </p>
      </div>

      {events.length > 0 ? (
        <ol className="mt-6 space-y-3">
          {events.map((event, index) => (
            <li key={event.id}>
              <Link
                aria-label={`Ver detalle del sismo de magnitud ${event.magnitude.toFixed(
                  1,
                )} en ${event.place}`}
                className="group flex items-center gap-3 rounded-[20px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-4 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#55C2FF]/30 hover:bg-[#223B5D] active:translate-y-0 active:scale-[0.99] active:border-[#55C2FF]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55C2FF]/60 md:gap-4"
                href={buildEventHref(
                  event.id,
                  period,
                )}
              >
                <span className="hidden w-7 shrink-0 text-center text-xs font-extrabold text-[#60748D] sm:block">
                  {String(index + 1).padStart(
                    2,
                    "0",
                  )}
                </span>

                <MagnitudeBadge
                  magnitude={event.magnitude}
                  size="xs"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="min-w-0 truncate text-[15px] font-bold text-[#F7FAFC]">
                      {event.place}
                    </p>

                    {event.felt && (
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#55C2FF]/25 bg-[#55C2FF]/10 px-2 py-0.5 text-[10px] font-bold tracking-[0.08em] text-[#55C2FF]">
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-[#55C2FF]"
                        />

                        PERCIBIDO
                      </span>
                    )}
                  </div>

                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#93A4B8]">
                    <span>
                      {formatEventDate(
                        event.date,
                      )}
                      {" · "}
                      {event.hour.slice(0, 5)}
                    </span>

                    {event.depthKm !== null && (
                      <span>
                        Profundidad{" "}
                        {event.depthKm.toLocaleString(
                          "es-CL",
                        )}{" "}
                        km
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className="hidden text-xs font-semibold text-[#72849A] transition-colors duration-200 group-hover:text-[#55C2FF] md:block">
                    Ver detalle
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-xl text-[#93A4B8] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#55C2FF]"
                  >
                    ›
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-6 rounded-[20px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-6 text-center">
          <p className="font-bold text-[#F7FAFC]">
            No hay eventos disponibles
          </p>

          <p className="mt-2 text-sm text-[#93A4B8]">
            No se encontraron sismos dentro del período seleccionado.
          </p>
        </div>
      )}
    </section>
  );
}
