import Link from "next/link";

import { InfoPageShell } from "@/components/InfoPageShell";
import { officialSources } from "@/lib/content/learn";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  description:
    "Fuentes de información utilizadas por Pulso Sísmico, incluyendo el CSN como referencia oficial y la API pública de Boostr como intermediario técnico.",
  path: "/fuentes",
  title: "Fuentes de información",
});

export default function SourcesPage() {
  return (
    <InfoPageShell
      description="Pulso Sísmico toma como referencia principal al Centro Sismológico Nacional y usa la API pública de Boostr como capa técnica de consulta."
      title="Fuentes de información"
    >
      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-extrabold text-[#F7FAFC]">Fuente oficial</h2>
          <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
            El Centro Sismológico Nacional de la Universidad de Chile es la referencia principal para interpretar la actividad sísmica reciente y la terminología técnica publicada en este sitio.
          </p>
          <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
            Cuando existe un informe oficial enlazado para un evento, Pulso Sísmico lo presenta como referencia directa. No reinterpretamos ni alteramos el significado de esos datos.
          </p>
        </article>

        <article className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-extrabold text-[#F7FAFC]">Intermediario técnico</h2>
          <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
            Para consultar eventos recientes usamos la API pública de Boostr como intermediario técnico. Esa capa permite recuperar datos públicos de forma más directa desde el servidor del sitio.
          </p>
          <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
            Pulso Sísmico no cambia los conceptos técnicos de magnitud, profundidad, ubicación o fecha; solo los organiza visualmente y agrega contexto editorial.
          </p>
        </article>
      </section>

      <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 md:p-8">
        <h2 className="text-2xl font-extrabold text-[#F7FAFC]">Enlaces de referencia</h2>
        <div className="mt-5 grid gap-4">
          {officialSources.map((source) => (
            <article className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5" key={source.href}>
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#F7FAFC]">{source.label}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#C4D0DF]">{source.description}</p>
                </div>
                <Link
                  className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#55C2FF]"
                  href={source.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  Abrir fuente <span aria-hidden>↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </InfoPageShell>
  );
}
