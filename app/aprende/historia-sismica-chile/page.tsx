import Link from "next/link";

import { InfoPageShell } from "@/components/InfoPageShell";
import { historyEvents } from "@/lib/content/learn";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  description:
    "Línea de tiempo con grandes eventos sísmicos de Chile y contexto sobre cómo su historia ha influido en la prevención y las normas de construcción.",
  path: "/aprende/historia-sismica-chile",
  title: "Historia sísmica de Chile",
});

export default function ChileSeismicHistoryPage() {
  return (
    <InfoPageShell
      description="Chile se ubica sobre un margen convergente muy activo entre las placas de Nazca y Sudamericana. Esa historia sísmica ha moldeado tanto la investigación científica como la cultura de prevención del país."
      eyebrow="APRENDE"
      title="Historia sísmica de Chile"
    >
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_320px]">
        <div className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 md:p-8">
          <div className="relative pl-8 md:pl-10">
            <div className="absolute bottom-0 left-3 top-1 w-px bg-[linear-gradient(to_bottom,rgba(85,194,255,0.15),rgba(85,194,255,0.55),rgba(85,194,255,0.15))]" />
            <div className="space-y-6">
              {historyEvents.map((event) => (
                <article className="relative rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5" key={event.date}>
                  <span className="absolute left-[-1.95rem] top-7 h-3 w-3 rounded-full border border-white/30 bg-[#55C2FF] shadow-[0_0_0_6px_rgba(85,194,255,0.12)] md:left-[-2.45rem]" />
                  <p className="text-xs font-bold tracking-[0.18em] text-[#93A4B8]">{event.date}</p>
                  <h2 className="mt-2 text-2xl font-extrabold text-[#F7FAFC]">{event.location}</h2>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-[#C4D0DF]">
                    <span className="rounded-full border border-[var(--border-subtle)] px-3 py-1">{event.magnitude}</span>
                    <span className="rounded-full border border-[var(--border-subtle)] px-3 py-1">Profundidad: {event.depth}</span>
                    <span className="rounded-full border border-[var(--border-subtle)] px-3 py-1">{event.effect}</span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">{event.summary}</p>
                  <Link className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#55C2FF]" href={event.sourceUrl} rel="noreferrer" target="_blank">
                    Ver referencia oficial <span aria-hidden>↗</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface)] p-5">
            <h2 className="text-xl font-extrabold text-[#F7FAFC]">Punto clave</h2>
            <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
              Según SENAPRED, el terremoto de Valdivia de 1960, de magnitud 9.5, sigue siendo el mayor registrado instrumentalmente.
            </p>
          </div>
          <div className="rounded-[24px] border border-[var(--border-subtle)] bg-[var(--surface)] p-5">
            <h2 className="text-xl font-extrabold text-[#F7FAFC]">Por qué importa</h2>
            <p className="mt-3 text-sm leading-7 text-[#C4D0DF]">
              La historia sísmica chilena ha influido fuertemente en normas de construcción, educación pública, simulacros y cultura de prevención. Esa relación entre memoria y preparación sigue siendo central.
            </p>
          </div>
        </aside>
      </section>
    </InfoPageShell>
  );
}
