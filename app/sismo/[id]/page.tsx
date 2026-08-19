import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MagnitudeBadge } from "@/components/MagnitudeBadge";
import { MapShell } from "@/components/MapShell";
import { SourceAttribution } from "@/components/SourceAttribution";
import { fetchEarthquakeById } from "@/lib/api/earthquakes";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import {
  buildEarthquakeDescription,
  buildEarthquakeTitle,
  formatEarthquakeDate,
  formatRelativeEarthquakeTime,
} from "@/lib/utils/earthquake-formatters";

export const revalidate = 60;

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: DetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const earthquake = await fetchEarthquakeById(id);

  if (!earthquake) return { title: `Sismo no encontrado | ${SITE_NAME}` };

  const title = buildEarthquakeTitle(earthquake);
  const description = buildEarthquakeDescription(earthquake);
  const canonical = `/sismo/${earthquake.id}`;

  return {
    alternates: { canonical },
    description,
    openGraph: {
      description,
      images: [
        {
          alt: `Resumen visual del sismo ${earthquake.id} en Pulso Sísmico`,
          height: 630,
          url: `${canonical}/opengraph-image`,
          width: 1200,
        },
      ],
      title,
      type: "article",
      url: `${SITE_URL}${canonical}`,
    },
    title,
    twitter: {
      card: "summary_large_image",
      description,
      images: [`${canonical}/twitter-image`],
      title,
    },
  };
}

export default async function EarthquakeDetailPage({ params }: DetailPageProps) {
  const { id } = await params;
  const earthquake = await fetchEarthquakeById(id);

  if (!earthquake) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    datePublished: earthquake.occurredAt,
    description: buildEarthquakeDescription(earthquake),
    headline: buildEarthquakeTitle(earthquake),
    mainEntityOfPage: `${SITE_URL}/sismo/${earthquake.id}`,
  };

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-8 md:px-6">
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} type="application/ld+json" />

      <Link
        className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#55C2FF]/25 bg-[#55C2FF]/8 px-3.5 py-1 text-sm font-semibold text-[#55C2FF] transition hover:bg-[#55C2FF]/15"
        href="/"
      >
        <span>←</span>
        <span>Volver</span>
      </Link>

      <article className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.30)]">
        <div className="flex items-start gap-4">
  <MagnitudeBadge magnitude={earthquake.magnitude} size="sm" />

  <div className="min-w-0 flex-1">
    <p className="mb-2 text-xs font-bold tracking-[0.24em] text-[#93A4B8]">
      DETALLE DEL SISMO
    </p>

    <h1 className="text-[20px] font-extrabold leading-tight text-[#F7FAFC]">
      {earthquake.place}
    </h1>

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
  </div>
</div>
      </article>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_320px]">
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold text-[#F7FAFC]">Epicentro</h2>
          <MapShell
            earthquakes={[earthquake]}
            focusEarthquakeId={earthquake.id}
            height={360}
            interactive={true}
            focusZoom={6}
            showPopup={false} />
        </div>

        <section className="overflow-hidden rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
  {/* Fecha */}
  <div className="border-b border-[var(--border-subtle)] px-5 py-4 text-center">
    <span className="font-semibold text-[#F7FAFC]">
      {formatEarthquakeDate(earthquake)}
    </span>
  </div>

  {/* Datos */}
  {[
    ["🕒 Hora", earthquake.hour.slice(0, 5)],
    ["📏 Profundidad", `${earthquake.depthKm} km`],
    ["🌎 Latitud", earthquake.latitude.toFixed(2)],
    ["🌍 Longitud", earthquake.longitude.toFixed(2)],
  ].map(([label, value]) => (
    <div
      className="flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] px-5 py-3.5"
      key={label}
    >
      <span className="text-sm text-[#93A4B8]">
        {label}
      </span>

      <span className="text-right font-semibold text-[#F7FAFC]">
        {value}
      </span>
    </div>
  ))}

  {/* Informe */}
  <div className="flex flex-col items-center gap-3 px-5 py-5">
    <a
      className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#55C2FF]/30 bg-[#55C2FF]/10 px-4 py-2 text-sm font-semibold text-[#55C2FF] transition hover:bg-[#55C2FF]/15"
      href={earthquake.reportUrl}
      rel="noreferrer"
      target="_blank"
    >
      Ver informe oficial CSN
    </a>
  </div>
</section>
      </section>

      <SourceAttribution />
    </main>
  );
}
