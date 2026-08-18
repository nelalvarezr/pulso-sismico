import { InfoPageShell } from "@/components/InfoPageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  description:
    "Diferencia entre magnitud e intensidad: energía del evento versus efectos observados en un lugar determinado.",
  path: "/aprende/magnitud-vs-intensidad",
  title: "Magnitud vs intensidad",
});

export default function MagnitudeVsIntensityPage() {
  return (
    <InfoPageShell
      description="Magnitud e intensidad están relacionadas, pero no significan lo mismo. Entender esa diferencia evita muchas confusiones al leer reportes sísmicos."
      eyebrow="APRENDE"
      title="Diferencia entre magnitud e intensidad"
    >
      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-extrabold text-[#F7FAFC]">Magnitud</h2>
          <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
            La magnitud describe el tamaño del sismo y la energía liberada por el evento. En la práctica, el sismo tiene una sola magnitud.
          </p>
        </article>

        <article className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6">
          <h2 className="text-2xl font-extrabold text-[#F7FAFC]">Intensidad</h2>
          <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
            La intensidad mide los efectos observados en un lugar determinado: cómo se sintió, qué daños produjo o cómo reaccionaron estructuras y terreno.
          </p>
        </article>
      </section>

      <section className="rounded-[28px] border border-[var(--border-subtle)] bg-[var(--surface)] p-6 md:p-8">
        <h2 className="text-2xl font-extrabold text-[#F7FAFC]">Una misma magnitud, distintas intensidades</h2>
        <p className="mt-4 text-sm leading-7 text-[#C4D0DF]">
          El CSN y su glosario explican que la intensidad depende, entre otras cosas, de la distancia epicentral, la geología local, la naturaleza del terreno y el tipo de construcciones. Por eso un mismo sismo puede sentirse de manera muy distinta según la ciudad o incluso el barrio.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            "Magnitud = valor único del evento.",
            "Intensidad = efecto observado en un punto específico.",
            "Un solo sismo puede generar varias intensidades reportadas.",
          ].map((item) => (
            <div className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] p-5" key={item}>
              <p className="text-sm leading-7 text-[#C4D0DF]">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </InfoPageShell>
  );
}
