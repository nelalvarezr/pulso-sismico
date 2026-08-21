import type { Metadata } from "next";
import { MainNavigation } from "@/components/MainNavigation";
import { EarthquakeStats } from "@/components/EarthquakeStats";
import { EarthquakeActivityChart } from "@/components/EarthquakeActivityChart";
import { EarthquakeList } from "@/components/EarthquakeList";
import { Header } from "@/components/Header";
import { LearnCardsSection } from "@/components/LearnCardsSection";
import { LatestEarthquakeCard } from "@/components/LatestEarthquakeCard";
import { MapShell } from "@/components/MapShell";
import { RecentEarthquakeFilters } from "@/components/RecentEarthquakeFilters";
import {
  fetchEarthquake24HourStats,
  fetchEarthquakeHourlyActivity,
  fetchFilteredRecentEarthquakes,
  fetchRecentEarthquakes,
} from "@/lib/api/earthquakes";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/config";

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description: SITE_DESCRIPTION,
  openGraph: {
    description: SITE_DESCRIPTION,
    images: [
      {
        alt: "Pulso Sísmico — Últimos sismos en Chile",
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    siteName: SITE_NAME,
    title: SITE_NAME,
    type: "website",
    url: SITE_URL,
  },
  title: `${SITE_NAME} | Últimos sismos de Chile`,
  twitter: {
    card: "summary_large_image",
    description: SITE_DESCRIPTION,
    images: ["/twitter-image"],
    title: `${SITE_NAME} | Últimos sismos de Chile`,
  },
};

interface HomePageProps {
  searchParams: Promise<{
    magnitud?: string | string[];
    percibidos?: string | string[];
  }>;
}

function getFirstSearchParam(
  value: string | string[] | undefined,
) {
  return Array.isArray(value) ? value[0] : value;
}

function parseMagnitude(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const magnitude = Number(value);

  if (![3, 4, 5].includes(magnitude)) {
    return undefined;
  }

  return magnitude;
}

export default async function HomePage({
  searchParams,
}: HomePageProps) {
  const params = await searchParams;

  const minMagnitude = parseMagnitude(
    getFirstSearchParam(params.magnitud),
  );

  const feltOnly =
    getFirstSearchParam(params.percibidos) === "1";

  const hasActiveFilters =
    typeof minMagnitude === "number" || feltOnly;

const [earthquakes, stats, hourlyActivity] =
  await Promise.all([
    fetchRecentEarthquakes(),
    fetchEarthquake24HourStats(),
    fetchEarthquakeHourlyActivity(),
  ]);

  const latest = earthquakes[0];
  const recent = earthquakes.slice(1);

  const updatedAt = new Date().toISOString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    description: SITE_DESCRIPTION,
    name: `${SITE_NAME} | Últimos sismos de Chile`,
    url: SITE_URL,
  };

  if (!latest) {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 md:px-6">
        <Header updatedAt={updatedAt} />

        <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-8 text-[#F7FAFC]">
          No hay sismos recientes disponibles en este momento.
        </section>
      </main>
    );
  }

let listEarthquakes = recent;
let mapEarthquakes = earthquakes;

if (hasActiveFilters) {
  const filteredEarthquakes =
    await fetchFilteredRecentEarthquakes({
      feltOnly,
      limit: 16,
      minMagnitude,
    });

  mapEarthquakes = filteredEarthquakes;

  listEarthquakes = filteredEarthquakes
    .filter((earthquake) => earthquake.id !== latest.id)
    .slice(0, 15);
}

  if (!hasActiveFilters && listEarthquakes.length === 0) {
    listEarthquakes = [latest];
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 md:px-6">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
        type="application/ld+json"
      />

      <Header updatedAt={updatedAt} />
      <MainNavigation />

      <section className="space-y-3">
        <p className="text-xs font-bold tracking-[0.24em] text-[#55C2FF]">
          ACTIVIDAD RECIENTE
        </p>

        <h1 className="text-3xl font-extrabold tracking-tight text-[#F7FAFC] md:text-4xl">
          Últimos sismos en Chile
        </h1>

        <p className="max-w-3xl text-sm leading-7 text-[#93A4B8] md:text-base">
          Pulso Sísmico muestra la actividad sísmica reciente de Chile
          con magnitud, profundidad, ubicación y mapa.
        </p>
      </section>

      <EarthquakeStats stats={stats} />
      <EarthquakeActivityChart activity={hourlyActivity} />
      <LatestEarthquakeCard earthquake={latest} />

      <section className="grid w-full min-w-0 grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:items-start">
        <div className="w-full min-w-0 space-y-4">
          <RecentEarthquakeFilters
            feltOnly={feltOnly}
            minMagnitude={minMagnitude}
          />

          {listEarthquakes.length > 0 ? (
            <EarthquakeList earthquakes={listEarthquakes} />
          ) : (
            <div className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 text-center">
              <p className="font-bold text-[#F7FAFC]">
                No encontramos sismos con estos filtros
              </p>

              <p className="mt-2 text-sm leading-6 text-[#93A4B8]">
                Prueba reduciendo la magnitud mínima o mostrando también
                los eventos no percibidos.
              </p>
            </div>
          )}
        </div>

        <div className="flex w-full min-w-0 flex-col gap-4">
          <h2 className="text-2xl font-extrabold text-[#F7FAFC]">
            Mapa de sismos recientes
          </h2>

          <div className="w-full min-w-0 overflow-hidden">
            <MapShell earthquakes={mapEarthquakes} height={550} />
          </div>
        </div>
      </section>

      <LearnCardsSection />
    </main>
  );
}
