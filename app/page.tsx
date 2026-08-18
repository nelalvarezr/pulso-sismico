import type { Metadata } from "next";

import { EarthquakeList } from "@/components/EarthquakeList";
import { Header } from "@/components/Header";
import { LearnCardsSection } from "@/components/LearnCardsSection";
import { LatestEarthquakeCard } from "@/components/LatestEarthquakeCard";
import { MapShell } from "@/components/MapShell";
import { SourceAttribution } from "@/components/SourceAttribution";
import { fetchRecentEarthquakes } from "@/lib/api/earthquakes";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/config";

export const revalidate = 60;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description: SITE_DESCRIPTION,
  openGraph: {
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    title: SITE_NAME,
    type: "website",
    url: SITE_URL,
  },
  title: `${SITE_NAME} | Últimos sismos de Chile`,
  twitter: {
    card: "summary_large_image",
    description: SITE_DESCRIPTION,
    title: `${SITE_NAME} | Últimos sismos de Chile`,
  },
};

export default async function HomePage() {
  const earthquakes = await fetchRecentEarthquakes();
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

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 md:px-6">
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} type="application/ld+json" />

      <Header updatedAt={updatedAt} />
      <LatestEarthquakeCard earthquake={latest} />

      <section className="grid w-full gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:items-start">
        <EarthquakeList earthquakes={recent.length > 0 ? recent : [latest]} />
        <div className="flex min-w-0 flex-col gap-4">
          <h2 className="text-2xl font-extrabold text-[#F7FAFC]">Mapa de sismos recientes</h2>
          <MapShell earthquakes={earthquakes} height={700} />
        </div>
      </section>

      <SourceAttribution />
      <LearnCardsSection />
    </main>
  );
}
