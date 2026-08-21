import { Header } from "@/components/Header";
import { MainNavigation } from "@/components/MainNavigation";
import { StatisticsPeriodSelector } from "@/components/StatisticsPeriodSelector";
import { StatisticsSummary } from "@/components/StatisticsSummary";
import { StatisticsActivityChart } from "@/components/StatisticsActivityChart";
import { StatisticsDistributions } from "@/components/StatisticsDistributions";
import { StatisticsTopEvents } from "@/components/StatisticsTopEvents";
import {
  fetchStatisticsActivity,
  fetchStatisticsDistributions,
  fetchStatisticsSummary,
  fetchStatisticsTopEvents,
  parseStatisticsPeriod,
} from "@/lib/api/statistics";
import { buildPageMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata = buildPageMetadata({
  description:
    "Estadísticas de actividad sísmica en Chile: cantidad de eventos, magnitudes, profundidad y sismos percibidos.",
  path: "/estadisticas",
  title: "Estadísticas sísmicas",
});

interface StatisticsPageProps {
  searchParams: Promise<{
    periodo?: string | string[];
  }>;
}

function getFirstSearchParam(
  value: string | string[] | undefined,
) {
  return Array.isArray(value)
    ? value[0]
    : value;
}

export default async function StatisticsPage({
  searchParams,
}: StatisticsPageProps) {
  const params = await searchParams;

  const period = parseStatisticsPeriod(
    getFirstSearchParam(params.periodo),
  );

const [
  stats,
  activity,
  distributions,
  topEvents,
] = await Promise.all([
  fetchStatisticsSummary(period),
  fetchStatisticsActivity(period),
  fetchStatisticsDistributions(period),
  fetchStatisticsTopEvents(period),
]);

  const updatedAt =
    new Date().toISOString();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 md:px-6">
      <Header updatedAt={updatedAt} />

      <MainNavigation />

      <section className="space-y-3">
        <p className="text-xs font-bold tracking-[0.24em] text-[#55C2FF]">
          ESTADÍSTICAS
        </p>

        <h1 className="text-3xl font-extrabold tracking-tight text-[#F7FAFC] md:text-4xl">
          Actividad sísmica de Chile
        </h1>

        <p className="max-w-3xl text-sm leading-7 text-[#93A4B8] md:text-base">
          Explora los registros sísmicos almacenados por Pulso
          Sísmico y observa cómo cambia la actividad según el
          período, la magnitud, la profundidad y la percepción de
          los eventos.
        </p>
      </section>

      <StatisticsPeriodSelector
        period={period}
      />

      <StatisticsSummary
        stats={stats}
        period={period} />

      <StatisticsActivityChart
        activity={activity}
        period={period}
        />

        <StatisticsDistributions
            distributions={distributions}
            />

        <StatisticsTopEvents
            events={topEvents}
            period={period}
            />
    </main>
  );
}
