import type {
  StatisticsActivityPoint,
  StatisticsPeriod,
} from "@/lib/api/statistics";

interface StatisticsActivityChartProps {
  activity: StatisticsActivityPoint[];
  period: StatisticsPeriod;
}

const WIDTH = 1000;
const HEIGHT = 250;

const CHART_LEFT = 20;
const CHART_RIGHT = 980;
const CHART_TOP = 20;
const CHART_BOTTOM = 190;

function getGranularityText(
  period: StatisticsPeriod,
) {
  switch (period) {
    case "7d":
      return "Actividad agrupada por día";

    case "30d":
      return "Actividad agrupada por día";

    case "1y":
      return "Actividad agrupada por semana";

    case "historico":
      return "Actividad agrupada por año";
  }
}

export function StatisticsActivityChart({
  activity,
  period,
}: StatisticsActivityChartProps) {
  const maxValue = Math.max(
    ...activity.map((item) => item.total),
    1,
  );

  const total = activity.reduce(
    (sum, item) => sum + item.total,
    0,
  );

  const maxActivity = activity.reduce<
    StatisticsActivityPoint | undefined
  >((current, item) => {
    if (!current || item.total > current.total) {
      return item;
    }

    return current;
  }, undefined);

  const usableWidth =
    CHART_RIGHT - CHART_LEFT;

  const usableHeight =
    CHART_BOTTOM - CHART_TOP;

  const xStep =
    activity.length > 1
      ? usableWidth / (activity.length - 1)
      : usableWidth;

  const chartPoints = activity.map(
    (item, index) => {
      const x =
        CHART_LEFT + index * xStep;

      const y =
        CHART_BOTTOM -
        (item.total / maxValue) * usableHeight;

      return {
        ...item,
        x,
        y,
      };
    },
  );

  const linePoints = chartPoints
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  const areaPath =
    chartPoints.length > 0
      ? [
          `M ${chartPoints[0].x} ${CHART_BOTTOM}`,
          ...chartPoints.map(
            (point) =>
              `L ${point.x} ${point.y}`,
          ),
          `L ${
            chartPoints[chartPoints.length - 1].x
          } ${CHART_BOTTOM}`,
          "Z",
        ].join(" ")
      : "";

  const firstPoint = activity[0];

  const middlePoint =
    activity[
      Math.floor((activity.length - 1) / 2)
    ];

  const lastPoint =
    activity[activity.length - 1];

  return (
    <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.20)] md:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
            ACTIVIDAD EN EL TIEMPO
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-[#F7FAFC]">
            Evolución de la actividad sísmica
          </h2>

          <p className="mt-2 text-sm text-[#93A4B8]">
            {getGranularityText(period)}
          </p>
        </div>

        {maxActivity && (
          <div className="self-start rounded-[18px] border border-[#55C2FF]/20 bg-[#55C2FF]/5 px-4 py-3">
            <p className="text-[10px] font-bold tracking-[0.14em] text-[#93A4B8]">
              MAYOR ACTIVIDAD
            </p>

            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-[#F7FAFC]">
                {maxActivity.total.toLocaleString("es-CL")}
              </span>

              <span className="text-xs text-[#93A4B8]">
                {maxActivity.total === 1
                  ? "sismo"
                  : "sismos"}
              </span>
            </div>

            <p className="mt-0.5 text-xs font-semibold text-[#55C2FF]">
              {maxActivity.label}
            </p>
          </div>
        )}
      </div>

      <div className="mt-8">
        <svg
          aria-label={`Evolución de la actividad sísmica. ${total} eventos representados.`}
          className="h-auto w-full overflow-visible"
          preserveAspectRatio="none"
          role="img"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        >
          <defs>
            <linearGradient
              id={`statistics-area-${period}`}
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#55C2FF"
                stopOpacity="0.28"
              />

              <stop
                offset="100%"
                stopColor="#55C2FF"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {[0, 0.33, 0.66, 1].map(
            (position) => {
              const y =
                CHART_TOP +
                usableHeight * position;

              return (
                <line
                  key={position}
                  stroke="rgba(147,164,184,0.12)"
                  strokeDasharray="4 7"
                  strokeWidth="1"
                  x1={CHART_LEFT}
                  x2={CHART_RIGHT}
                  y1={y}
                  y2={y}
                />
              );
            },
          )}

          {areaPath && (
            <path
              d={areaPath}
              fill={`url(#statistics-area-${period})`}
            />
          )}

          {linePoints && (
            <polyline
              fill="none"
              points={linePoints}
              stroke="#55C2FF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              vectorEffect="non-scaling-stroke"
            />
          )}

          {chartPoints.map((point) => (
            <circle
              cx={point.x}
              cy={point.y}
              fill="#07111F"
              key={point.index}
              r={activity.length <= 30 ? 4 : 2.5}
              stroke="#55C2FF"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            >
              <title>
                {`${point.label}: ${point.total} ${
                  point.total === 1
                    ? "sismo"
                    : "sismos"
                }`}
              </title>
            </circle>
          ))}
        </svg>

        {activity.length > 0 && (
          <div className="-mt-7 flex items-center justify-between text-[10px] font-semibold tracking-[0.05em] text-[#72849A] sm:text-xs">
            <span>
              {firstPoint?.label}
            </span>

            <span>
              {middlePoint?.label}
            </span>

            <span>
              {lastPoint?.label}
            </span>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
        <p className="text-xs text-[#72849A]">
          Actividad registrada durante el período
          seleccionado
        </p>

        <p className="text-xs font-bold text-[#93A4B8]">
          {total.toLocaleString("es-CL")}{" "}
          {total === 1 ? "evento" : "eventos"}
        </p>
      </div>
    </section>
  );
}
