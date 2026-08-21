import Link from "next/link";

import { InfoPageShell } from "@/components/InfoPageShell";
import { officialSources } from "@/lib/content/learn";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  description:
    "Fuentes de información utilizadas por Pulso Sísmico, con el Centro Sismológico Nacional como referencia oficial y consulta directa de sus datos públicos.",
  path: "/fuentes",
  title: "Fuentes de información",
});

export default function SourcesPage() {
  return (
    <InfoPageShell
      description="Pulso Sísmico utiliza como referencia principal al Centro Sismológico Nacional y consulta directamente sus datos públicos para construir el histórico y la actividad sísmica reciente."
      title="Fuentes de información"
    >
      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-[#55C2FF]/20 bg-[#55C2FF]/5 p-6">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#55C2FF]/10 text-xl">
            🏛️
          </div>

          <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
            REFERENCIA PRINCIPAL
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-[#F7FAFC]">
            Fuente oficial
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
            El Centro Sismológico Nacional de la Universidad de Chile es la
            referencia principal para interpretar la actividad sísmica reciente
            y la terminología técnica publicada en este sitio.
          </p>

          <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
            Cuando existe un informe oficial enlazado para un evento, Pulso
            Sísmico lo presenta como referencia directa. No reinterpretamos ni
            alteramos el significado de esos datos.
          </p>
        </article>

        <article className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#55C2FF]/10 text-xl">
            ⚙️
          </div>

          <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
            PROCESAMIENTO DE DATOS
          </p>

          <h2 className="mt-2 text-2xl font-extrabold text-[#F7FAFC]">
            Consulta y almacenamiento propio
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
            Pulso Sísmico consulta directamente los catálogos públicos del Centro Sismológico Nacional para obtener los eventos sísmicos recientes y mantener un registro histórico propio.
          </p>

          <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
            Los datos se organizan y almacenan para permitir su consulta histórica y su presentación en mapas, fichas y herramientas estadísticas, manteniendo siempre la referencia al informe oficial del CSN cuando está disponible.
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 md:p-8">
        <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
          REFERENCIAS
        </p>

        <h2 className="mt-2 text-2xl font-extrabold text-[#F7FAFC]">
          Enlaces de referencia
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
          Estos sitios complementan la información que mostramos y permiten
          consultar directamente las fuentes originales.
        </p>

        <div className="mt-6 grid gap-4">
          {officialSources.map((source, index) => (
            <article
              className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5 transition hover:border-[#55C2FF]/20"
              key={source.href}
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <span className="text-xs font-extrabold tracking-[0.16em] text-[#55C2FF]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-1 text-lg font-bold text-[#F7FAFC]">
                    {source.label}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-[#C4D0DF]">
                    {source.description}
                  </p>
                </div>

                <Link
                  className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-[#55C2FF]/30 bg-[#55C2FF]/10 px-4 py-2 text-sm font-semibold text-[#55C2FF] transition hover:bg-[#55C2FF]/15"
                  href={source.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  Abrir fuente
                  <span aria-hidden>↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-[#55C2FF]/20 bg-[#55C2FF]/5 p-6 md:p-8">
        <p className="text-xs font-bold tracking-[0.18em] text-[#55C2FF]">
          TRANSPARENCIA
        </p>

        <h2 className="mt-2 text-xl font-extrabold text-[#F7FAFC]">
          Datos públicos, presentación independiente
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
          Pulso Sísmico es un proyecto independiente. No pertenece al Centro Sismológico Nacional ni a SENAPRED. Nuestro objetivo es facilitar la lectura de información pública, mantener un histórico consultable y conservar siempre visibles las fuentes oficiales.
        </p>
      </section>
    </InfoPageShell>
  );
}
