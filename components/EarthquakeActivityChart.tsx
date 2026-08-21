import type { EarthquakeHourlyActivity } from "@/lib/api/earthquakes";

interface EarthquakeActivityChartProps {
  activity: EarthquakeHourlyActivity[];
}

export function EarthquakeActivityChart({
  activity,
}: EarthquakeActivityChartProps) {
  const maxValue = Math.max(
    ...activity.map((item) => item.total),
    1,
  );

  const total = activity.reduce(
    (sum, item) => sum + item.total,
    0,
  );

  return (
    <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)] md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-[#93A4B8]">
            ACTIVIDAD POR HORA
          </p>

          <h2 className="mt-1 text-lg font-extrabold text-[#F7FAFC]">
            Movimiento sísmico durante las últimas 24 horas
          </h2>
        </div>

        <div className="shrink-0 rounded-full border border-[#55C2FF]/20 bg-[#55C2FF]/8 px-3 py-1.5 text-xs font-bold text-[#55C2FF]">
          {total} eventos
        </div>
      </div>

      <div
        aria-label={`Actividad sísmica de las últimas 24 horas. ${total} eventos registrados.`}
        className="mt-6"
        role="img"
      >
        <div className="flex h-[120px] items-end gap-1 sm:gap-1.5">
          {activity.map((item) => {
            const percentage =
              item.total > 0
                ? Math.max(
                    (item.total / maxValue) * 100,
                    8,
                  )
                : 0;

            return (
              <div
                className="group relative flex h-full min-w-0 flex-1 items-end"
                key={item.bucket}
                title={`${item.label} — ${item.total} ${
                  item.total === 1 ? "sismo" : "sismos"
                }`}
              >
                <div
                  className={`w-full rounded-t-[5px] transition-all duration-200 ${
                    item.total > 0
                      ? "bg-[#55C2FF]/55 group-hover:bg-[#55C2FF]"
                      : "h-[2px] bg-[var(--border-subtle)]"
                  }`}
                  style={
                    item.total > 0
                      ? {
                          height: `${percentage}%`,
                        }
                      : undefined
                  }
                />

                <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-[var(--border-subtle)] bg-[#07111F] px-2.5 py-1.5 text-xs text-[#F7FAFC] shadow-xl group-hover:block">
                  <span className="font-bold">
                    {item.total}
                  </span>{" "}
                  {item.total === 1 ? "sismo" : "sismos"}
                  <span className="ml-1 text-[#93A4B8]">
                    · {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-between text-[10px] font-semibold tracking-[0.08em] text-[#72849A] sm:text-xs">
          <span>Hace 24 h</span>
          <span>Hace 12 h</span>
          <span>Ahora</span>
        </div>
      </div>
    </section>
  );
}
